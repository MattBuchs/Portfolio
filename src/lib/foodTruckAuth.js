import crypto from "crypto";

import { prisma } from "@/lib/prisma";

const SESSION_TTL_DAYS = 30;
const SESSION_INACTIVITY_DAYS = 14;
const SESSION_TOUCH_INTERVAL_HOURS = 6;

export function normalizeEmail(email) {
	return (email || "").trim().toLowerCase();
}

export function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString("hex");
	const hash = crypto.scryptSync(password, salt, 64).toString("hex");
	return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
	const [salt, hash] = (stored || "").split(":");
	if (!salt || !hash) {
		return false;
	}

	const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
	return crypto.timingSafeEqual(
		Buffer.from(hash, "hex"),
		Buffer.from(candidate, "hex"),
	);
}

export function createSlug(name) {
	const base = (name || "food-truck")
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "")
		.slice(0, 40);

	const suffix = crypto.randomBytes(3).toString("hex");
	return `${base || "food-truck"}-${suffix}`;
}

export function createOpaqueToken() {
	return crypto.randomBytes(32).toString("base64url");
}

export function hashToken(token) {
	return crypto.createHash("sha256").update(token).digest("hex");
}

function getInactiveSessionCutoff(now = new Date()) {
	const cutoff = new Date(now);
	cutoff.setDate(cutoff.getDate() - SESSION_INACTIVITY_DAYS);
	return cutoff;
}

async function cleanupStaleSessions(now = new Date()) {
	await prisma.foodTruckSession.deleteMany({
		where: {
			OR: [
				{ revokedAt: { not: null } },
				{ expiresAt: { lte: now } },
				{ lastUsedAt: { lt: getInactiveSessionCutoff(now) } },
			],
		},
	});
}

async function touchSession(session, now = new Date()) {
	const nextTouch = new Date(session.lastUsedAt);
	nextTouch.setHours(nextTouch.getHours() + SESSION_TOUCH_INTERVAL_HOURS);

	if (nextTouch > now) {
		return;
	}

	await prisma.foodTruckSession.update({
		where: { id: session.id },
		data: { lastUsedAt: now },
	});
}

export async function createSession(userId) {
	const now = new Date();
	await cleanupStaleSessions(now);

	const token = createOpaqueToken();
	const tokenHash = hashToken(token);

	const expiresAt = new Date(now);
	expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);

	await prisma.foodTruckSession.create({
		data: {
			userId,
			tokenHash,
			expiresAt,
			lastUsedAt: now,
		},
	});

	return {
		token,
		expiresAt: expiresAt.toISOString(),
	};
}

export async function revokeSession(token) {
	const tokenHash = hashToken(token);
	await prisma.foodTruckSession.updateMany({
		where: {
			tokenHash,
			revokedAt: null,
		},
		data: {
			revokedAt: new Date(),
		},
	});
}

export async function getAuthContext(request) {
	const now = new Date();
	await cleanupStaleSessions(now);

	let token = null;

	// Try to get token from Authorization header (standard)
	const authHeader = request.headers.get("authorization") || "";
	if (authHeader.toLowerCase().startsWith("bearer ")) {
		token = authHeader.slice(7).trim();
		console.log("[AUTH] Token from Authorization header", {
			method: "Authorization",
			tokenLength: token.length,
		});
	}

	// Fallback: try custom header if Authorization didn't work
	if (!token) {
		const customTokenHeader =
			request.headers.get("x-food-truck-token") || "";
		if (customTokenHeader) {
			token = customTokenHeader.trim();
			console.log("[AUTH] Token from x-food-truck-token header", {
				method: "custom-header",
				tokenLength: token.length,
			});
		}
	}

	if (!token) {
		// Debug: log all headers to understand what's being sent
		const allHeaders = {};
		for (const [key, value] of request.headers.entries()) {
			allHeaders[key] = value;
		}

		console.error("Auth failed: no authorization header", {
			timestamp: new Date().toISOString(),
			hasAuthHeader: false,
			hasCustomHeader: !!request.headers.get("x-food-truck-token"),
			allHeaders: Object.keys(allHeaders),
		});
		return null;
	}

	const tokenHash = hashToken(token);
	const inactiveCutoff = getInactiveSessionCutoff(now);
	let session;
	try {
		session = await prisma.foodTruckSession.findFirst({
			where: {
				tokenHash,
				revokedAt: null,
				expiresAt: { gt: now },
				lastUsedAt: { gt: inactiveCutoff },
			},
			include: {
				user: {
					include: {
						memberships: {
							include: {
								workspace: true,
							},
						},
					},
				},
			},
		});
	} catch (error) {
		console.error("Database query error in getAuthContext:", error);
		return null;
	}

	if (!session) {
		console.error("Auth failed: session not found or expired", {
			tokenHashPrefix: tokenHash.slice(0, 10),
		});
		return null;
	}

	await touchSession(session, now);

	return {
		token,
		user: session.user,
		session,
	};
}

export function getWorkspaceMembership(authContext, workspaceId) {
	if (!authContext || !workspaceId) {
		return null;
	}

	return (
		authContext.user.memberships.find(
			(membership) => membership.workspaceId === workspaceId,
		) || null
	);
}

export function roleCanManageMembers(role) {
	return role === "OWNER" || role === "MANAGER";
}

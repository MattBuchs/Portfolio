import crypto from "crypto";

import { prisma } from "@/lib/prisma";

const SESSION_TTL_DAYS = 30;

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

export async function createSession(userId) {
	const token = createOpaqueToken();
	const tokenHash = hashToken(token);

	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);

	await prisma.foodTruckSession.create({
		data: {
			userId,
			tokenHash,
			expiresAt,
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
	const authHeader = request.headers.get("authorization") || "";
	if (!authHeader.toLowerCase().startsWith("bearer ")) {
		console.error("Auth failed: invalid auth header format", {
			hasAuthHeader: !!authHeader,
		});
		return null;
	}

	const token = authHeader.slice(7).trim();
	if (!token) {
		console.error("Auth failed: empty token");
		return null;
	}

	const tokenHash = hashToken(token);
	let session;
	try {
		session = await prisma.foodTruckSession.findFirst({
			where: {
				tokenHash,
				revokedAt: null,
				expiresAt: { gt: new Date() },
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

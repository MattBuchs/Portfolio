// PUT THIS AT: src/app/api/food-truck/auth/check-session/route.js
// TEMPORARY DIAGNOSTIC ENDPOINT
// 🔐 Requires valid Bearer token
// 🔐 ONLY for testing, remove after debugging

import { getCorsHeaders } from "@/lib/cors";
import { hashToken } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function OPTIONS(request) {
	const corsHeaders = getCorsHeaders(request.headers.get("origin"));
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

export async function GET(request) {
	const origin = request.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	const authHeader = request.headers.get("authorization") || "";
	if (!authHeader.toLowerCase().startsWith("bearer ")) {
		return NextResponse.json(
			{
				status: "invalid",
				message: "No Bearer token provided",
			},
			{ status: 401, headers: corsHeaders },
		);
	}

	const token = authHeader.slice(7).trim();
	if (!token) {
		return NextResponse.json(
			{
				status: "invalid",
				message: "Empty token",
			},
			{ status: 400, headers: corsHeaders },
		);
	}

	try {
		const tokenHash = hashToken(token);

		// Try to find the session EXACTLY as getAuthContext does
		const session = await prisma.foodTruckSession.findFirst({
			where: {
				tokenHash,
				revokedAt: null,
				expiresAt: { gt: new Date() },
			},
			include: {
				user: {
					select: {
						id: true,
						email: true,
						name: true,
					},
				},
			},
		});

		if (!session) {
			// Session not found - try to find it with other conditions
			const allSessions = await prisma.foodTruckSession.findMany({
				where: { tokenHash },
				include: {
					user: { select: { email: true } },
				},
			});

			if (allSessions.length === 0) {
				return NextResponse.json(
					{
						status: "not-found",
						message: "Token not found in database",
						debug: {
							tokenHashPrefix: tokenHash.slice(0, 16),
							totalSessionsInDB: 0,
						},
					},
					{ status: 404, headers: corsHeaders },
				);
			}

			// Token found but doesn't match criteria
			const firstSession = allSessions[0];
			return NextResponse.json(
				{
					status: "invalid",
					message: "Session found but doesn't match criteria",
					debug: {
						isRevoked: !!firstSession.revokedAt,
						isExpired: firstSession.expiresAt < new Date(),
						expiresAt: firstSession.expiresAt.toISOString(),
						revokedAt:
							firstSession.revokedAt?.toISOString() || null,
						userEmail: firstSession.user.email,
						now: new Date().toISOString(),
					},
				},
				{ status: 400, headers: corsHeaders },
			);
		}

		// Session is valid!
		return NextResponse.json(
			{
				status: "valid",
				message: "Token is valid",
				debug: {
					tokenHashPrefix: tokenHash.slice(0, 16),
					userId: session.user.id,
					email: session.user.email,
					expiresAt: session.expiresAt.toISOString(),
					expiresInDays: Math.floor(
						(session.expiresAt.getTime() - Date.now()) /
							(24 * 60 * 60 * 1000),
					),
					createdAt: session.createdAt.toISOString(),
				},
			},
			{ status: 200, headers: corsHeaders },
		);
	} catch (error) {
		console.error("Check session error", {
			error: error.message,
			timestamp: new Date().toISOString(),
		});
		return NextResponse.json(
			{
				status: "error",
				message: error.message,
			},
			{ status: 500, headers: corsHeaders },
		);
	}
}

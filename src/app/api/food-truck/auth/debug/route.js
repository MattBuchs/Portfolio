import { NextResponse } from "next/server";

import { hashToken } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

const SESSION_INACTIVITY_DAYS = 14;

export async function GET(request) {
	const authHeader = request.headers.get("authorization") || "";

	if (!authHeader) {
		return NextResponse.json(
			{
				status: "no-auth",
				message:
					"No Authorization header. Send: Authorization: Bearer <token>",
			},
			{ status: 200 },
		);
	}

	if (!authHeader.toLowerCase().startsWith("bearer ")) {
		return NextResponse.json(
			{
				status: "invalid-format",
				message:
					"Invalid Authorization format. Must be: Bearer <token>",
				received: authHeader.slice(0, 30),
			},
			{ status: 200 },
		);
	}

	const token = authHeader.slice(7).trim();
	if (!token) {
		return NextResponse.json(
			{
				status: "empty-token",
				message: "Token is empty",
			},
			{ status: 200 },
		);
	}

	const tokenHash = hashToken(token);
	const now = new Date();
	const inactiveCutoff = new Date(now);
	inactiveCutoff.setDate(inactiveCutoff.getDate() - SESSION_INACTIVITY_DAYS);

	try {
		const session = await prisma.foodTruckSession.findFirst({
			where: {
				tokenHash,
			},
			include: {
				user: true,
			},
		});

		if (!session) {
			// Count total sessions in DB
			const totalSessions = await prisma.foodTruckSession.count();

			return NextResponse.json(
				{
					status: "session-not-found",
					message: `Token not found in database`,
					debug: {
						tokenHashPrefix: tokenHash.slice(0, 10),
						totalSessionsInDb: totalSessions,
						isExpired: session && session.expiresAt < new Date(),
						isRevoked: session && !!session.revokedAt,
					},
				},
				{ status: 200 },
			);
		}

		const isExpired = session.expiresAt < now;
		const isRevoked = !!session.revokedAt;
		const isInactive = session.lastUsedAt < inactiveCutoff;

		return NextResponse.json(
			{
				status: "found",
				message: "Token found in database",
				valid: !isExpired && !isRevoked && !isInactive,
				debug: {
					tokenHashPrefix: tokenHash.slice(0, 10),
					isExpired,
					isRevoked,
					isInactive,
					expiresAt: session.expiresAt.toISOString(),
					lastUsedAt: session.lastUsedAt.toISOString(),
					user: {
						id: session.user.id,
						email: session.user.email,
					},
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Debug endpoint error:", error);
		return NextResponse.json(
			{
				status: "error",
				message: error.message,
				type: error.constructor.name,
			},
			{ status: 500 },
		);
	}
}

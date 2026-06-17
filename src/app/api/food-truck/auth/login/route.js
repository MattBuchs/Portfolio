import { NextResponse } from "next/server";

import {
	createSession,
	normalizeEmail,
	verifyPassword,
} from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
	try {
		const body = await request.json();
		const email = normalizeEmail(body?.email);
		const password = String(body?.password || "");

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Identifiants invalides" },
				{ status: 400 },
			);
		}

		const user = await prisma.foodTruckUser.findUnique({
			where: { email },
			include: {
				memberships: {
					include: {
						workspace: true,
					},
				},
			},
		});

		if (!user || !verifyPassword(password, user.passwordHash)) {
			return NextResponse.json(
				{ error: "Email ou mot de passe invalide" },
				{ status: 401 },
			);
		}

		const session = await createSession(user.id);

		return NextResponse.json({
			token: session.token,
			expiresAt: session.expiresAt,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
			workspaces: user.memberships.map((membership) => ({
				id: membership.workspace.id,
				name: membership.workspace.name,
				role: membership.role,
			})),
			activeWorkspaceId: user.memberships[0]?.workspace.id || null,
		});
	} catch (error) {
		console.error("Food truck login error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la connexion" },
			{ status: 500 },
		);
	}
}

import { NextResponse } from "next/server";

import {
	createSession,
	createSlug,
	hashPassword,
	normalizeEmail,
} from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

const emptyState = {
	products: [],
	orders: [],
	stockItems: [],
	checklist: [],
	finance: { cash: 0, card: 0, deliveryApps: 0, expenses: 0 },
};

export async function POST(request) {
	try {
		const body = await request.json();
		const email = normalizeEmail(body?.email);
		const password = String(body?.password || "");
		const name = String(body?.name || "").trim();
		const workspaceName = String(body?.workspaceName || "").trim();

		if (!email || password.length < 8 || !name || !workspaceName) {
			return NextResponse.json(
				{ error: "Données invalides" },
				{ status: 400 },
			);
		}

		const existing = await prisma.foodTruckUser.findUnique({
			where: { email },
			select: { id: true },
		});

		if (existing) {
			return NextResponse.json(
				{ error: "Cet email est déjà utilisé" },
				{ status: 409 },
			);
		}

		const passwordHash = hashPassword(password);

		const result = await prisma.$transaction(async (tx) => {
			const user = await tx.foodTruckUser.create({
				data: {
					email,
					passwordHash,
					name,
				},
			});

			const workspace = await tx.foodTruckWorkspace.create({
				data: {
					name: workspaceName,
					slug: createSlug(workspaceName),
				},
			});

			await tx.foodTruckMembership.create({
				data: {
					userId: user.id,
					workspaceId: workspace.id,
					role: "OWNER",
				},
			});

			await tx.foodTruckState.create({
				data: {
					workspaceId: workspace.id,
					data: emptyState,
				},
			});

			return { user, workspace };
		});

		const session = await createSession(result.user.id);

		return NextResponse.json({
			token: session.token,
			expiresAt: session.expiresAt,
			user: {
				id: result.user.id,
				email: result.user.email,
				name: result.user.name,
			},
			workspaces: [
				{
					id: result.workspace.id,
					name: result.workspace.name,
					role: "OWNER",
				},
			],
			activeWorkspaceId: result.workspace.id,
		});
	} catch (error) {
		console.error("Food truck register error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création du compte" },
			{ status: 500 },
		);
	}
}

import { NextResponse } from "next/server";

import {
	createSession,
	createSlug,
	hashPassword,
	hashToken,
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
		const inviteToken = String(body?.inviteToken || "").trim();

		if (!email || password.length < 8 || !name) {
			return NextResponse.json(
				{ error: "Données invalides" },
				{ status: 400 },
			);
		}

		// Either creating a workspace OR joining via invitation (or neither for skip mode)
		if (workspaceName && inviteToken) {
			return NextResponse.json(
				{
					error: "Veuillez fournir soit un nom d'espace soit un code d'invitation, pas les deux",
				},
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

			let workspace = null;
			let role = "OWNER";

			// If creating a new workspace
			if (workspaceName) {
				workspace = await tx.foodTruckWorkspace.create({
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
			}

			// If joining via invitation
			if (inviteToken) {
				const tokenHash = hashToken(inviteToken);
				const invite = await tx.foodTruckInvite.findUnique({
					where: { tokenHash },
				});

				if (!invite) {
					throw new Error("Code d'invitation invalide");
				}

				if (invite.acceptedAt) {
					throw new Error("Cette invitation a déjà été acceptée");
				}

				const now = new Date();
				if (invite.expiresAt < now) {
					throw new Error("Cette invitation a expiré");
				}

				if (normalizeEmail(email) !== normalizeEmail(invite.email)) {
					throw new Error(
						"Cette invitation ne correspond pas à votre adresse email",
					);
				}

				// Join the workspace with the role from invitation
				await tx.foodTruckMembership.upsert({
					where: {
						userId_workspaceId: {
							userId: user.id,
							workspaceId: invite.workspaceId,
						},
					},
					create: {
						userId: user.id,
						workspaceId: invite.workspaceId,
						role: invite.role,
					},
					update: {
						role: invite.role,
					},
				});

				// Mark invitation as accepted
				await tx.foodTruckInvite.update({
					where: { id: invite.id },
					data: { acceptedAt: new Date() },
				});

				workspace = await tx.foodTruckWorkspace.findUnique({
					where: { id: invite.workspaceId },
				});
				role = invite.role;
			}

			return { user, workspace, role };
		});

		const session = await createSession(result.user.id);

		// Fetch all workspaces for this user
		const memberships = await prisma.foodTruckMembership.findMany({
			where: { userId: result.user.id },
			include: { workspace: true },
		});

		const workspaces = memberships.map((m) => ({
			id: m.workspace.id,
			name: m.workspace.name,
			role: m.role,
		}));

		return NextResponse.json({
			token: session.token,
			expiresAt: session.expiresAt,
			user: {
				id: result.user.id,
				email: result.user.email,
				name: result.user.name,
			},
			workspaces,
			activeWorkspaceId: result.workspace?.id || null,
		});
	} catch (error) {
		console.error("Food truck register error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Erreur lors de la création du compte",
			},
			{ status: 500 },
		);
	}
}

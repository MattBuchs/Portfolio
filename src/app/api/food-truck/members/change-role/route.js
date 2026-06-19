import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function getWorkspaceId(request) {
	return request.headers.get("x-workspace-id")?.trim() || "";
}

export async function POST(request) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	const workspaceId = getWorkspaceId(request);
	if (!workspaceId) {
		return NextResponse.json(
			{ error: "ID d'espace requis" },
			{ status: 400 },
		);
	}

	// Check if user is OWNER of this workspace
	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership || membership.role !== "OWNER") {
		return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
	}

	const body = await request.json();
	const { memberId, newRole } = body;

	if (!memberId || !["MANAGER", "STAFF"].includes(newRole)) {
		return NextResponse.json(
			{ error: "Paramètres invalides" },
			{ status: 400 },
		);
	}

	try {
		// Check if member exists in this workspace
		const targetMembership = await prisma.foodTruckMembership.findUnique({
			where: {
				userId_workspaceId: {
					userId: memberId,
					workspaceId,
				},
			},
			include: { user: true },
		});

		if (!targetMembership) {
			return NextResponse.json(
				{ error: "Membre non trouvé" },
				{ status: 404 },
			);
		}

		// Prevent changing OWNER role
		if (targetMembership.role === "OWNER") {
			return NextResponse.json(
				{ error: "Le rôle OWNER ne peut pas être changé" },
				{ status: 403 },
			);
		}

		// Update the role
		const updated = await prisma.foodTruckMembership.update({
			where: {
				userId_workspaceId: {
					userId: memberId,
					workspaceId,
				},
			},
			data: { role: newRole },
		});

		return NextResponse.json({
			ok: true,
			member: {
				id: targetMembership.user.id,
				name: targetMembership.user.name,
				email: targetMembership.user.email,
				role: updated.role,
			},
		});
	} catch (error) {
		console.error("Error changing member role:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}

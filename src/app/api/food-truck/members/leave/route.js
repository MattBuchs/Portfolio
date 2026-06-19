import { NextResponse } from "next/server";

import { getAuthContext } from "@/lib/foodTruckAuth";
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

	try {
		const membership = await prisma.foodTruckMembership.findUnique({
			where: {
				userId_workspaceId: {
					userId: auth.user.id,
					workspaceId,
				},
			},
		});

		if (!membership) {
			return NextResponse.json(
				{ error: "Vous ne faites pas partie de cet espace" },
				{ status: 403 },
			);
		}

		// Check if user is the only OWNER (prevent leaving if only owner)
		const ownerCount = await prisma.foodTruckMembership.count({
			where: {
				workspaceId,
				role: "OWNER",
			},
		});

		if (membership.role === "OWNER" && ownerCount === 1) {
			return NextResponse.json(
				{
					error: "Vous êtes le seul propriétaire de cet espace. Vous ne pouvez pas le quitter.",
				},
				{ status: 409 },
			);
		}

		// Delete the membership
		await prisma.foodTruckMembership.delete({
			where: {
				userId_workspaceId: {
					userId: auth.user.id,
					workspaceId,
				},
			},
		});

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Erreur lors de la suppression du membership:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la suppression du membership" },
			{ status: 500 },
		);
	}
}

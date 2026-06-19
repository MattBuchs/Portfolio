import { NextResponse } from "next/server";

import { createSlug, getAuthContext } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	const body = await request.json();
	const name = String(body?.name || "").trim();

	if (!name || name.length < 2) {
		return NextResponse.json(
			{ error: "Le nom doit faire au moins 2 caractères" },
			{ status: 400 },
		);
	}

	// Check current workspace count
	const membershipCount = await prisma.foodTruckMembership.count({
		where: { userId: auth.user.id },
	});

	if (membershipCount >= 3) {
		return NextResponse.json(
			{ error: "Vous avez atteint la limite de 3 espaces" },
			{ status: 409 },
		);
	}

	try {
		const workspace = await prisma.foodTruckWorkspace.create({
			data: {
				name,
				slug: createSlug(name),
			},
		});

		await prisma.foodTruckMembership.create({
			data: {
				userId: auth.user.id,
				workspaceId: workspace.id,
				role: "OWNER",
			},
		});

		return NextResponse.json({
			id: workspace.id,
			name: workspace.name,
			role: "OWNER",
		});
	} catch (error) {
		console.error("Erreur lors de la création du workspace:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création du workspace" },
			{ status: 500 },
		);
	}
}

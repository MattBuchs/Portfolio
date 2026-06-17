import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers":
			"Content-Type, Authorization, x-workspace-id",
	};
}

function unauthorizedResponse() {
	return NextResponse.json(
		{ error: "Non autorisé" },
		{ status: 401, headers: corsHeaders() },
	);
}

function getWorkspaceId(request) {
	return request.headers.get("x-workspace-id")?.trim() || "";
}

export async function OPTIONS() {
	return new NextResponse(null, {
		status: 204,
		headers: corsHeaders(),
	});
}

export async function GET(request, { params }) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return unauthorizedResponse();
	}

	const workspaceId = getWorkspaceId(request);
	if (!workspaceId) {
		return NextResponse.json(
			{ error: "workspaceId manquant" },
			{ status: 400, headers: corsHeaders() },
		);
	}

	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership) {
		return NextResponse.json(
			{ error: "Accès refusé" },
			{ status: 403, headers: corsHeaders() },
		);
	}

	try {
		const { id } = await params;

		// Vérifier que l'item appartient au workspace
		const stockItem = await prisma.foodTruckStockItem.findUnique({
			where: { id },
		});

		if (!stockItem || stockItem.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Article de stock non trouvé" },
				{ status: 404, headers: corsHeaders() },
			);
		}

		const movements = await prisma.foodTruckStockMovement.findMany({
			where: { stockItemId: id },
			orderBy: { createdAt: "desc" },
			take: 50, // Derniers 50 mouvements
		});

		return NextResponse.json(movements, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck stock movements GET error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération des mouvements" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

export async function POST(request, { params }) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return unauthorizedResponse();
	}

	const workspaceId = getWorkspaceId(request);
	if (!workspaceId) {
		return NextResponse.json(
			{ error: "workspaceId manquant" },
			{ status: 400, headers: corsHeaders() },
		);
	}

	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership) {
		return NextResponse.json(
			{ error: "Accès refusé" },
			{ status: 403, headers: corsHeaders() },
		);
	}

	try {
		const { id } = await params;

		// Vérifier que l'item appartient au workspace
		const stockItem = await prisma.foodTruckStockItem.findUnique({
			where: { id },
		});

		if (!stockItem || stockItem.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Article de stock non trouvé" },
				{ status: 404, headers: corsHeaders() },
			);
		}

		const { type, quantity, reason, notes, dlc } = await request.json();

		if (!type || quantity === undefined) {
			return NextResponse.json(
				{ error: "Champs requis: type, quantity" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		if (!["add", "remove", "adjustment"].includes(type)) {
			return NextResponse.json(
				{ error: "Type invalide (add, remove, adjustment)" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		// Traiter les dlcEntries
		let newDlcEntries = Array.isArray(stockItem.dlcEntries)
			? stockItem.dlcEntries
			: [];

		const targetDlc = dlc || ""; // Utiliser dlc vide par défaut

		if (type === "add") {
			// Trouver l'entrée DLC existante ou en créer une nouvelle
			const existingEntry = newDlcEntries.find(
				(entry) => entry.dlc === targetDlc,
			);

			if (existingEntry) {
				existingEntry.qty += Number(quantity);
			} else {
				newDlcEntries.push({
					dlc: targetDlc,
					qty: Number(quantity),
				});
			}
		} else if (type === "remove") {
			// Trouver l'entrée DLC et réduire la quantité
			const existingEntry = newDlcEntries.find(
				(entry) => entry.dlc === targetDlc,
			);

			if (existingEntry) {
				existingEntry.qty = Math.max(
					0,
					existingEntry.qty - Number(quantity),
				);
				// Supprimer l'entrée si la quantité devient 0
				newDlcEntries = newDlcEntries.filter((entry) => entry.qty > 0);
			}
		} else if (type === "adjustment") {
			// Remplacer la quantité
			const existingEntry = newDlcEntries.find(
				(entry) => entry.dlc === targetDlc,
			);

			if (existingEntry) {
				existingEntry.qty = Math.max(0, Number(quantity));
				// Supprimer l'entrée si la quantité devient 0
				newDlcEntries = newDlcEntries.filter((entry) => entry.qty > 0);
			} else if (Number(quantity) > 0) {
				newDlcEntries.push({
					dlc: targetDlc,
					qty: Number(quantity),
				});
			}
		}

		// Créer le mouvement de stock
		const movement = await prisma.foodTruckStockMovement.create({
			data: {
				stockItemId: id,
				type,
				quantity: Number(quantity),
				reason: reason ? String(reason).trim() : null,
				notes: notes ? String(notes).trim() : null,
			},
		});

		// Mettre à jour les dlcEntries du stock
		await prisma.foodTruckStockItem.update({
			where: { id },
			data: { dlcEntries: newDlcEntries },
		});

		return NextResponse.json(movement, {
			status: 201,
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck stock movement POST error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création du mouvement" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

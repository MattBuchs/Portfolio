import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
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

export async function PUT(request, { params }) {
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
		const existingItem = await prisma.foodTruckStockItem.findUnique({
			where: { id },
		});

		if (!existingItem || existingItem.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Article de stock non trouvé" },
				{ status: 404, headers: corsHeaders() },
			);
		}

		const { name, category, dlcEntries, unit, minQty, alertDaysThreshold } =
			await request.json();

		const updateData = {};
		if (name !== undefined) updateData.name = String(name).trim();
		if (category !== undefined)
			updateData.category = String(category).trim() || "Général";
		if (dlcEntries !== undefined) {
			// Validate dlcEntries format
			updateData.dlcEntries = Array.isArray(dlcEntries)
				? dlcEntries.filter(
						(entry) =>
							entry &&
							typeof entry.dlc === "string" &&
							typeof entry.qty === "number" &&
							entry.qty >= 0,
					)
				: [];
		}
		if (unit !== undefined) updateData.unit = String(unit).trim() || "pcs";
		if (minQty !== undefined) updateData.minQty = Number(minQty);
		if (alertDaysThreshold !== undefined)
			updateData.alertDaysThreshold = Math.max(
				1,
				Number(alertDaysThreshold),
			);

		const item = await prisma.foodTruckStockItem.update({
			where: { id },
			data: updateData,
		});

		return NextResponse.json(item, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck stock PUT error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour de l'article" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

export async function DELETE(request, { params }) {
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
		const existingItem = await prisma.foodTruckStockItem.findUnique({
			where: { id },
		});

		if (!existingItem || existingItem.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Article de stock non trouvé" },
				{ status: 404, headers: corsHeaders() },
			);
		}

		await prisma.foodTruckStockItem.delete({
			where: { id },
		});

		return NextResponse.json({ success: true }, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck stock DELETE error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la suppression de l'article de stock" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

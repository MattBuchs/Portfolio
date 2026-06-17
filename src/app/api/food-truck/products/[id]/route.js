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

		// Vérifier que le produit appartient au workspace
		const existingProduct = await prisma.foodTruckProduct.findUnique({
			where: { id },
		});

		if (!existingProduct || existingProduct.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Produit non trouvé" },
				{ status: 404, headers: corsHeaders() },
			);
		}

		const { name, category, price, description } = await request.json();

		// Validation minimale
		if (!name && price === undefined && !description) {
			return NextResponse.json(
				{ error: "Au moins un champ à modifier requis" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const updateData = {};
		if (name !== undefined) updateData.name = String(name).trim();
		if (category !== undefined)
			updateData.category = String(category).trim() || "Général";
		if (price !== undefined) updateData.price = Number(price);
		if (description !== undefined)
			updateData.description = description
				? String(description).trim()
				: null;

		const product = await prisma.foodTruckProduct.update({
			where: { id },
			data: updateData,
		});

		return NextResponse.json(product, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck product PUT error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour du produit" },
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

		await prisma.foodTruckProduct.delete({
			where: { id },
		});

		return NextResponse.json({ success: true }, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck product DELETE error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la suppression du produit" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

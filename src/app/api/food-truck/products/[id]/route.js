import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "DELETE, OPTIONS",
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
		await prisma.foodTruckProduct.delete({
			where: { id: params.id },
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

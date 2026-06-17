import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, PATCH, DELETE, OPTIONS",
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

export async function PATCH(request, { params }) {
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
		const { status } = await request.json();

		if (!status) {
			return NextResponse.json(
				{ error: "Champ requis: status" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const order = await prisma.foodTruckOrder.update({
			where: { id: params.id },
			data: { status },
			include: { lines: true },
		});

		return NextResponse.json(order, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck order PATCH error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour de la commande" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

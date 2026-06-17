import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, PATCH, PUT, DELETE, OPTIONS",
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
		const resolvedParams = await params;
		const { status } = await request.json();

		if (!status) {
			return NextResponse.json(
				{ error: "Champ requis: status" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const order = await prisma.foodTruckOrder.update({
			where: { id: resolvedParams.id },
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
		const resolvedParams = await params;
		const { client, lines, status } = await request.json();

		if (!client || !lines || !status) {
			return NextResponse.json(
				{ error: "Champs requis: client, lines, status" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		// Calculate total
		const total = lines.reduce(
			(sum, line) => sum + (line.unitPrice || 0) * (line.qty || 0),
			0,
		);

		// Delete old lines and create new ones
		await prisma.foodTruckOrderLine.deleteMany({
			where: { orderId: resolvedParams.id },
		});

		const order = await prisma.foodTruckOrder.update({
			where: { id: resolvedParams.id },
			data: {
				client,
				status,
				total: Math.max(0, total),
				lines: {
					create: lines.map((line) => ({
						productId: line.productId || null,
						productName: String(line.productName || "Produit"),
						unitPrice: line.unitPrice || 0,
						qty: line.qty || 0,
					})),
				},
			},
			include: { lines: true },
		});

		return NextResponse.json(
			{
				...order,
				orderDate: order.orderDate.toISOString().split("T")[0],
				createdAt: order.createdAt.toISOString(),
			},
			{ headers: corsHeaders() },
		);
	} catch (error) {
		console.error("Food truck order PUT error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour complète de la commande" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

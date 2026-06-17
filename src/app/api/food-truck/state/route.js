import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
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

export async function GET(request) {
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
		// Aggregate data from normalized tables
		const [products, orders, stockItems, checklistItems, finances] =
			await Promise.all([
				prisma.foodTruckProduct.findMany({
					where: { workspaceId },
				}),
				prisma.foodTruckOrder.findMany({
					where: { workspaceId },
					include: { lines: true },
				}),
				prisma.foodTruckStockItem.findMany({
					where: { workspaceId },
				}),
				prisma.foodTruckChecklistItem.findMany({
					where: { workspaceId },
				}),
				prisma.foodTruckFinance.findMany({
					where: { workspaceId },
				}),
			]);

		return NextResponse.json(
			{
				data: {
					products,
					orders: orders.map((o) => ({
						...o,
						orderDate: o.orderDate.toISOString().split("T")[0],
						createdAt: o.createdAt.toISOString(),
					})),
					stockItems: stockItems.map((s) => ({
						...s,
						dlcEntries: Array.isArray(s.dlcEntries)
							? s.dlcEntries
							: [],
					})),
					checklist: checklistItems,
					finance: finances,
				},
				updatedAt: new Date().toISOString(),
			},
			{ headers: corsHeaders() },
		);
	} catch (error) {
		console.error("Food truck GET error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération de l'état food truck" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

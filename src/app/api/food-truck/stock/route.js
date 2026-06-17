import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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
		const items = await prisma.foodTruckStockItem.findMany({
			where: { workspaceId },
			orderBy: { createdAt: "desc" },
		});

		const itemsWithDateString = items.map((item) => ({
			...item,
			dlc: item.dlc ? item.dlc.toISOString().split("T")[0] : null,
		}));

		return NextResponse.json(itemsWithDateString, {
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck stock GET error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération du stock" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

export async function POST(request) {
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
		const { name, category, qty, unit, minQty, dlc } = await request.json();

		if (!name) {
			return NextResponse.json(
				{ error: "Champ requis: name" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const item = await prisma.foodTruckStockItem.create({
			data: {
				workspaceId,
				name: String(name).trim(),
				category: category ? String(category).trim() : "Général",
				qty: Number(qty) || 0,
				unit: unit ? String(unit).trim() : "pcs",
				minQty: Number(minQty) || 0,
				dlc: dlc ? new Date(`${dlc}T12:00:00`) : null,
			},
		});

		return NextResponse.json(item, {
			status: 201,
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck stock POST error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création de l'article de stock" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

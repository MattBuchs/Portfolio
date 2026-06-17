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
		const products = await prisma.foodTruckProduct.findMany({
			where: { workspaceId },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(products, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck products GET error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération des produits" },
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
		const { name, category, price, description } = await request.json();

		if (!name || price === undefined) {
			return NextResponse.json(
				{ error: "Champs requis: name, price" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const product = await prisma.foodTruckProduct.create({
			data: {
				workspaceId,
				name: String(name).trim(),
				category: category ? String(category).trim() : "Général",
				price: Number(price),
				description: description ? String(description).trim() : null,
			},
		});

		return NextResponse.json(product, {
			status: 201,
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck products POST error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création du produit" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

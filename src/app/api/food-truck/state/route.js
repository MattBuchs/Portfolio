import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
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

function normalizePayload(data) {
	if (!data || typeof data !== "object") {
		return {
			products: [],
			orders: [],
			stockItems: [],
			checklist: [],
			finance: { cash: 0, card: 0, deliveryApps: 0, expenses: 0 },
		};
	}

	return {
		products: Array.isArray(data.products) ? data.products : [],
		orders: Array.isArray(data.orders) ? data.orders : [],
		stockItems: Array.isArray(data.stockItems) ? data.stockItems : [],
		checklist: Array.isArray(data.checklist) ? data.checklist : [],
		finance:
			data.finance && typeof data.finance === "object"
				? {
						cash: Number(data.finance.cash) || 0,
						card: Number(data.finance.card) || 0,
						deliveryApps: Number(data.finance.deliveryApps) || 0,
						expenses: Number(data.finance.expenses) || 0,
					}
				: { cash: 0, card: 0, deliveryApps: 0, expenses: 0 },
	};
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
		const state = await prisma.foodTruckState.findUnique({
			where: { workspaceId },
		});

		return NextResponse.json(
			{
				data: normalizePayload(state?.data),
				updatedAt: state?.updatedAt ?? null,
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

export async function PUT(request) {
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
		const body = await request.json();
		const payload = normalizePayload(body?.data);

		const state = await prisma.foodTruckState.upsert({
			where: { workspaceId },
			update: { data: payload },
			create: {
				workspaceId,
				data: payload,
			},
		});

		return NextResponse.json(
			{
				ok: true,
				updatedAt: state.updatedAt,
			},
			{ headers: corsHeaders() },
		);
	} catch (error) {
		console.error("Food truck PUT error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde de l'état food truck" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

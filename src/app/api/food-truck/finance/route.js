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
		const url = new URL(request.url);
		const date = url.searchParams.get("date");

		const where = { workspaceId };

		if (date) {
			const [year, month, day] = date.split("-").map(Number);
			if (year && month && day) {
				const startDate = new Date(year, month - 1, day);
				const endDate = new Date(year, month - 1, day + 1);

				where.financeDate = {
					gte: startDate,
					lt: endDate,
				};
			}
		}

		const finances = await prisma.foodTruckFinance.findMany({
			where,
			orderBy: { financeDate: "desc" },
		});

		const financesWithDateString = finances.map((finance) => ({
			...finance,
			financeDate: finance.financeDate.toISOString().split("T")[0],
		}));

		return NextResponse.json(financesWithDateString, {
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck finance GET error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération des données financières" },
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
		const { financeDate, cash, card, deliveryApps, expenses } =
			await request.json();

		if (!financeDate) {
			return NextResponse.json(
				{ error: "Champ requis: financeDate (YYYY-MM-DD)" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const parsedDate = new Date(`${financeDate}T12:00:00`);

		const finance = await prisma.foodTruckFinance.upsert({
			where: {
				workspaceId_financeDate: {
					workspaceId,
					financeDate: parsedDate,
				},
			},
			update: {
				cash: Number(cash) || 0,
				card: Number(card) || 0,
				deliveryApps: Number(deliveryApps) || 0,
				expenses: Number(expenses) || 0,
			},
			create: {
				workspaceId,
				financeDate: parsedDate,
				cash: Number(cash) || 0,
				card: Number(card) || 0,
				deliveryApps: Number(deliveryApps) || 0,
				expenses: Number(expenses) || 0,
			},
		});

		return NextResponse.json(finance, {
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck finance PUT error:", error);
		return NextResponse.json(
			{
				error: "Erreur lors de la mise à jour des données financières",
			},
			{ status: 500, headers: corsHeaders() },
		);
	}
}

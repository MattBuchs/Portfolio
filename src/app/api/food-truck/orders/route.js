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
		const url = new URL(request.url);
		const date = url.searchParams.get("date");

		const where = { workspaceId };

		if (date) {
			const [year, month, day] = date.split("-").map(Number);
			if (year && month && day) {
				const startDate = new Date(year, month - 1, day);
				const endDate = new Date(year, month - 1, day + 1);

				where.orderDate = {
					gte: startDate,
					lt: endDate,
				};
			}
		}

		const orders = await prisma.foodTruckOrder.findMany({
			where,
			include: { lines: true },
			orderBy: { createdAt: "desc" },
		});

		const ordersWithDateString = orders.map((order) => ({
			...order,
			orderDate: order.orderDate.toISOString().split("T")[0],
		}));

		return NextResponse.json(ordersWithDateString, {
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck orders GET error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération des commandes" },
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
		const { client, status, orderDate, lines } = await request.json();

		if (!client || !lines || !Array.isArray(lines)) {
			return NextResponse.json(
				{ error: "Champs requis: client, lines" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const parsedDate = orderDate
			? new Date(`${orderDate}T12:00:00`)
			: new Date();

		const order = await prisma.foodTruckOrder.create({
			data: {
				workspaceId,
				client: String(client).trim(),
				status: status || "attente",
				orderDate: parsedDate,
				total: lines.reduce(
					(sum, line) => sum + line.unitPrice * line.qty,
					0,
				),
				lines: {
					create: lines.map((line) => ({
						productId: line.productId || null,
						productName: String(line.productName || "Produit"),
						qty: Number(line.qty),
						unitPrice: Number(line.unitPrice),
					})),
				},
			},
			include: { lines: true },
		});

		return NextResponse.json(order, {
			status: 201,
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck orders POST error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création de la commande" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

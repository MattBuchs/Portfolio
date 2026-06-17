import { NextResponse } from "next/server";

import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function corsHeaders() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
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
		const items = await prisma.foodTruckChecklistItem.findMany({
			where: { workspaceId },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(items, { headers: corsHeaders() });
	} catch (error) {
		console.error("Food truck checklist GET error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération de la checklist" },
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
		const { label } = await request.json();

		if (!label) {
			return NextResponse.json(
				{ error: "Champ requis: label" },
				{ status: 400, headers: corsHeaders() },
			);
		}

		const item = await prisma.foodTruckChecklistItem.create({
			data: {
				workspaceId,
				label: String(label).trim(),
				done: false,
			},
		});

		return NextResponse.json(item, {
			status: 201,
			headers: corsHeaders(),
		});
	} catch (error) {
		console.error("Food truck checklist POST error:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la création de l'élément checklist" },
			{ status: 500, headers: corsHeaders() },
		);
	}
}

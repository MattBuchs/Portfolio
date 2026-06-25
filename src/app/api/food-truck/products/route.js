import { NextResponse } from "next/server";

import { getCorsHeaders } from "@/lib/cors";
import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";
import { validateName, validatePrice } from "@/lib/validation";

function unauthorizedResponse(origin) {
	const corsHeaders = getCorsHeaders(origin);
	return NextResponse.json(
		{ error: "Unauthorized" },
		{ status: 401, headers: corsHeaders },
	);
}

function getWorkspaceId(request) {
	return request.headers.get("x-workspace-id")?.trim() || "";
}

export async function OPTIONS(request) {
	const corsHeaders = getCorsHeaders(request.headers.get("origin"));
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

export async function GET(request) {
	const origin = request.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	const auth = await getAuthContext(request);
	if (!auth) {
		return unauthorizedResponse(origin);
	}

	const workspaceId = getWorkspaceId(request);
	if (!workspaceId) {
		return NextResponse.json(
			{ error: "Missing workspaceId" },
			{ status: 400, headers: corsHeaders },
		);
	}

	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership) {
		return NextResponse.json(
			{ error: "Workspace not found" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		const products = await prisma.foodTruckProduct.findMany({
			where: { workspaceId },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(products, { headers: corsHeaders });
	} catch (error) {
		console.error("Products GET error:", {
			timestamp: new Date().toISOString(),
			error: error.message,
		});
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

export async function POST(request) {
	const origin = request.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	const auth = await getAuthContext(request);
	if (!auth) {
		return unauthorizedResponse(origin);
	}

	const workspaceId = getWorkspaceId(request);
	if (!workspaceId) {
		return NextResponse.json(
			{ error: "Missing workspaceId" },
			{ status: 400, headers: corsHeaders },
		);
	}

	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership) {
		return NextResponse.json(
			{ error: "Workspace not found" },
			{ status: 403, headers: corsHeaders },
		);
	}

	// MANAGER and OWNER can create products
	if (membership.role === "STAFF") {
		return NextResponse.json(
			{ error: "Insufficient permissions" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		const { name, category, price, description } = await request.json();

		if (!name || price === undefined) {
			return NextResponse.json(
				{ error: "Missing required fields: name, price" },
				{ status: 400, headers: corsHeaders },
			);
		}

		// Validate name
		if (!validateName(name)) {
			return NextResponse.json(
				{ error: "Invalid product name" },
				{ status: 400, headers: corsHeaders },
			);
		}

		// Validate price - NO NEGATIVE PRICES
		const priceValidation = validatePrice(price);
		if (!priceValidation.valid) {
			return NextResponse.json(
				{ error: priceValidation.error },
				{ status: 400, headers: corsHeaders },
			);
		}

		const product = await prisma.foodTruckProduct.create({
			data: {
				workspaceId,
				name: String(name).trim(),
				category: category ? String(category).trim() : "General",
				price: priceValidation.value,
				description: description ? String(description).trim() : null,
			},
		});

		return NextResponse.json(product, {
			status: 201,
			headers: corsHeaders,
		});
	} catch (error) {
		console.error("Products POST error:", {
			timestamp: new Date().toISOString(),
			error: error.message,
			userId: auth.user.id,
		});
		return NextResponse.json(
			{ error: "Failed to create product" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

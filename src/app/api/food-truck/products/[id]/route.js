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

export async function PUT(request, { params }) {
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

	// Only MANAGER and OWNER can edit
	if (membership.role === "STAFF") {
		return NextResponse.json(
			{ error: "Insufficient permissions" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		const { id } = await params;

		// Verify product belongs to workspace
		const existingProduct = await prisma.foodTruckProduct.findUnique({
			where: { id },
		});

		if (!existingProduct || existingProduct.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Product not found" },
				{ status: 404, headers: corsHeaders },
			);
		}

		const { name, category, price, description } = await request.json();

		// At least one field must be provided
		if (
			name === undefined &&
			price === undefined &&
			description === undefined &&
			category === undefined
		) {
			return NextResponse.json(
				{ error: "No fields to update" },
				{ status: 400, headers: corsHeaders },
			);
		}

		const updateData = {};

		if (name !== undefined) {
			if (!validateName(name)) {
				return NextResponse.json(
					{ error: "Invalid product name" },
					{ status: 400, headers: corsHeaders },
				);
			}
			updateData.name = String(name).trim();
		}

		if (category !== undefined) {
			updateData.category = String(category).trim() || "General";
		}

		if (price !== undefined) {
			const priceValidation = validatePrice(price);
			if (!priceValidation.valid) {
				return NextResponse.json(
					{ error: priceValidation.error },
					{ status: 400, headers: corsHeaders },
				);
			}
			updateData.price = priceValidation.value;
		}

		if (description !== undefined) {
			updateData.description = description
				? String(description).trim()
				: null;
		}

		const product = await prisma.foodTruckProduct.update({
			where: { id },
			data: updateData,
		});

		console.log({
			timestamp: new Date().toISOString(),
			action: "UPDATE_PRODUCT",
			userId: auth.user.id,
			workspaceId,
			productId: id,
		});

		return NextResponse.json(product, { headers: corsHeaders });
	} catch (error) {
		console.error("Product PUT error:", {
			timestamp: new Date().toISOString(),
			error: error.message,
		});
		return NextResponse.json(
			{ error: "Failed to update product" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

export async function DELETE(request, { params }) {
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

	// Only OWNER can delete products
	if (membership.role !== "OWNER") {
		return NextResponse.json(
			{ error: "Only workspace owner can delete products" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		const { id } = await params;

		// Verify product belongs to workspace BEFORE delete
		const product = await prisma.foodTruckProduct.findUnique({
			where: { id },
		});

		if (!product || product.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Product not found" },
				{ status: 404, headers: corsHeaders },
			);
		}

		await prisma.foodTruckProduct.delete({
			where: { id },
		});

		console.log({
			timestamp: new Date().toISOString(),
			action: "DELETE_PRODUCT",
			userId: auth.user.id,
			workspaceId,
			productId: id,
			status: "success",
		});

		return NextResponse.json({ success: true }, { headers: corsHeaders });
	} catch (error) {
		console.error("Product DELETE error:", {
			timestamp: new Date().toISOString(),
			error: error.message,
		});
		return NextResponse.json(
			{ error: "Failed to delete product" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

// ✅ TEMPLATE FOR ALL food-truck ENDPOINTS
// Copy this pattern to every api/food-truck/*/route.js file

import { getCorsHeaders } from "@/lib/cors";
import { getAuthContext, getWorkspaceMembership } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";
import { validateName } from "@/lib/validation";
import { NextResponse } from "next/server";

// ✅ Helper: Get workspace ID from header
function getWorkspaceId(request) {
	return request.headers.get("x-workspace-id")?.trim() || "";
}

// ✅ Helper: Consistent unauthorized response with CORS
function unauthorizedResponse(origin) {
	const corsHeaders = getCorsHeaders(origin);
	return NextResponse.json(
		{ error: "Unauthorized" },
		{ status: 401, headers: corsHeaders },
	);
}

// ✅ OPTIONS handler for preflight
export async function OPTIONS(request) {
	const corsHeaders = getCorsHeaders(request.headers.get("origin"));
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

// ✅ GET handler
export async function GET(request) {
	// 1. Get origin for CORS
	const origin = request.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	// 2. Check authentication
	const auth = await getAuthContext(request);
	if (!auth) {
		return unauthorizedResponse(origin);
	}

	// 3. Check workspace
	const workspaceId = getWorkspaceId(request);
	if (!workspaceId) {
		return NextResponse.json(
			{ error: "Missing workspaceId" },
			{ status: 400, headers: corsHeaders },
		);
	}

	// 4. Check membership
	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership) {
		return NextResponse.json(
			{ error: "Workspace not found" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		// 5. Fetch data
		const data = await prisma.foodTruck[Model].findMany({
			where: { workspaceId },
		});

		return NextResponse.json(data, { headers: corsHeaders });
	} catch (error) {
		console.error("GET error:", {
			timestamp: new Date().toISOString(),
			error: error.message,
			userId: auth.user.id,
			workspaceId,
		});
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

// ✅ POST handler
export async function POST(request) {
	// 1. Get origin for CORS
	const origin = request.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	// 2. Check authentication
	const auth = await getAuthContext(request);
	if (!auth) {
		return unauthorizedResponse(origin);
	}

	// 3. Check workspace
	const workspaceId = getWorkspaceId(request);
	if (!workspaceId) {
		return NextResponse.json(
			{ error: "Missing workspaceId" },
			{ status: 400, headers: corsHeaders },
		);
	}

	// 4. Check membership
	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership) {
		return NextResponse.json(
			{ error: "Workspace not found" },
			{ status: 403, headers: corsHeaders },
		);
	}

	// 5. Check permissions (MANAGER+ can create)
	if (membership.role === "STAFF") {
		return NextResponse.json(
			{ error: "Insufficient permissions" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		const body = await request.json();

		// 6. Validate inputs
		if (!body.name) {
			return NextResponse.json(
				{ error: "Missing required field: name" },
				{ status: 400, headers: corsHeaders },
			);
		}

		if (!validateName(body.name)) {
			return NextResponse.json(
				{ error: "Invalid name format" },
				{ status: 400, headers: corsHeaders },
			);
		}

		// 7. Create resource
		const resource = await prisma.foodTruck[Model].create({
			data: {
				workspaceId,
				name: body.name.trim(),
				// ... other fields
			},
		});

		// 8. Audit log
		console.log({
			timestamp: new Date().toISOString(),
			action: "CREATE_[MODEL]",
			userId: auth.user.id,
			workspaceId,
			resourceId: resource.id,
		});

		return NextResponse.json(resource, {
			status: 201,
			headers: corsHeaders,
		});
	} catch (error) {
		console.error("POST error:", {
			timestamp: new Date().toISOString(),
			error: error.message,
			userId: auth.user.id,
		});
		return NextResponse.json(
			{ error: "Failed to create resource" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

// ✅ PUT handler (full update)
export async function PUT(request, { params }) {
	const origin = request.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	const auth = await getAuthContext(request);
	if (!auth) return unauthorizedResponse(origin);

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

	if (membership.role === "STAFF") {
		return NextResponse.json(
			{ error: "Insufficient permissions" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		const { id } = await params;
		const body = await request.json();

		// Verify ownership
		const existing = await prisma.foodTruck[Model].findUnique({
			where: { id },
		});

		if (!existing || existing.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Resource not found" },
				{ status: 404, headers: corsHeaders },
			);
		}

		const updated = await prisma.foodTruck[Model].update({
			where: { id },
			data: {
				name: body.name?.trim(),
				// ... other fields
			},
		});

		console.log({
			timestamp: new Date().toISOString(),
			action: "UPDATE_[MODEL]",
			userId: auth.user.id,
			resourceId: id,
		});

		return NextResponse.json(updated, { headers: corsHeaders });
	} catch (error) {
		console.error("PUT error:", { error: error.message });
		return NextResponse.json(
			{ error: "Failed to update" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

// ✅ DELETE handler (with ownership check!)
export async function DELETE(request, { params }) {
	const origin = request.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	const auth = await getAuthContext(request);
	if (!auth) return unauthorizedResponse(origin);

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

	// ⚠️ CRITICAL: Only OWNER can delete
	if (membership.role !== "OWNER") {
		return NextResponse.json(
			{ error: "Only workspace owner can delete" },
			{ status: 403, headers: corsHeaders },
		);
	}

	try {
		const { id } = await params;

		// ⚠️ CRITICAL: Verify ownership BEFORE delete
		const existing = await prisma.foodTruck[Model].findUnique({
			where: { id },
		});

		if (!existing || existing.workspaceId !== workspaceId) {
			return NextResponse.json(
				{ error: "Resource not found" },
				{ status: 404, headers: corsHeaders },
			);
		}

		await prisma.foodTruck[Model].delete({
			where: { id },
		});

		// ⚠️ Always log deletions
		console.log({
			timestamp: new Date().toISOString(),
			action: "DELETE_[MODEL]",
			userId: auth.user.id,
			resourceId: id,
			status: "success",
		});

		return NextResponse.json({ success: true }, { headers: corsHeaders });
	} catch (error) {
		console.error("DELETE error:", { error: error.message });
		return NextResponse.json(
			{ error: "Failed to delete" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

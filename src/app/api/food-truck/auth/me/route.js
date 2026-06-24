import { NextResponse } from "next/server";

import { getCorsHeaders } from "@/lib/cors";
import { getAuthContext } from "@/lib/foodTruckAuth";

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

	try {
		const auth = await getAuthContext(request);
		if (!auth) {
			// getAuthContext already logs the error details
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401, headers: corsHeaders },
			);
		}

		return NextResponse.json(
			{
				user: {
					id: auth.user.id,
					email: auth.user.email,
					name: auth.user.name,
				},
				workspaces: auth.user.memberships.map((membership) => ({
					id: membership.workspace.id,
					name: membership.workspace.name,
					role: membership.role,
				})),
				activeWorkspaceId:
					auth.user.memberships[0]?.workspace.id || null,
			},
			{ status: 200, headers: corsHeaders },
		);
	} catch (error) {
		console.error("Auth endpoint error", {
			timestamp: new Date().toISOString(),
			error: error.message,
			type: error.constructor.name,
			stack: error.stack,
		});
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

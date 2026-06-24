import { NextResponse } from "next/server";

import { getCorsHeaders } from "@/lib/cors";
import {
	createSession,
	normalizeEmail,
	verifyPassword,
} from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";
import { validateEmail } from "@/lib/validation";

export async function OPTIONS(request) {
	const corsHeaders = getCorsHeaders(request.headers.get("origin"));
	return new Response(null, { status: 200, headers: corsHeaders });
}

export async function POST(request) {
	const corsHeaders = getCorsHeaders(request.headers.get("origin"));

	try {
		const body = await request.json();
		const email = normalizeEmail(body?.email);
		const password = String(body?.password || "");

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password required" },
				{ status: 400, headers: corsHeaders },
			);
		}

		if (!validateEmail(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400, headers: corsHeaders },
			);
		}

		if (password.length < 1) {
			return NextResponse.json(
				{ error: "Password required" },
				{ status: 400, headers: corsHeaders },
			);
		}

		const user = await prisma.foodTruckUser.findUnique({
			where: { email },
			include: {
				memberships: {
					include: {
						workspace: true,
					},
				},
			},
		});

		// Use constant time comparison to prevent timing attacks
		if (!user || !verifyPassword(password, user.passwordHash)) {
			// Return generic error to prevent user enumeration
			return NextResponse.json(
				{ error: "Invalid email or password" },
				{ status: 401, headers: corsHeaders },
			);
		}

		const session = await createSession(user.id);

		return NextResponse.json(
			{
				token: session.token,
				expiresAt: session.expiresAt,
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
				workspaces: user.memberships.map((membership) => ({
					id: membership.workspace.id,
					name: membership.workspace.name,
					role: membership.role,
				})),
				activeWorkspaceId: user.memberships[0]?.workspace.id || null,
			},
			{ status: 200, headers: corsHeaders },
		);
	} catch (error) {
		console.error("Login error:", {
			timestamp: new Date().toISOString(),
			error: error.message,
			type: error.constructor.name,
		});
		return NextResponse.json(
			{ error: "Login failed" },
			{ status: 500, headers: corsHeaders },
		);
	}
}

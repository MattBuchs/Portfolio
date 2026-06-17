import { NextResponse } from "next/server";

import {
	createOpaqueToken,
	getAuthContext,
	getWorkspaceMembership,
	hashToken,
	normalizeEmail,
	roleCanManageMembers,
} from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function getWorkspaceId(request) {
	return request.headers.get("x-workspace-id")?.trim() || "";
}

export async function POST(request) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	const workspaceId = getWorkspaceId(request);
	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership || !roleCanManageMembers(membership.role)) {
		return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
	}

	const body = await request.json();
	const email = normalizeEmail(body?.email);
	const role = body?.role === "MANAGER" ? "MANAGER" : "STAFF";

	if (!email) {
		return NextResponse.json({ error: "Email invalide" }, { status: 400 });
	}

	const token = createOpaqueToken();
	const tokenHash = hashToken(token);
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + 7);

	await prisma.foodTruckInvite.create({
		data: {
			workspaceId,
			invitedById: auth.user.id,
			email,
			role,
			tokenHash,
			expiresAt,
		},
	});

	return NextResponse.json({
		token,
		email,
		role,
		expiresAt: expiresAt.toISOString(),
	});
}

import { NextResponse } from "next/server";

import { getAuthContext, hashToken, normalizeEmail } from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	const body = await request.json();
	const token = String(body?.token || "").trim();
	if (!token) {
		return NextResponse.json({ error: "Token invalide" }, { status: 400 });
	}

	const tokenHash = hashToken(token);
	const invite = await prisma.foodTruckInvite.findUnique({
		where: { tokenHash },
	});

	if (!invite || invite.acceptedAt || invite.expiresAt <= new Date()) {
		return NextResponse.json(
			{ error: "Invitation invalide ou expirée" },
			{ status: 400 },
		);
	}

	if (normalizeEmail(auth.user.email) !== normalizeEmail(invite.email)) {
		return NextResponse.json(
			{ error: "Cette invitation ne correspond pas à votre compte" },
			{ status: 403 },
		);
	}

	await prisma.$transaction(async (tx) => {
		await tx.foodTruckMembership.upsert({
			where: {
				userId_workspaceId: {
					userId: auth.user.id,
					workspaceId: invite.workspaceId,
				},
			},
			create: {
				userId: auth.user.id,
				workspaceId: invite.workspaceId,
				role: invite.role,
			},
			update: {
				role: invite.role,
			},
		});

		await tx.foodTruckInvite.update({
			where: { id: invite.id },
			data: { acceptedAt: new Date() },
		});
	});

	return NextResponse.json({ ok: true, workspaceId: invite.workspaceId });
}

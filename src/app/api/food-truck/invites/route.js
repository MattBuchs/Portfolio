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
import { getInviteRecipientEmail, resend } from "@/lib/resend";

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

	const workspace = await prisma.foodTruckWorkspace.findUnique({
		where: { id: workspaceId },
	});

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

	// Send invitation email via Resend
	try {
		const inviteLink = `foodtruck://join-workspace?token=${token}`;
		const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://app.food-truck-hub.com"}/join?token=${token}`;

		await resend.emails.send({
			from: "Food Truck Control Room",
			to: getInviteRecipientEmail(email),
			subject: `Invitation Food Truck Control Room - Rejoignez ${workspace?.name || "Food Truck Hub"}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h2 style="color: #2D3436;">Vous êtes invité(e) !</h2>
					<p>Bonjour,</p>
					<p><strong>${auth.user.name}</strong> vous invite à rejoindre <strong>${workspace?.name}</strong> en tant que <strong>${role}</strong> sur Food Truck Control Room.</p>
					
					<p style="margin: 30px 0;">
						<a href="${inviteUrl}" style="background-color: #E17055; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">
							Accepter l'invitation
						</a>
					</p>
					
					<p style="color: #636E72; font-size: 12px;">
						Code d'invitation: <code style="background-color: #F5F5F5; padding: 2px 6px; border-radius: 2px;">${token}</code>
					</p>
					<p style="color: #636E72; font-size: 12px;">
						Cette invitation expire dans 7 jours.
					</p>
				</div>
			`,
		});
	} catch (emailError) {
		console.error(
			"Erreur lors de l'envoi de l'email d'invitation:",
			emailError,
		);
		// Ne pas fail la requête si l'email échoue, le token est quand même créé
	}

	return NextResponse.json({
		token,
		email,
		role,
		expiresAt: expiresAt.toISOString(),
	});
}

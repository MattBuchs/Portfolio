import { NextResponse } from "next/server";

import {
	getAuthContext,
	getWorkspaceMembership,
	roleCanManageMembers,
} from "@/lib/foodTruckAuth";
import { prisma } from "@/lib/prisma";

function getWorkspaceId(request) {
	return request.headers.get("x-workspace-id")?.trim() || "";
}

export async function GET(request) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	const workspaceId = getWorkspaceId(request);
	const membership = getWorkspaceMembership(auth, workspaceId);
	if (!membership) {
		return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
	}

	const members = await prisma.foodTruckMembership.findMany({
		where: { workspaceId },
		include: {
			user: {
				select: {
					id: true,
					email: true,
					name: true,
				},
			},
		},
		orderBy: { createdAt: "asc" },
	});

	return NextResponse.json({
		members: members.map((item) => ({
			id: item.id,
			role: item.role,
			user: item.user,
		})),
		canManageMembers: roleCanManageMembers(membership.role),
	});
}

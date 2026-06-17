import { NextResponse } from "next/server";

import { getAuthContext } from "@/lib/foodTruckAuth";

export async function GET(request) {
	const auth = await getAuthContext(request);
	if (!auth) {
		return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
	}

	return NextResponse.json({
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
		activeWorkspaceId: auth.user.memberships[0]?.workspace.id || null,
	});
}

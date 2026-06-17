import { NextResponse } from "next/server";

import { revokeSession } from "@/lib/foodTruckAuth";

export async function POST(request) {
	const authHeader = request.headers.get("authorization") || "";
	if (!authHeader.toLowerCase().startsWith("bearer ")) {
		return NextResponse.json({ ok: true });
	}

	const token = authHeader.slice(7).trim();
	if (!token) {
		return NextResponse.json({ ok: true });
	}

	await revokeSession(token);
	return NextResponse.json({ ok: true });
}

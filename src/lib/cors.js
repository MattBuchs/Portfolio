// Helper function to get secure CORS headers
// Only allow the mobile app and specific origins

const ALLOWED_ORIGINS = [
	// Production
	"https://www.matt-buchs.me",
	"https://matt-buchs.me",
	// Development
	...(process.env.NODE_ENV === "development"
		? [
				"http://localhost:3000",
				"http://localhost:8081",
				"http://127.0.0.1:3000",
				"http://127.0.0.1:8081",
			]
		: []),
];

export function getCorsHeaders(origin) {
	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		// Return no CORS headers if origin is not allowed
		return {};
	}

	return {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Methods":
			"GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers":
			"Content-Type, Authorization, x-workspace-id",
		"Access-Control-Max-Age": "86400",
		"Access-Control-Allow-Credentials": "true",
	};
}

export function handleOptions(request, origin) {
	const cors = getCorsHeaders(origin);
	if (!cors["Access-Control-Allow-Origin"]) {
		// Reject preflight if origin not allowed
		return new Response("Forbidden", { status: 403 });
	}

	return new Response(null, {
		status: 200,
		headers: cors,
	});
}

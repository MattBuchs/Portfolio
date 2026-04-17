import crypto from "crypto";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./crypto";

// RATE LIMITING
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5; // Tentatives max
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes en ms
const ATTEMPT_WINDOW = 5 * 60 * 1000; // Fenêtre de 5 minutes

function getRateLimitKey(email, ip) {
	return `${email?.toLowerCase() || "unknown"}:${ip || "unknown"}`;
}

function isRateLimited(key) {
	const attempt = loginAttempts.get(key);
	if (!attempt) return false;

	const now = Date.now();

	// Reset si la fenêtre est passée
	if (now - attempt.lastAttempt > ATTEMPT_WINDOW) {
		loginAttempts.delete(key);
		return false;
	}

	// Vérifier le lockout
	if (attempt.count >= MAX_ATTEMPTS) {
		const lockoutEnd = attempt.lastAttempt + LOCKOUT_DURATION;
		if (now < lockoutEnd) {
			return true;
		}
		// Lockout terminé, reset
		loginAttempts.delete(key);
		return false;
	}

	return false;
}

function recordFailedAttempt(key) {
	const attempt = loginAttempts.get(key) || { count: 0, lastAttempt: 0 };
	attempt.count++;
	attempt.lastAttempt = Date.now();
	loginAttempts.set(key, attempt);
}

function clearAttempts(key) {
	loginAttempts.delete(key);
}

function constantTimeCompare(a, b) {
	const bufA = Buffer.from(a || "");
	const bufB = Buffer.from(b || "");

	const maxLength = Math.max(bufA.length, bufB.length);

	const paddedA = Buffer.alloc(maxLength);
	const paddedB = Buffer.alloc(maxLength);

	bufA.copy(paddedA);
	bufB.copy(paddedB);

	return crypto.timingSafeEqual(paddedA, paddedB);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials, request) => {
				const adminEmail = process.env.ADMIN_EMAIL;
				const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
				const ip =
					request?.headers?.get("x-forwarded-for")?.split(",")[0] ??
					"unknown";
				const rateLimitKey = getRateLimitKey(credentials?.email, ip);

				// Vérifier rate limit AVANT toute vérification
				if (isRateLimited(rateLimitKey)) {
					return null; // Refuser la connexion
				}

				// Comparaison de l'email et vérification du mot de passe
				const emailMatch = credentials?.email === adminEmail;
				const passwordMatch = await verifyPassword(
					credentials?.password || "",
					adminPasswordHash || "",
				);

				if (emailMatch && passwordMatch) {
					clearAttempts(rateLimitKey);
					return {
						id: "1",
						email: adminEmail,
						name: "Admin",
						role: "admin",
					};
				}

				// Échec - enregistrer la tentative
				recordFailedAttempt(rateLimitKey);
				return null;
			},
		}),
	],
	pages: {
		signIn: "/admin/login",
	},
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60,
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnAdmin = nextUrl.pathname.startsWith("/admin");
			const isOnLogin = nextUrl.pathname === "/admin/login";

			if (isOnAdmin && !isOnLogin) {
				if (!isLoggedIn || auth.user.role !== "admin") return false;
			}

			return true;
		},
		jwt({ token, user }) {
			if (user) {
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				session.user.role = token.role;
			}
			return session;
		},
	},
	secret: process.env.AUTH_SECRET,
});

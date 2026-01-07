import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Vérification admin (vous pouvez changer ces valeurs dans .env)
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (
                    credentials?.email === adminEmail &&
                    credentials?.password === adminPassword
                ) {
                    return {
                        id: "1",
                        email: adminEmail,
                        name: "Admin",
                        role: "admin",
                    };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnLogin = nextUrl.pathname === "/admin/login";

            if (isOnAdmin && !isOnLogin) {
                if (!isLoggedIn) return false;
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

import crypto from "crypto";

const password = process.argv[2];

if (!password) {
	console.log("Usage: node scripts/hash-password.js <mot_de_passe>");
	process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");
const hashedPassword = `${salt}:${hash}`;

console.log("\n🔐 Hash généré pour ton .env:\n");
console.log(`ADMIN_PASSWORD_HASH="${hashedPassword}"`);
console.log(
	"\n⚠️  Remplace ADMIN_PASSWORD par ADMIN_PASSWORD_HASH dans ton .env",
);
console.log("⚠️  Tu peux ensuite supprimer ADMIN_PASSWORD\n");

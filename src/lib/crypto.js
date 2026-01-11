import crypto from "crypto";

const ENCRYPTION_KEY = process.env.LICENSE_ENCRYPTION_KEY;
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Chiffre une clé de licence
 * @param {string} text - La clé à chiffrer
 * @returns {string} La clé chiffrée au format base64
 */
export function encryptLicenseKey(text) {
    if (!ENCRYPTION_KEY) {
        throw new Error("LICENSE_ENCRYPTION_KEY n'est pas définie");
    }

    const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    // Format: iv:authTag:encrypted
    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Déchiffre une clé de licence
 * @param {string} encryptedText - La clé chiffrée
 * @returns {string} La clé déchiffrée
 */
export function decryptLicenseKey(encryptedText) {
    if (!ENCRYPTION_KEY) {
        throw new Error("LICENSE_ENCRYPTION_KEY n'est pas définie");
    }

    const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();

    const [ivHex, authTagHex, encrypted] = encryptedText.split(":");

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

/**
 * Génère une clé de licence aléatoire
 * @returns {string} Clé au format XXXX-XXXX-XXXX-XXXX
 */
export function generateLicenseKey() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const segments = 4;
    const segmentLength = 4;
    let key = "";

    for (let i = 0; i < segments; i++) {
        for (let j = 0; j < segmentLength; j++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        if (i < segments - 1) key += "-";
    }

    return key;
}

export function generateLicenseSecret() {
    return crypto.randomBytes(32).toString("hex");
}

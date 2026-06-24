// Input validation utilities

export function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validatePassword(password) {
	// Minimum 12 characters, at least 1 uppercase, 1 lowercase, 1 number
	if (!password || password.length < 12) {
		return {
			valid: false,
			error: "Password must be at least 12 characters",
		};
	}
	if (!/[A-Z]/.test(password)) {
		return {
			valid: false,
			error: "Password must contain uppercase letter",
		};
	}
	if (!/[a-z]/.test(password)) {
		return {
			valid: false,
			error: "Password must contain lowercase letter",
		};
	}
	if (!/[0-9]/.test(password)) {
		return { valid: false, error: "Password must contain number" };
	}
	return { valid: true };
}

export function validatePrice(price) {
	const num = Number(price);
	if (!Number.isFinite(num)) {
		return { valid: false, error: "Price must be a number" };
	}
	if (num < 0) {
		return { valid: false, error: "Price cannot be negative" };
	}
	if (num > 999999.99) {
		return { valid: false, error: "Price too high" };
	}
	return { valid: true, value: num };
}

export function validateQuantity(quantity) {
	const num = Number(quantity);
	if (!Number.isFinite(num)) {
		return { valid: false, error: "Quantity must be a number" };
	}
	if (num < 0) {
		return { valid: false, error: "Quantity cannot be negative" };
	}
	if (num > 999999.99) {
		return { valid: false, error: "Quantity too high" };
	}
	return { valid: true, value: num };
}

export function validateWorkspaceId(id) {
	if (!id || typeof id !== "string" || id.trim().length === 0) {
		return false;
	}
	return /^[a-zA-Z0-9\-]{10,50}$/.test(id);
}

export function validateUserId(id) {
	if (!id || typeof id !== "string" || id.trim().length === 0) {
		return false;
	}
	return /^[a-zA-Z0-9\-]{10,50}$/.test(id);
}

export function validateName(name) {
	if (!name || typeof name !== "string") {
		return false;
	}
	const trimmed = name.trim();
	return trimmed.length > 0 && trimmed.length <= 255;
}

export function validateOrderId(id) {
	if (!id || typeof id !== "string") {
		return false;
	}
	// Format: CMD-YYMMDD_N-wshash
	return /^CMD-\d{6}_\d+/.test(id);
}

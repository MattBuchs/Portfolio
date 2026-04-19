import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

// ====================================
// STYLES COMMUNS - Design System
// ====================================
const colors = {
	dark900: "#0a0a0b",
	dark800: "#121214",
	dark700: "#1a1a1f",
	dark600: "#24242b",
	amber500: "#f59e0b",
	amber400: "#fbbf24",
	orange500: "#f97316",
	textPrimary: "#fafafa",
	textSecondary: "#a1a1aa",
	textMuted: "#71717a",
	border: "rgba(255, 255, 255, 0.08)",
};

const baseStyles = {
	body: {
		backgroundColor: colors.dark900,
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
		margin: 0,
		padding: 0,
	},
	container: {
		backgroundColor: colors.dark800,
		margin: "40px auto",
		padding: "0",
		borderRadius: "16px",
		border: `1px solid ${colors.dark600}`,
		maxWidth: "600px",
	},
	header: {
		backgroundColor: colors.dark700,
		padding: "32px",
		borderRadius: "16px 16px 0 0",
		textAlign: "center",
		borderBottom: `1px solid ${colors.dark600}`,
	},
	logo: {
		width: "60px",
		height: "60px",
		borderRadius: "12px",
		marginBottom: "16px",
	},
	content: {
		padding: "32px",
	},
	heading: {
		color: colors.textPrimary,
		fontSize: "24px",
		fontWeight: "700",
		margin: "0 0 8px 0",
	},
	subheading: {
		color: colors.textSecondary,
		fontSize: "14px",
		margin: "0",
	},
	text: {
		color: colors.textSecondary,
		fontSize: "15px",
		lineHeight: "24px",
		margin: "0 0 16px 0",
	},
	highlight: {
		color: colors.amber400,
		fontWeight: "600",
	},
	box: {
		backgroundColor: colors.dark700,
		borderRadius: "12px",
		padding: "20px",
		margin: "24px 0",
		border: `1px solid ${colors.dark600}`,
	},
	licenseKey: {
		fontFamily: "monospace",
		fontSize: "20px",
		fontWeight: "700",
		color: colors.amber400,
		letterSpacing: "2px",
		textAlign: "center",
		padding: "16px",
		backgroundColor: colors.dark900,
		borderRadius: "8px",
		border: `1px dashed ${colors.amber500}`,
	},
	button: {
		backgroundColor: colors.amber500,
		color: colors.dark900,
		padding: "14px 28px",
		borderRadius: "8px",
		textDecoration: "none",
		fontWeight: "600",
		fontSize: "14px",
		display: "inline-block",
		textAlign: "center",
	},
	hr: {
		borderColor: colors.dark600,
		margin: "24px 0",
	},
	footer: {
		padding: "24px 32px",
		backgroundColor: colors.dark700,
		borderRadius: "0 0 16px 16px",
		borderTop: `1px solid ${colors.dark600}`,
	},
	footerText: {
		color: colors.textMuted,
		fontSize: "12px",
		lineHeight: "20px",
		margin: "0",
		textAlign: "center",
	},
	link: {
		color: colors.amber400,
		textDecoration: "none",
	},
	infoRow: {
		display: "flex",
		justifyContent: "space-between",
		padding: "8px 0",
		borderBottom: `1px solid ${colors.dark600}`,
	},
	infoLabel: {
		color: colors.textMuted,
		fontSize: "14px",
	},
	infoValue: {
		color: colors.textPrimary,
		fontSize: "14px",
		fontWeight: "500",
	},
};

// ====================================
// EMAIL DE CONFIRMATION DE LICENCE
// ====================================
export function LicensePurchaseEmail({
	customerName,
	email,
	licenseKey,
	plan,
	price,
	originalPrice,
	discount,
	promoCode,
	invoiceNumber,
	purchaseDate,
}) {
	const formattedDate = new Date(purchaseDate).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const planNames = {
		PRO: "Pro",
		BUSINESS: "Business",
	};

	return (
		<Html>
			<Head />
			<Preview>
				Votre licence GameMaster OS {planNames[plan] || plan} est prête
				!
			</Preview>
			<Body style={baseStyles.body}>
				<Container style={baseStyles.container}>
					{/* Header */}
					<Section style={baseStyles.header}>
						<Img
							src="https://matt-buchs.me/img/Logo-Skroma.jpg"
							alt="GameMaster OS"
							style={baseStyles.logo}
						/>
						<Heading style={baseStyles.heading}>
							Merci pour votre achat !
						</Heading>
						<Text style={baseStyles.subheading}>
							Votre licence GameMaster OS est maintenant active
						</Text>
					</Section>

					{/* Content */}
					<Section style={baseStyles.content}>
						<Text style={baseStyles.text}>
							Bonjour{" "}
							<span style={baseStyles.highlight}>
								{customerName}
							</span>
							,
						</Text>
						<Text style={baseStyles.text}>
							Merci d&apos;avoir choisi GameMaster OS ! Votre
							paiement a été confirmé et votre licence est
							maintenant active. Vous trouverez ci-dessous votre
							clé de licence ainsi que votre facture en pièce
							jointe.
						</Text>

						{/* License Key Box */}
						<Section style={baseStyles.box}>
							<Text
								style={{
									...baseStyles.text,
									textAlign: "center",
									marginBottom: "12px",
								}}
							>
								Votre clé de licence :
							</Text>
							<Text style={baseStyles.licenseKey}>
								{licenseKey}
							</Text>
							<Text
								style={{
									...baseStyles.footerText,
									marginTop: "12px",
								}}
							>
								Conservez cette clé précieusement, elle est
								nécessaire pour activer le logiciel.
							</Text>
						</Section>

						{/* Order Details */}
						<Section style={baseStyles.box}>
							<Text
								style={{
									...baseStyles.text,
									fontWeight: "600",
									color: colors.textPrimary,
									marginBottom: "16px",
								}}
							>
								Détails de la commande
							</Text>

							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
								}}
							>
								<tbody>
									<tr>
										<td style={baseStyles.infoLabel}>
											Numéro de facture
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
											}}
										>
											{invoiceNumber}
										</td>
									</tr>
									<tr>
										<td style={baseStyles.infoLabel}>
											Date
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
											}}
										>
											{formattedDate}
										</td>
									</tr>
									<tr>
										<td style={baseStyles.infoLabel}>
											Plan
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
											}}
										>
											GameMaster OS{" "}
											{planNames[plan] || plan}
										</td>
									</tr>
									<tr>
										<td style={baseStyles.infoLabel}>
											Email
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
											}}
										>
											{email}
										</td>
									</tr>
									{promoCode && (
										<tr>
											<td style={baseStyles.infoLabel}>
												Code promo
											</td>
											<td
												style={{
													...baseStyles.infoValue,
													textAlign: "right",
													color: colors.amber400,
												}}
											>
												{promoCode} (-
												{discount?.toFixed(2)}€)
											</td>
										</tr>
									)}
									<tr>
										<td
											style={{
												...baseStyles.infoLabel,
												paddingTop: "12px",
												fontWeight: "600",
												color: colors.textPrimary,
											}}
										>
											Total payé
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												paddingTop: "12px",
												fontSize: "18px",
												color: colors.amber400,
											}}
										>
											{price?.toFixed(2)}€
										</td>
									</tr>
								</tbody>
							</table>
						</Section>

						<Hr style={baseStyles.hr} />

						{/* CTA */}
						<Section style={{ textAlign: "center" }}>
							<Text style={baseStyles.text}>
								Prêt à commencer ? Téléchargez GameMaster OS et
								activez votre licence :
							</Text>
							<Link
								href="https://matt-buchs.me/gamemaster-os"
								style={baseStyles.button}
							>
								Télécharger GameMaster OS
							</Link>
						</Section>

						<Hr style={baseStyles.hr} />

						{/* Help */}
						<Text
							style={{
								...baseStyles.footerText,
								textAlign: "left",
							}}
						>
							Besoin d&apos;aide pour l&apos;installation ?
							Consultez notre{" "}
							<Link
								href="https://matt-buchs.me/gamemaster-os#installation"
								style={baseStyles.link}
							>
								guide d&apos;installation
							</Link>{" "}
							ou contactez-moi à l&apos;adresse suivante :{" "}
							<Link
								href="mailto:mattbuchs25@gmail.com"
								style={baseStyles.link}
							>
								mattbuchs25@gmail.com
							</Link>
						</Text>
					</Section>

					{/* Footer */}
					<Section style={baseStyles.footer}>
						<Text style={baseStyles.footerText}>
							© {new Date().getFullYear()} Matt Buchs - GameMaster
							OS
							<br />
							<Link
								href="https://matt-buchs.me"
								style={baseStyles.link}
							>
								matt-buchs.me
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

// ====================================
// EMAIL DE CONTACT
// ====================================
export function ContactFormEmail({ name, email, subject, message }) {
	return (
		<Html>
			<Head />
			<Preview>
				Nouveau message de {name} - {subject}
			</Preview>
			<Body style={baseStyles.body}>
				<Container style={baseStyles.container}>
					{/* Header */}
					<Section style={baseStyles.header}>
						<Img
							src="https://matt-buchs.me/img/Logo-Skroma.jpg"
							alt="Matt Buchs"
							style={baseStyles.logo}
						/>
						<Heading style={baseStyles.heading}>
							Nouveau message
						</Heading>
						<Text style={baseStyles.subheading}>
							Via le formulaire de contact
						</Text>
					</Section>

					{/* Content */}
					<Section style={baseStyles.content}>
						<Section style={baseStyles.box}>
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												...baseStyles.infoLabel,
												paddingBottom: "8px",
											}}
										>
											De
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												paddingBottom: "8px",
											}}
										>
											{name}
										</td>
									</tr>
									<tr>
										<td
											style={{
												...baseStyles.infoLabel,
												paddingBottom: "8px",
											}}
										>
											Email
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												paddingBottom: "8px",
											}}
										>
											<Link
												href={`mailto:${email}`}
												style={baseStyles.link}
											>
												{email}
											</Link>
										</td>
									</tr>
									<tr>
										<td style={baseStyles.infoLabel}>
											Sujet
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
											}}
										>
											{subject}
										</td>
									</tr>
								</tbody>
							</table>
						</Section>

						<Text
							style={{
								...baseStyles.text,
								fontWeight: "600",
								color: colors.textPrimary,
							}}
						>
							Message :
						</Text>
						<Section
							style={{
								...baseStyles.box,
								backgroundColor: colors.dark900,
							}}
						>
							<Text
								style={{
									...baseStyles.text,
									whiteSpace: "pre-wrap",
									margin: 0,
								}}
							>
								{message}
							</Text>
						</Section>

						<Section style={{ textAlign: "center" }}>
							<Link
								href={`mailto:${email}?subject=Re: ${subject}`}
								style={baseStyles.button}
							>
								Répondre à {name}
							</Link>
						</Section>
					</Section>

					{/* Footer */}
					<Section style={baseStyles.footer}>
						<Text style={baseStyles.footerText}>
							Message reçu le{" "}
							{new Date().toLocaleDateString("fr-FR", {
								day: "numeric",
								month: "long",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

// ====================================
// EMAIL DE TRANSFERT DE LICENCE
// ====================================
export function LicenseTransferEmail({
	customerName,
	email,
	licenseKey,
	plan,
	remainingUsages,
	machineId,
}) {
	const planNames = {
		PRO: "Pro",
		BUSINESS: "Business",
	};

	return (
		<Html>
			<Head />
			<Preview>
				Votre licence GameMaster OS a été transférée sur un nouvel
				appareil
			</Preview>
			<Body style={baseStyles.body}>
				<Container style={baseStyles.container}>
					{/* Header */}
					<Section style={baseStyles.header}>
						<Img
							src="https://matt-buchs.me/img/Logo-Skroma.jpg"
							alt="GameMaster OS"
							style={baseStyles.logo}
						/>
						<Heading style={baseStyles.heading}>
							Transfert de licence
						</Heading>
						<Text style={baseStyles.subheading}>
							Votre licence a été activée sur un nouvel appareil
						</Text>
					</Section>

					{/* Content */}
					<Section style={baseStyles.content}>
						<Text style={baseStyles.text}>
							Bonjour{" "}
							<span style={baseStyles.highlight}>
								{customerName || "cher client"}
							</span>
							,
						</Text>
						<Text style={baseStyles.text}>
							Votre licence GameMaster OS{" "}
							<strong>{planNames[plan] || plan}</strong> a été
							transférée avec succès sur un nouvel appareil.
						</Text>

						{/* Info Box */}
						<Section style={baseStyles.box}>
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												...baseStyles.infoLabel,
												paddingBottom: "8px",
											}}
										>
											Licence
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												paddingBottom: "8px",
												fontFamily: "monospace",
												color: colors.amber400,
											}}
										>
											{licenseKey}
										</td>
									</tr>
									<tr>
										<td
											style={{
												...baseStyles.infoLabel,
												paddingBottom: "8px",
											}}
										>
											Nouvel appareil
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												paddingBottom: "8px",
												fontFamily: "monospace",
												fontSize: "12px",
											}}
										>
											{machineId?.substring(0, 16)}...
										</td>
									</tr>
									<tr>
										<td style={baseStyles.infoLabel}>
											Transferts restants
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												color:
													remainingUsages <= 1
														? "#ef4444"
														: colors.amber400,
											}}
										>
											{remainingUsages}
										</td>
									</tr>
								</tbody>
							</table>
						</Section>

						{remainingUsages <= 1 && (
							<Section
								style={{
									...baseStyles.box,
									backgroundColor: "rgba(239, 68, 68, 0.1)",
									borderColor: "rgba(239, 68, 68, 0.3)",
								}}
							>
								<Text
									style={{
										...baseStyles.text,
										color: "#fca5a5",
										margin: 0,
									}}
								>
									⚠️ Attention : Il ne vous reste plus
									qu&apos;un seul transfert. Après cela, vous
									devrez me contacter pour réinitialiser votre
									licence.
								</Text>
							</Section>
						)}

						<Hr style={baseStyles.hr} />

						<Text style={baseStyles.footerText}>
							Si vous n&apos;avez pas effectué ce transfert,
							veuillez me contacter immédiatement à{" "}
							<Link
								href="mailto:mattbuchs25@gmail.com"
								style={baseStyles.link}
							>
								mattbuchs25@gmail.com
							</Link>
						</Text>
					</Section>

					{/* Footer */}
					<Section style={baseStyles.footer}>
						<Text style={baseStyles.footerText}>
							© {new Date().getFullYear()} Matt Buchs - GameMaster
							OS
							<br />
							<Link
								href="https://matt-buchs.me"
								style={baseStyles.link}
							>
								matt-buchs.me
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

// ====================================
// EMAIL DE LICENCE CRÉÉE PAR L'ADMIN
// ====================================
export function AdminCreatedLicenseEmail({
	customerName,
	email,
	licenseKey,
	plan,
	maxUsages,
}) {
	const planNames = {
		PRO: "Pro",
		BUSINESS: "Business",
	};

	return (
		<Html>
			<Head />
			<Preview>
				Votre licence GameMaster OS {planNames[plan] || plan} vous a été
				attribuée
			</Preview>
			<Body style={baseStyles.body}>
				<Container style={baseStyles.container}>
					{/* Header */}
					<Section style={baseStyles.header}>
						<Img
							src="https://matt-buchs.me/img/Logo-Skroma.jpg"
							alt="GameMaster OS"
							style={baseStyles.logo}
						/>
						<Heading style={baseStyles.heading}>
							Votre licence GameMaster OS
						</Heading>
						<Text style={baseStyles.subheading}>
							Une licence vous a été attribuée
						</Text>
					</Section>

					{/* Content */}
					<Section style={baseStyles.content}>
						<Text style={baseStyles.text}>
							Bonjour{" "}
							<span style={baseStyles.highlight}>
								{customerName}
							</span>
							,
						</Text>
						<Text style={baseStyles.text}>
							Une licence GameMaster OS{" "}
							<strong>{planNames[plan] || plan}</strong> vous a
							été attribuée. Vous trouverez ci-dessous votre clé
							de licence pour activer le logiciel.
						</Text>

						{/* License Key Box */}
						<Section style={baseStyles.box}>
							<Text
								style={{
									...baseStyles.text,
									textAlign: "center",
									marginBottom: "12px",
								}}
							>
								Votre clé de licence :
							</Text>
							<Text style={baseStyles.licenseKey}>
								{licenseKey}
							</Text>
							<Text
								style={{
									...baseStyles.footerText,
									marginTop: "12px",
								}}
							>
								Conservez cette clé précieusement.
							</Text>
						</Section>

						{/* Info Box */}
						<Section style={baseStyles.box}>
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												...baseStyles.infoLabel,
												paddingBottom: "8px",
											}}
										>
											Plan
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												paddingBottom: "8px",
											}}
										>
											GameMaster OS{" "}
											{planNames[plan] || plan}
										</td>
									</tr>
									<tr>
										<td
											style={{
												...baseStyles.infoLabel,
												paddingBottom: "8px",
											}}
										>
											Email associé
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												paddingBottom: "8px",
											}}
										>
											{email}
										</td>
									</tr>
									<tr>
										<td style={baseStyles.infoLabel}>
											Installations autorisées
										</td>
										<td
											style={{
												...baseStyles.infoValue,
												textAlign: "right",
												color: colors.amber400,
											}}
										>
											{maxUsages}
										</td>
									</tr>
								</tbody>
							</table>
						</Section>

						<Hr style={baseStyles.hr} />

						{/* CTA */}
						<Section style={{ textAlign: "center" }}>
							<Text style={baseStyles.text}>
								Prêt à commencer ? Téléchargez GameMaster OS :
							</Text>
							<Link
								href="https://matt-buchs.me/gamemaster-os"
								style={baseStyles.button}
							>
								Télécharger GameMaster OS
							</Link>
						</Section>

						<Hr style={baseStyles.hr} />

						<Text style={baseStyles.footerText}>
							Besoin d&apos;aide ? Contactez-moi à l&apos;adresse
							suivante :{" "}
							<Link
								href="mailto:mattbuchs25@gmail.com"
								style={baseStyles.link}
							>
								mattbuchs25@gmail.com
							</Link>
						</Text>
					</Section>

					{/* Footer */}
					<Section style={baseStyles.footer}>
						<Text style={baseStyles.footerText}>
							© {new Date().getFullYear()} Matt Buchs - GameMaster
							OS
							<br />
							<Link
								href="https://matt-buchs.me"
								style={baseStyles.link}
							>
								matt-buchs.me
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

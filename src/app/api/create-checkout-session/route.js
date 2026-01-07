import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { plan, email, name, company } = await request.json();

        const prices = {
            pro: {
                amount: 9900, // 99€ en centimes
                name: "EscapeTime PRO",
            },
            enterprise: {
                amount: 17900, // 179€ en centimes
                name: "EscapeTime Enterprise",
            },
        };

        const selectedPlan = prices[plan] || prices.pro;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: selectedPlan.name,
                            description: `Licence perpétuelle ${selectedPlan.name}`,
                        },
                        unit_amount: selectedPlan.amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/escapetime/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/escapetime/checkout?plan=${plan}`,
            customer_email: email,
            metadata: {
                plan,
                name,
                company: company || "",
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json(
            { error: "Erreur lors de la création de la session" },
            { status: 500 }
        );
    }
}

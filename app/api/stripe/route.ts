import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const handler = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const { amount } = body;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2022-11-15",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ paymentIntent });
  } catch (error) {
    console.log({ error });

    return NextResponse.json({ error });
  }
};

export { handler as GET, handler as POST };

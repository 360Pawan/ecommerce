"use client";

import { stripePromise } from "@/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

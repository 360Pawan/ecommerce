import React from "react";
import Stripe from "stripe";

interface PageProps {
  searchParams: { sessionId: string };
}

async function getStripeCheckout(sessionId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
  });

  const checkoutDetails = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent", "line_items.data.price.product"],
  });

  return checkoutDetails;
}

const SuccessPage = async ({ searchParams }: PageProps) => {
  if (!searchParams.sessionId) {
    return <h1>You need to shop first.</h1>;
  }

  const checkoutDetails = await getStripeCheckout(searchParams.sessionId);

  const customer = checkoutDetails?.customer_details;
  const products = checkoutDetails?.line_items?.data?.map((item: any) => ({
    ...item.price.product,
    price: item.price.unit_amount,
    quantity: item.quantity,
  }));

  const subtotal = checkoutDetails?.amount_subtotal ?? 0;
  const total = checkoutDetails?.amount_total ?? 0;
  const discount = checkoutDetails?.total_details?.amount_discount ?? 0;
  const tax = checkoutDetails?.total_details?.amount_tax ?? 0;

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-sm font-medium text-indigo-600">
            Payment successful
          </h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order, we’re currently processing it. So hang
            tight and we’ll send you confirmation very soon!
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Order number</dt>
            <dd className="text-indigo-600 mt-2">
              {(checkoutDetails.payment_intent as Stripe.PaymentIntent)?.id}
            </dd>
          </dl>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {products?.map((product: any) => (
            <div
              key={product.id}
              className="py-10 border-b border-gray-200 flex space-x-6"
            >
              <img
                src={product.images[0]}
                alt={product.description}
                className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
              />
              <div className="flex-auto flex flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={product.url}>{product.name}</a>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
                <div className="mt-6 flex-1 flex items-end">
                  <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                    </div>
                    <div className="pl-4 flex sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">
                        {(product.price / 100).toLocaleString("en-CA", {
                          style: "currency",
                          currency: "CAD",
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">Name: {customer?.name}</span>
                    <span className="block">Email: {customer?.email}</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">
                  {(subtotal / 100).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "inr",
                  })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex font-medium text-gray-900">Discount</dt>
                <dd className="text-gray-700">
                  -
                  {(discount / 100).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "inr",
                  })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Tax</dt>
                <dd className="text-gray-700">
                  {(tax / 100).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "inr",
                  })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">
                  {(total / 100).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "inr",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

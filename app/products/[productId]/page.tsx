import { Product } from "@/app/types";
import { AddToCartButton } from "@/components/product/addToCartButton";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Stripe from "stripe";

interface PageProps {
  params: { productId: string };
}

async function getStripeProduct(productId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
  });

  const product: Stripe.Product = await stripe.products.retrieve(productId);
  const priceList: Stripe.ApiList<Stripe.Price> = await stripe.prices.list({
    product: productId,
  });

  const price: Stripe.Price[] = priceList.data;
  const firstPrice = price[0];

  const data: Product = {
    id: firstPrice.id,
    active: firstPrice.active,
    billing_scheme: firstPrice.billing_scheme,
    currency: firstPrice.currency,
    unit_amount: firstPrice.unit_amount
      ? firstPrice.unit_amount / 100
      : firstPrice.unit_amount ?? 1,
    product: {
      id: product.id,
      description: product.description ?? "",
      images: product.images,
      name: product.name,
      metadata: product.metadata,
    },
  };

  return data;
}

const ProductPage = async ({ params }: PageProps) => {
  const product = await getStripeProduct(params.productId);

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt={product.product.name}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.product.images[0]}
            width={500}
            height={500}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand}
            </h2> */}
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.product.name}
            </h1>
            {/* <div className="flex mb-4">
              <span className="flex items-center">
                {Array.from({ length: Math.round(product.rating) }).map(
                  (_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  )
                )}
              </span>
            </div> */}
            <p className="leading-relaxed">{product.product.description}</p>
            <div className="flex mt-6 items-center pt-5 border-t-2 border-gray-200 mb-5 gap-5">
              <p className="title-font font-medium text-2xl text-gray-900 flex items-center">
                <IndianRupee />
                {product.unit_amount}
              </p>
              <div className="max-w-10">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

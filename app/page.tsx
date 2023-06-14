import store from "@/redux/store";
import { setStartupProducts } from "@/redux/filterSlice";
import { Preloader } from "@/components/product/preloader";
import { ProductsListing } from "@/components/product/productListing";
import Stripe from "stripe";
import { Product } from "./types";

async function getStripeProducts(): Promise<Product[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
  });
  const res = await stripe.prices.list({
    expand: ["data.product"],
  });

  const prices: Stripe.Price[] = res.data;
  const products: Product[] = prices.map((price) => ({
    id: price.id,
    active: price.active,
    billing_scheme: price.billing_scheme,
    currency: price.currency,
    unit_amount: price.unit_amount
      ? price.unit_amount / 100
      : price.unit_amount ?? 1,
    product: {
      id: (price.product as Stripe.Product).id,
      description: (price.product as Stripe.Product).description ?? "",
      images: (price.product as Stripe.Product).images,
      name: (price.product as Stripe.Product).name,
      metadata: (price.product as Stripe.Product).metadata,
    },
  }));

  return products;
}

const HomePage = async () => {
  // const { products, total } = await getProducts();
  const products = await getStripeProducts();
  store.dispatch(setStartupProducts(products));

  return (
    <main className="container mx-auto">
      <Preloader products={products} />
      {/* {total >= 1 ? <ProductsListing /> : <h1>No product to show.</h1>} */}
      <ProductsListing />
    </main>
  );
};

export default HomePage;

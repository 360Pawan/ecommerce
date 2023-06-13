import store from "@/redux/store";
import { setStartupProducts } from "@/redux/filterSlice";
import { Preloader } from "@/components/product/preloader";
import { ProductsListing } from "@/components/product/productListing";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

import Stripe from "stripe";
async function getStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2022-11-15",
  });
  const res = await stripe.prices.list({
    expand: ["data.product"],
  });
  const prices = res.data;
  return prices;
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

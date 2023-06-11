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

const HomePage = async () => {
  const { products, total } = await getProducts();
  store.dispatch(setStartupProducts(products));

  return (
    <main className="container mx-auto">
      <Preloader products={products} />
      {total >= 1 ? <ProductsListing /> : <h1>No product to show.</h1>}
    </main>
  );
};

export default HomePage;

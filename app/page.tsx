import { ProductCard } from "@/components/product/product";
import { Product } from "./types";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const HomePage = async () => {
  const { products, total } = await getProducts();

  return (
    <main className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
      {total >= 1 ? (
        products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <h1>No product to show.</h1>
      )}
    </main>
  );
};

export default HomePage;

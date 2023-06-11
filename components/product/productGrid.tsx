import { Product } from "@/app/types";
import React from "react";
import { ProductCard } from "./product";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

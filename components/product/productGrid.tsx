import { Product } from "@/app/types";
import store from "@/redux/store";
import React from "react";
import { ProductCard } from "./product";

export const ProductGrid = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
      {store.getState().filters.startupProducts.length >= 1 ? (
        store
          .getState()
          .filters.startupProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
      ) : (
        <h1>No product to show.</h1>
      )}
    </section>
  );
};

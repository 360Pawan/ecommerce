import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IndianRupee } from "lucide-react";

import { Product } from "@/app/types";
import { AddToCartButton } from "./addToCartButton";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href={`/products/${product.product.id}`}
      >
        <Image
          className="object-contain"
          src={product.product.images[0]}
          alt={product.product.name}
          sizes="100%"
          fill
        />

        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          {/* {`${Math.round(product.discountPercentage)}% OFF`} */}
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link href={`/products/${product.product.id}`}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {/* {product.title} */}
            {product.product.name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="text-3xl font-bold text-slate-900 flex items-center">
            {/* ${product.price} */}
            <IndianRupee />
            {product.unit_amount}
          </p>
          {/* <div className="flex items-center">
            {Array.from({ length: Math.round(product.rating) }).map(
              (_, index) => (
                <svg
                  key={index}
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              )
            )}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {product.rating}
            </span>
          </div> */}
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

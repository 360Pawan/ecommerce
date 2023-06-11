"use client"

import { useRef } from "react";
import store from "@/redux/store";
import { setStartupProducts } from "@/redux/filterSlice";
import { Product } from "@/app/types";

export const Preloader = ({ products }: { products: Product[] }) => {
  const loaded = useRef(false);

  if (!loaded.current) {
    store.dispatch(setStartupProducts(products));
    loaded.current = true;
  }

  return null;
};

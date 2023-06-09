"use client";

import React from "react";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { RootState } from "@/redux/store";
import { ProductGrid } from "./productGrid";
import { FilterMenu } from "./filter";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const ProductsListing = () => {
  const startupProducts = useAppSelector(
    (state) => state.filters.startupProducts
  );

  return (
    <>
      <FilterMenu />
      <ProductGrid products={startupProducts} />
    </>
  );
};

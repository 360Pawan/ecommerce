"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { filterProducts, setFilter } from "@/redux/filterSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const FilterMenu = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filters.filter);

  const onPriceAscending = () => {
    dispatch(setFilter("ascending"));
    dispatch(filterProducts("ascending"));
  };

  const onPriceDescending = () => {
    dispatch(setFilter("descending"));
    dispatch(filterProducts("descending"));
  };

  return (
    <div className="my-5 flex justify-between items-center">
      <h1 className="text-xl font-semibold">All Products</h1>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SlidersHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10">
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`${
              filter === "ascending" ? "bg-slate-200" : ""
            } cursor-pointer`}
            onClick={onPriceAscending}
          >
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`${
              filter === "descending" ? "bg-slate-200" : ""
            } cursor-pointer`}
            onClick={onPriceDescending}
          >
            Price: High to Low
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

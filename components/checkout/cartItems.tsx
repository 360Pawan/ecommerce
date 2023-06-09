"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFromCart } from "@/redux/cartSlice";
import { ClientOnly } from "../clientOnly";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const CartItem = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const onCartItemRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <ul className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      <ClientOnly className="h-80">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col rounded-lg bg-white sm:flex-row"
          >
            <Image
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={item.thumbnail}
              alt={item.title}
              width={200}
              height={200}
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{item.title}</span>
              <span className="float-right text-gray-400">{item.brand}</span>
              <p className="text-lg font-bold">${item.price}</p>
            </div>
            <button
              type="button"
              className="flex items-center px-2 py-1 pl-0 space-x-1"
              onClick={() => onCartItemRemove(item.id)}
            >
              <Trash2 />
              <span>Remove</span>
            </button>
          </li>
        ))}
      </ClientOnly>
    </ul>
  );
};

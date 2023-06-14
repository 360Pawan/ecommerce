"use client";

import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFromCart } from "@/redux/cartSlice";
import { ClientOnly } from "../clientOnly";
import Image from "next/image";
import { IndianRupee, Trash2 } from "lucide-react";
import Link from "next/link";
import { Quantity } from "./quantity";
import { useToast } from "../ui/use-toast";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const CartItem = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const onCartItemRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast({ title: "Product removed successfully." });
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((accumulator, current) => {
      const quantity = current.quantity || 1;
      return (accumulator += current.unit_amount * quantity);
    }, 0);
  }, [cartItems]);

  return (
    <ul className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      <ClientOnly className="h-80">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col rounded-lg bg-white sm:flex-row items-start"
          >
            <Link href={`/products/${item.product.id}`}>
              <Image
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={item.product.images[0]}
                alt={item.product.name}
                width={200}
                height={200}
              />
            </Link>
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{item.product.name}</span>
              {/* <span className="float-right text-gray-400">{item.brand}</span> */}
              <p className="text-lg font-bold flex items-center">
                <IndianRupee />
                {item.unit_amount}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="flex items-center px-2 py-1 pl-0 space-x-1"
                onClick={() => onCartItemRemove(item.product.id)}
              >
                <Trash2 />
                <span>Remove</span>
              </button>
              <Quantity id={item.product.id} quantity={item.quantity} />
            </div>
          </li>
        ))}
        <p className="font-semibold flex items-center">
          Total amount:
          <IndianRupee />
          {cartTotal}
        </p>
      </ClientOnly>
    </ul>
  );
};

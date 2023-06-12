"use client";

import React, { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { Trash2 } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { removeFromCart } from "@/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { ClientOnly } from "@/components/clientOnly";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((accumulator, current) => {
      const quantity = current.quantity || 1;
      return (accumulator += current.price * quantity);
    }, 0);
  }, [cartItems]);

  const onCartItemRemove = (event: React.SyntheticEvent, id: number) => {
    event.stopPropagation();

    dispatch(removeFromCart(id));
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="relative py-2">
            <ClientOnly>
              {cartItems.length >= 1 ? (
                <div className="-top-1 absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-black p-3 text-xs text-white">
                    {cartItems.length}
                  </p>
                </div>
              ) : null}
            </ClientOnly>
            <ShoppingBag />
          </div>
        </MenubarTrigger>
        <MenubarContent className="max-h-[30rem] overflow-y-auto">
          <MenubarItem>
            <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100">
              <h2 className="text-xl font-semibold">Your cart</h2>
              {cartItems.length >= 1 ? (
                <>
                  <ul className="flex flex-col divide-y divide-gray-700">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col py-6 sm:flex-row sm:justify-between"
                      >
                        <div className="flex w-full space-x-2 sm:space-x-4">
                          <Image
                            className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                            src={item.thumbnail}
                            width={200}
                            height={200}
                            alt="Polaroid camera"
                          />
                          <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                              <div className="space-y-1">
                                <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                  {item.title}
                                </h3>
                                <p className="text-sm dark:text-gray-400">
                                  {item.brand}
                                </p>
                                <p className="text-sm dark:text-gray-400">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold">
                                  ${item.price}
                                </p>
                              </div>
                            </div>
                            <div className="flex text-sm divide-x">
                              <button
                                type="button"
                                className="flex items-center px-2 py-1 pl-0 space-x-1"
                                onClick={(e) => onCartItemRemove(e, item.id)}
                              >
                                <Trash2 />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-1 text-right">
                    <p>
                      Total amount:
                      <span className="font-semibold">${cartTotal}</span>
                    </p>
                    <p className="text-sm dark:text-gray-400">
                      Not including taxes and shipping costs
                    </p>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <MenubarItem className="cursor-pointer" asChild>
                      <Link
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                        href="/checkout/address"
                      >
                        Continue to Checkout
                      </Link>
                    </MenubarItem>
                  </div>
                </>
              ) : (
                <h2>No product in cart</h2>
              )}
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

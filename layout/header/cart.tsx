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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Quantity } from "@/components/checkout/quantity";
import { useToast } from "@/components/ui/use-toast";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Cart = () => {
  const { toast } = useToast();
  const router = useRouter();
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
    toast({ title: "Product removed successfully." });
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
        <MenubarContent className="max-h-[30rem] overflow-y-auto p-5">
          {cartItems.length >= 1 ? (
            <>
              {cartItems.map((item) => (
                <MenubarItem
                  key={item.id}
                  className="flex flex-col py-6 sm:flex-row sm:justify-between"
                >
                  <div className="flex w-full space-x-2 sm:space-x-4">
                    <MenubarItem asChild>
                      <Link
                        className="h-20 sm:h-32 cursor-pointer"
                        href={`/products/${item.id}`}
                      >
                        <Image
                          className="flex-shrink-0 object-cover dark:border-transparent rounded outline-none dark:bg-gray-500"
                          src={item.thumbnail}
                          width={200}
                          height={200}
                          alt="Polaroid camera"
                        />
                      </Link>
                    </MenubarItem>
                    <div className="flex flex-col justify-between w-full pb-4">
                      <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                            {item.title}
                          </h3>
                          <p className="text-sm dark:text-gray-400">
                            {item.brand}
                          </p>
                          <Quantity id={item.id} quantity={item.quantity} />
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">${item.price}</p>
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
                </MenubarItem>
              ))}
              <div className="text-right my-5">
                <p>
                  Total amount:
                  <span className="font-semibold"> ${cartTotal}</span>
                </p>
                <p className="text-sm dark:text-gray-400">
                  Not including taxes and shipping costs
                </p>
              </div>
              <MenubarItem className="cursor-pointer" asChild>
                <Button
                  className="ml-auto"
                  onClick={() => router.push("/checkout/address")}
                >
                  Continue to Checkout
                </Button>
              </MenubarItem>
            </>
          ) : (
            <h2>No product in cart</h2>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

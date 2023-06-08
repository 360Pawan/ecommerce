"use client";

import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "../ui/button";
import { increment, decrement } from "@/redux/slice";

export const AddToCartButton = () => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };
  return (
    // <Button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full">
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     className="mr-2 h-6 w-6"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     stroke="currentColor"
    //     strokeWidth="2"
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    //     />
    //   </svg>
    //   Add to cart
    // </Button>
    <>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </>
  );
};

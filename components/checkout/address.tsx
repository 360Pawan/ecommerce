"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setAddress, setStep } from "@/redux/checkoutSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("This is not a valid email."),
  name: z.string().nonempty("Name is required"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  pinCode: z.string().min(6).nonempty("PinCode is required"),
});

export const Address = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const address = useAppSelector((state) => state.checkout.address);
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: address.email || "",
      name: address.name || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pinCode: address.pinCode || "",
    },
  });

  useEffect(() => {
    form.setValue("email", session?.user?.email || address.email || "");
    form.setValue(
      "name",
      session?.user?.firstName || session?.user?.name || address.name || ""
    );
  }, [session, form, address]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setStep("address"));
    dispatch(setAddress(values));
    // router.push("checkout/payment");

    checkout();
  }

  async function checkout() {
    const lineItems = cartItems.map((cartItem) => {
      console.log("CART ITEM: ", cartItem);
      return {
        price: cartItem.id,
        quantity: 1,
      };
    });
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    });
    const data = await res.json();
    router.push(data.session.url);
  }

  return (
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Address Details</p>
      <p className="text-gray-400">
        Complete your order by providing your address details.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mb-8 mt-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="your.email@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your address here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Your city name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Your state name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pinCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PinCode</FormLabel>
                <FormControl>
                  <Input placeholder="Your pinCode here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-md px-6 py-3 h-14" type="submit">
            Make Payment
          </Button>
        </form>
      </Form>
    </div>
  );
};

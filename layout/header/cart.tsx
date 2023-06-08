"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useSelector,  } from "react-redux";


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export const Cart = () => {
  const value = useSelector((state: { value: number }) => state.value);
  

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <ShoppingBag />
        </MenubarTrigger>
        <MenubarContent className="mr-16">
          <MenubarItem>
            <p>Counter Value: {value}</p>
          </MenubarItem>
         
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

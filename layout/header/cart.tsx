import React from "react";
import { ShoppingBag } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export const Cart = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <ShoppingBag />
        </MenubarTrigger>
        <MenubarContent className="mr-16">
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

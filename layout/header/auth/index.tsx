"use client";

import React from "react";
import { Login } from "./login";
import { signOut, useSession } from "next-auth/react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Authentication = () => {
  const { data: session } = useSession();

  return session === undefined ? (
    <Skeleton className="h-10 w-10 rounded-full" />
  ) : session !== null ? (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Avatar>
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent className="mr-7">
          <MenubarItem>
            <p>{session.user?.name || session.user?.firstName}</p>
          </MenubarItem>
          <MenubarItem>
            <p>{session.user?.email}</p>
          </MenubarItem>
          <MenubarItem>
            <Button onClick={() => signOut()}>Logout</Button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ) : (
    <Login />
  );
};

import { Authentication } from "./auth";
import { Cart } from "./cart";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className="container mx-auto p-5 flex items-center justify-between gap-4">
      <Logo />
      <Navigation />
      <div className="flex items-center">
        <Cart />
        <Authentication />
      </div>
    </header>
  );
}

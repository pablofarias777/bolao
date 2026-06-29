"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl">🇧🇷</span>
          <span className="tracking-tight">Bolão do Brasil</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

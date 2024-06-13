import * as React from "react";
import Link from "next/link";
import { NavItem } from "@/types/type";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";

interface MainNavProps {
  items?: NavItem[];
}

export const MainNav = ({ items }: MainNavProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <Button
        variant="ghost"
        className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
      >
        <span className="font-bold">FlowchartAI</span>
      </Button>
    </div>
  );
};

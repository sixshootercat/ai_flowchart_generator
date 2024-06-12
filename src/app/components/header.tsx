import Link from "next/link";
import { Key } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Icons } from "@/app/components/icons";
import { MainNav } from "@/app/components/main-nav";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { APIKeyInput } from "@/app/components/api-key-input";

export const Header = () => {
  return (
    <header className="top-0 z-40 w-full bg-white">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Popover>
              <PopoverTrigger>
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-700",
                  })}
                >
                  <Key className="h-5 w-5" />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <APIKeyInput />
              </PopoverContent>
            </Popover>
          </nav>
        </div>
      </div>
    </header>
  );
};

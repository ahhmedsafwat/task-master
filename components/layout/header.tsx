"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "../ui/menu-icon";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "../ui/logo";
interface Navlinks {
  title: string;
  href: string;
  children?: Navlinks[];
}

const navigationItems: Navlinks[] = [
  {
    title: "Features",
    href: "features",
  },
  { title: "Pricing", href: "pricing" },
  { title: "Story", href: "story" },
  { title: "Developers", href: "developers" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    document.addEventListener("scroll", handelScroll);

    return () => {
      document.removeEventListener("scroll", handelScroll);
    };
  }, []);

  return (
    <>
      <header className="fixed top-6 z-50 w-full">
        <nav className="container relative mx-auto !max-w-[1672px] px-6 lg:px-9">
          <div
            className={cn(
              `flex h-16 items-center justify-between rounded-2xl border border-transparent px-3 py-1.5 transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none lg:top-4`,
              {
                "border-border glass-morph shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]":
                  hasScrolled && !isMenuOpen,
              },
            )}
          >
            <Logo />
            <ul className="hidden items-center gap-6 lg:flex">
              {navigationItems.map((item) => {
                return (
                  <li key={item.title} className="relative">
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <div className="absolute left-0 top-full">
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href}>{child.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                asChild
                variant={"outline"}
                className={cn("py-5", {
                  "bg-secondary hover:bg-secondary": hasScrolled && !isMenuOpen,
                })}
              >
                <Link href="/login">login</Link>
              </Button>
              <Button asChild variant={"inverted"} className="py-5">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
            <div className="relative lg:hidden">
              <MenuIcon
                isMenuOpen={isMenuOpen}
                toggleMenu={setIsMenuOpen}
                className={cn(
                  "hover:border-accent-foreground hover:bg-background py-5",
                  {
                    "bg-secondary hover:bg-secondary":
                      hasScrolled && !isMenuOpen,
                  },
                )}
              />
            </div>
          </div>
        </nav>
      </header>
      <div
        className={cn(
          "glass-morph fixed left-full top-0 z-30 flex h-screen w-screen flex-col p-8 transition-all lg:hidden",
          { "left-0": isMenuOpen },
        )}
      >
        <div className="flex flex-1 flex-col justify-center gap-6">
          {navigationItems.map((item) => {
            return (
              <Link href={item.href} key={item.title} className="text-lg">
                {item.title}
                {item.children && (
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href}>{child.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            );
          })}
        </div>
        <div className="w-full">
          <Button asChild variant={"outline"} className="mb-3 w-full">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant={"inverted"} className="w-full py-5">
            <Link href="/signup" className="">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

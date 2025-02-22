"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "../ui/menu-icon";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
interface Navlinks {
  title: string;
  href: string;
  children?: Navlinks[];
}

const navigationItems: Navlinks[] = [
  { title: "Features", href: "features" },
  { title: "Pricing", href: "pricing" },
  { title: "About", href: "about" },
  { title: "Contact", href: "contact" },
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
      <header className="fixed top-6 z-50 w-full lg:top-4">
        <nav className="container relative mx-auto !max-w-[1672px] px-6 lg:px-9">
          <div
            className={cn(
              `bg-background flex h-16 items-center justify-between rounded-2xl border border-transparent px-3 py-1.5 transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none`,
              {
                "border-primary not-dark:bg-secondary shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]":
                  hasScrolled && !isMenuOpen,
              },
            )}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="TaskMaster Logo"
                width={32}
                height={32}
              />
              <div className="font-geist-mono font-bold">TaskMaster</div>
            </Link>
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
                className="hover:border-accent-foreground hover:bg-background py-5"
              >
                <Link href="/login">login</Link>
              </Button>
              <Button
                asChild
                className="bg-foreground text-background hover:bg-foreground/90 py-5"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
            <div className="relative lg:hidden">
              <MenuIcon isMenuOpen={isMenuOpen} toggleMenu={setIsMenuOpen} />
            </div>
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div className="bg-background fixed left-0 top-0 z-30 h-screen w-screen">
          {navigationItems.map((item) => {
            return (
              <div className="relative" key={item.href}>
                <Link href={item.href}>
                  {item.title}
                  {item.children && (
                    <ul className="absolute left-0 top-full z-30">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href}>{child.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </div>
            );
          })}
          <Link
            href="/login"
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-4 py-2 text-sm"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-primary-foreground bg-primary hover:bg-primary/90 block px-4 py-2 text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}

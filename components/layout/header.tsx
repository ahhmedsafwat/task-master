"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "../ui/menu-icon";
import { useEffect, useState } from "react";
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
      <header className="w-full fixed top-6 lg:top-4 z-50">
        <nav className="container !max-w-[1672px] px-6 relative lg:px-9 mx-auto">
          <div
            className={`bg-background rounded-2xl flex items-center justify-between h-16 px-3 py-1.5 border border-transparent transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none${
              hasScrolled && !isMenuOpen
                ? "border-primary not-dark:bg-secondary shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]"
                : ""
            }`}
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
            <ul className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item) => {
                return (
                  <li key={item.title} className="relative">
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-primary-foreground"
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <div className="absolute top-full left-0">
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
            <div className="hidden lg:flex items-center gap-2">
              <Button
                asChild
                variant={"outline"}
                className="py-5 hover:border-accent-foreground hover:bg-background"
              >
                <Link href="/login">login</Link>
              </Button>
              <Button
                asChild
                className="py-5 bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
            <div className="lg:hidden relative">
              <MenuIcon isMenuOpen={isMenuOpen} toggleMenu={setIsMenuOpen} />
            </div>
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div className="fixed z-30 bg-background w-screen h-screen left-0 top-0">
          {navigationItems.map((item) => {
            return (
              <div className="relative" key={item.href}>
                <Link href={item.href}>
                  {item.title}
                  {item.children && (
                    <ul className="absolute top-full left-0 z-30">
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
            className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}

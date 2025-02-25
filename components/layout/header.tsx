"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/menu-icon";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "../ui/logo";
import { FlipingText } from "@/components/ui/fliping-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Navlinks {
  title: string;
  href?: string;
  children?: Navlinks[];
}

const navigationItems: Navlinks[] = [
  {
    title: "Features",
    children: [
      { title: "Task Management", href: "/features/task-management" },
      { title: "Collaboration", href: "/features/collaboration" },
      { title: "Analytics", href: "/features/analytics" },
    ],
  },
  { title: "Pricing", href: "/pricing" },
  { title: "Story", href: "/story" },
  {
    title: "Developers",
    children: [
      { title: "Github", href: "https://github.com/ahhmedsafwat/task-master" },
      { title: "API Documentation", href: "/developers/api" },
    ],
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handelScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    document.addEventListener("scroll", handelScroll);
    return () => {
      document.removeEventListener("scroll", handelScroll);
    };
  }, []);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <>
      <header className="fixed top-6 z-50 w-full">
        <nav className="container relative mx-auto !max-w-[1672px] px-6 lg:px-9">
          <div
            className={cn(
              `flex h-16 items-center justify-between rounded-2xl border border-transparent px-3 py-1.5 transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none lg:top-4`,
              {
                "glass-morph shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]":
                  hasScrolled && !isMenuOpen,
              },
            )}
          >
            <Logo />
            <ul className="hidden items-center gap-6 lg:flex">
              {navigationItems.map(({ href, title, children }: Navlinks) => {
                if (href) {
                  return (
                    <li key={href} className="relative">
                      {href && (
                        <Link
                          href={href}
                          className="text-muted-foreground hover:text-primary-foreground font-geist-mono transition-colors"
                        >
                          <FlipingText initialText={title} />
                        </Link>
                      )}
                    </li>
                  );
                }
                return (
                  <li key={title} className="group relative">
                    <span className="text-muted-foreground hover:text-primary-foreground font-geist-mono transition-colors">
                      <FlipingText initialText={title} />
                    </span>
                    <ul className="bg-background absolute left-0 hidden w-48 translate-y-2 rounded-md border p-3 shadow-lg group-hover:block">
                      {children?.map(({ href, title }) => (
                        <li key={href}>
                          <Link
                            href={href ?? ""}
                            className="text-muted-foreground hover:text-primary-foreground font-geist-mono transition-colors"
                          >
                            <FlipingText initialText={title} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              <Link href="/login">
                <Button
                  asChild
                  variant={"outline"}
                  size="lg"
                  className="hover-scale"
                >
                  <FlipingText initialText="Login" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  asChild
                  variant={"inverted"}
                  size={"lg"}
                  className="hover-scale"
                >
                  <FlipingText initialText="Get Started" />
                </Button>
              </Link>
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
          "bg-primary fixed left-full top-0 z-30 flex h-screen w-screen flex-col px-3 py-2 pb-6 pt-32 transition-all duration-500 ease-in-out sm:px-8 lg:hidden",
          { "left-0": isMenuOpen },
        )}
      >
        <ul className="mb-auto flex flex-col justify-center">
          {navigationItems.map(({ href, title, children }: Navlinks) => {
            if (href) {
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative cursor-pointer border-b py-3"
                >
                  <li className="font-geist-mono text-primary-foreground text-2xl font-bold sm:text-3xl">
                    {title}
                  </li>
                </Link>
              );
            }
            return (
              <li key={title} className="relative cursor-pointer border-b">
                <Accordion collapsible type="single">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="font-geist-mono text-primary-foreground text-2xl font-bold sm:text-3xl">
                      {title}
                    </AccordionTrigger>

                    {children && (
                      <AccordionContent className="text-xl">
                        <ul className="ml-4 mt-6 space-y-8">
                          {children.map((child) => {
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href ?? ""}
                                  className="text-secondary-foreground hover:text-primary-foreground font-geist-mono transition-colors"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
              </li>
            );
          })}
        </ul>
        <div>
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

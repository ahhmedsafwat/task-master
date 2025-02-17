import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navigationItems = [
  { title: "Features", href: "features" },
  { title: "Pricing", href: "pricing" },
  { title: "About", href: "about" },
  { title: "Contact", href: "contact" },
];

export function Header() {
  return (
    <header className="w-full bg-background">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="TaskMaster Logo"
              width={32}
              height={32}
            />
            <div className="font-geist-mono font-bold">TaskMaster</div>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center space-x-2">
          <Button asChild variant={"outline"}>
            <Link href="/login">login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        {/* display the menu when the button is clicked */}
      </div>
    </header>
  );
}

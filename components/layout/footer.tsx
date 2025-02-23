import Link from "next/link";
import { Logo } from "../ui/logo";
import { RiTwitterXLine, RiGithubFill, RiInstagramLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const navigationItems = [
  { title: "Features", href: "features" },
  { title: "Pricing", href: "pricing" },
  { title: "About", href: "about" },
  { title: "Contact", href: "contact" },
];

const legalLinks = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="glass-morph rounded-t-4xl">
      <div className="container mx-auto !max-w-[1672px] px-6 py-12">
        <section className="place-item grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex h-full flex-col justify-between gap-4 max-md:items-center">
            <div className="space-y-4 max-md:text-center">
              <Logo className="max-md:justify-center" />
              <p className="text-muted-foreground font-geist-mono text-sm">
                Streamline your tasks and boost productivity with TaskMaster.
                The ultimate task management solution for teams and individuals.
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary-foreground text-sm transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary-foreground text-sm transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-3 max-md:flex-col-reverse max-md:items-center max-md:justify-center">
            <div className="flex gap-2">
              <Button variant={"outline"} size={"lg"} asChild>
                <Link
                  href="https://x.com/ahhmed_ssafwatt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  <RiTwitterXLine size={24} />
                </Link>
              </Button>
              <Button variant={"outline"} size={"lg"} asChild>
                <Link
                  href="https://github.com/ahhmedsafwat/task-master"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  <RiGithubFill size={24} />
                </Link>
              </Button>
              <Button variant={"outline"} size={"lg"} asChild>
                <Link
                  href="https://www.instagram.com/ahmeed_safwatt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  <RiInstagramLine size={24} />
                </Link>
              </Button>
            </div>
            <div className="w-full lg:mt-12">
              <h3 className="font-geist-mono mb-2 font-semibold">
                Stay up to date
              </h3>
              <form className="space-y-2">
                <Input type="email" placeholder="Enter your email" />
                <Button
                  type="submit"
                  className="text-background bg-foreground hover:bg-foreground/80 w-full"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
        <section className="text-muted-foreground font-geist-mono mt-4 border-t pt-8 text-center text-sm md:mt-28">
          © {new Date().getFullYear()} TaskMaster. All rights reserved. <br />
          created By{" "}
          <Link href="https://github.com/ahhmedsafwat" className="underline">
            Ahmed Safwat
          </Link>
        </section>
      </div>
    </footer>
  );
}

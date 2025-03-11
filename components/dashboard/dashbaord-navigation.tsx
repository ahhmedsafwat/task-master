"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  BarChartBigIcon as ChartColumnBigIcon,
  LucideClipboardCheck,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState, useRef } from "react";
import { Separator } from "../ui/separator";
import { Logo } from "../ui/logo";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MenuIcon } from "../ui/menu-icon";

// Define the navigation item structure
interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface Project {
  id: string;
  name: string;
}

export function DashboardNavigation() {
  const pathname = usePathname();

  // State management
  const [isPinned, setIsPinned] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // References
  const navRef = useRef<HTMLDivElement>(null);

  // Navigation items definition
  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Private Tasks",
      href: "/tasks",
      icon: LucideClipboardCheck,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: ChartColumnBigIcon,
    },
    {
      title: "Inbox",
      href: "/notifications",
      icon: Inbox,
    },
  ];

  const Projects: Project[] = [
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
    {
      id: "1",
      name: "Project 1",
    },
    {
      id: "2",
      name: "Project 2",
    },
    {
      id: "3",
      name: "Project 3",
    },
  ];

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-pin on desktop, auto-unpin on mobile
      if (mobile && isPinned) {
        setIsPinned(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle proximity hover effect (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPinned) {
        // Show navigation when mouse is within 30px of the left edge
        const isInHoverZone = e.clientX <= 30;
        setIsHovering(isInHoverZone);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isPinned, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsPinned(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  // Determine if the navbar should be visible
  const isNavVisible = isPinned || (!isMobile && (isHovering || isNavHovered));

  const toggleNavigation = () => setIsPinned(!isPinned);

  return (
    <>
      {/* Mobile menu toggle button - only visible when navbar is hidden on mobile */}
      {isMobile && !isPinned && (
        <MenuIcon
          isMenuOpen={isPinned}
          toggleMenu={() => setIsPinned(true)}
          className="absolute top-2 left-2 z-50"
        />
      )}

      {/* Main navigation container */}
      <div
        className={cn(
          "z-50 h-screen transition-all duration-300 ease-in-out",
          isPinned && !isMobile ? "w-60" : "w-0",
          isMobile && "fixed",
        )}
        onMouseEnter={() => !isMobile && !isPinned && setIsNavHovered(true)}
        onMouseLeave={() => !isMobile && !isPinned && setIsNavHovered(false)}
      >
        {/* Navigation panel */}
        <div
          ref={navRef}
          className={cn(
            "bg-primary relative z-50 flex h-screen w-60 flex-col px-2 py-4 transition-all duration-300 ease-in-out",
            // Floating state when not pinned but hovering
            !isPinned && !isMobile && (isHovering || isNavHovered)
              ? "left-0 m-2 h-[calc(100vh-1.75rem)] rounded-md shadow-2xl"
              : !isNavVisible && "-left-60",
            // Fixed position for mobile
            isMobile && isPinned && "fixed left-0",
          )}
        >
          {/* Header with logo and pin/unpin button */}
          <div className="bg-background flex items-center justify-between rounded-lg border px-3 py-2 shadow-lg">
            <Logo href={"/overview"} textClassName="sm:text-sm" svgSize={34} />

            {/* Toggle button */}
            <Button
              aria-label={
                isMobile
                  ? "Close menu"
                  : isPinned
                    ? "Unpin sidebar"
                    : "Pin sidebar"
              }
              asChild
              variant="ghost"
              size={"smIcon"}
              onClick={toggleNavigation}
              className="hover:bg-primary-foreground/10 box-content cursor-pointer rounded-md p-1 transition-colors"
            >
              {isPinned ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelRightClose size={20} />
              )}
            </Button>
          </div>
          {/* Navigation items */}
          <Separator decorative className="mt-6 mb-3" />
          <div className="space-y-2 overflow-y-auto">
            <div className="text-muted-foreground text-xs">Genaral</div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-secondary-foreground hover:bg-accent hover:text-primary-foreground  justify-between rounded-md px-2 py-1.5 transition-colors",
                    {
                      "bg-accent text-primary-foreground": isActive,
                    },
                  )}
                  onClick={() => isMobile && setIsPinned(false)}
                >
                  <div className="flex items-center">
                    <item.icon
                      size={16}
                      className={cn(
                        "mr-3",
                        isActive ? "opacity-100" : "opacity-80",
                      )}
                    />
                    <span className="text-sm">{item.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <Separator decorative className="mt-6 mb-3" />
          {/* Projects section could be added here */}
          <div className="space-y-2 overflow-y-auto flex-1">
            <div className="text-muted-foreground text-xs">Projects</div>
            {Projects.map((project, index) => {
              const isActive = project.id === pathname;
              return (
                <Link
                  key={project.id + index}
                  href={project.id}
                  className={cn(
                    "flex items-center hover:bg-accent hover:text-primary-foreground text-secondary-foreground justify-between rounded-md px-2 py-1 transition-colors",
                    {
                      "bg-accent text-primary-foreground": isActive,
                    },
                  )}
                  onClick={() => isMobile && setIsPinned(false)}
                >
                  <div className="flex items-center">
                    <span className="text-sm">{project.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <Separator decorative className="mt-6 mb-3" />
          {/* User profile section could be added here */}
          <div className="py-2 px-2 flex items-center justify-between border bg-background shadow-lg rounded-lg">
            <div className="flex justify-start items-center gap-2">
              <Avatar>
                <AvatarImage
                  alt="@ahmedsafwat"
                  src="https://github.com/ahhmedsafwat.png"
                />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-primary-foreground font-cabinet font-sm font-medium">
                  Ahmed Safwat
                </div>
                <div className="text-muted-foreground text-xs">
                  ahmedsafwat@gmail.com
                </div>
              </div>
            </div>
            <div>a</div>
          </div>
        </div>
      </div>

      {/* Background overlay - appears when nav is floating or mobile menu is open */}
      {(isMobile && isPinned) ||
      (!isMobile && !isPinned && (isHovering || isNavHovered)) ? (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => isMobile && setIsPinned(false)}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}

// const Nav;

"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  ChartColumnBigIcon,
  LucideClipboardCheck,
  PanelLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Logo } from "../ui/logo";

interface NavItems {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const DashBoardNavigation = () => {
  const pathname = usePathname();
  const [isPinned, setIsPinned] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Check for mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isPinned, isHovering, isNavHovered]);

  // Handle proximity hover effect (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPinned) {
        const isInHoverZone = e.clientX <= 30;
        setIsHovering(isInHoverZone);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isPinned, isMobile]);

  // Close mobile nav when clicking outside
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsPinned(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isPinned]);

  // Navigation items definition
  const navItems: NavItems[] = [
    {
      title: "Overview",
      href: "/dashboard",
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
      title: "Notifications",
      href: "/notifications",
      icon: Inbox,
    },
  ];

  // Show/hide navbar based on different conditions for mobile and desktop
  const showNavbar = isPinned && !isMobile && (!isHovering || !isNavHovered);

  return (
    <>
      {/* Mobile menu toggle button - only visible when navbar is hidden on mobile */}
      {isMobile && !isPinned && (
        <button
          aria-label="Open menu"
          onClick={() => setIsPinned(true)}
          className="bg-primary text-primary-foreground fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-md"
        >
          <Menu size={24} />
        </button>
      )}

      <nav
        className={cn(
          "z-50 h-screen transition-all duration-300 ease-in-out",
          showNavbar ? "w-60" : "w-0",
          isMobile && "fixed",
        )}
        onMouseEnter={() => !isMobile && !isPinned && setIsNavHovered(true)}
        onMouseLeave={() => !isMobile && !isPinned && setIsNavHovered(false)}
      >
        <div
          ref={navRef}
          className={cn(
            "bg-primary text-primary-foreground relative z-50 flex h-screen w-60 flex-col p-4 transition-all duration-300 ease-in-out",
            !isPinned && !isMobile && (isHovering || isNavHovered)
              ? "left-0 m-2 h-[calc(100vh-1.75rem)] rounded-md shadow-2xl"
              : !showNavbar && "-left-60",
            isMobile && isPinned && "fixed left-0",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo
              href={"/overview"}
              textClassName="text-sm md:text-base"
              svgSize={isMobile ? 35 : 40}
            />

            {/* Close/pin button */}
            <button
              aria-label={
                isMobile
                  ? "Close menu"
                  : isPinned
                    ? "Unpin sidebar"
                    : "Pin sidebar"
              }
              onClick={() => setIsPinned(!isPinned)}
              className="hover:bg-primary-foreground/10 box-content rounded-lg p-2 transition-colors"
            >
              {isMobile ? <X size={24} /> : <PanelLeft size={24} />}
            </button>
          </div>

          {/* Nav items with active state */}
          <div className="mt-8 flex-1 space-y-2 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-3 transition-colors",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  )}
                  onClick={() => isMobile && setIsPinned(false)}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "mr-3",
                      isActive ? "opacity-100" : "opacity-80",
                    )}
                  />
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Background overlay */}
      <div
        className={cn("invisible opacity-0 transition-all duration-300", {
          "visible fixed inset-0 z-40 bg-black/30 opacity-100":
            (isMobile && isPinned) ||
            (!isMobile && !isPinned && (isHovering || isNavHovered)),
        })}
        onClick={() => isMobile && setIsPinned(false)}
      />
    </>
  );
};

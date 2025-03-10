"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  BarChartBigIcon as ChartColumnBigIcon,
  LucideClipboardCheck,
  PanelLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState, useRef } from "react";
// import { Badge } from "@/components/ui/badge";

// Define the navigation item structure
interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  notifications?: number;
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
      notifications: 3,
    },
  ];

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
  }, [isMobile]);

  // Determine if the navbar should be visible
  const isNavVisible = isPinned || (!isMobile && (isHovering || isNavHovered));

  // Toggle the navigation state
  const toggleNavigation = () => setIsPinned(!isPinned);

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
            "bg-primary text-primary-foreground relative z-50 flex h-screen w-60 flex-col p-4 transition-all duration-300 ease-in-out",
            // Floating state when not pinned but hovering
            !isPinned && !isMobile && (isHovering || isNavHovered)
              ? "left-0 m-2 h-[calc(100vh-1.75rem)] rounded-md shadow-2xl"
              : !isNavVisible && "-left-60",
            // Fixed position for mobile
            isMobile && isPinned && "fixed left-0",
          )}
        >
          {/* Header with logo and pin/unpin button */}
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Dashboard</div>

            {/* Toggle button */}
            <button
              aria-label={
                isMobile
                  ? "Close menu"
                  : isPinned
                    ? "Unpin sidebar"
                    : "Pin sidebar"
              }
              onClick={toggleNavigation}
              className="hover:bg-primary-foreground/10 box-content rounded-lg p-2 transition-colors"
            >
              {isMobile ? <X size={24} /> : <PanelLeft size={24} />}
            </button>
          </div>

          {/* Navigation items */}
          <div className="mt-8 flex-1 space-y-2 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-3 transition-colors",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  )}
                  onClick={() => isMobile && setIsPinned(false)}
                >
                  <div className="flex items-center">
                    <item.icon
                      size={20}
                      className={cn(
                        "mr-3",
                        isActive ? "opacity-100" : "opacity-80",
                      )}
                    />
                    <span className="font-medium">{item.title}</span>
                  </div>

                  {/* Notification badge */}
                  {/* {item.notifications && (
                    <Badge
                      variant="destructive"
                      className="ml-2 h-5 w-5 justify-center rounded-full p-0"
                    >
                      {item.notifications}
                    </Badge>
                  )} */}
                </Link>
              );
            })}
          </div>

          {/* Projects section could be added here */}

          {/* User profile section could be added here */}
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

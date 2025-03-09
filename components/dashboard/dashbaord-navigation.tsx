"use client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  ChartColumnBigIcon,
  LucideClipboardCheck,
  PanelLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  // Check for mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle proximity hover effect
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

  console.log(
    `isMobile: ${isMobile}, isPinned: ${isPinned} isHovering: ${isHovering} isNavHovered: ${isNavHovered}`,
  );

  return (
    <>
      <nav
        className={cn(
          "h-screen transition-all ease-in-out",
          isPinned || isMobile ? "w-60" : "w-0",
        )}
        onMouseEnter={() => !isMobile && !isPinned && setIsNavHovered(true)}
        onMouseLeave={() =>
          !isMobile && !isPinned
            ? setIsNavHovered(false)
            : setIsNavHovered(false)
        }
      >
        <div
          className={cn(
            "bg-primary relative z-50 flex h-screen w-60 flex-col py-2 transition-all ease-in-out",
            !isPinned &&
              (isHovering || isNavHovered
                ? "fixed left-0 m-2 h-[calc(100vh-1.75rem)] rounded-md shadow-2xl"
                : "-left-60"),
          )}
        >
          <div className="flex items-center justify-end">
            {/* <Logo href="overview" /> */}
            <PanelLeft
              size={24}
              className="hover:bg-accent box-content rounded-lg p-1 transition-colors"
              onClick={() => setIsPinned(!isPinned)}
            />
          </div>
        </div>
      </nav>
      <div
        className={cn("invisible opacity-0 transition-all duration-300", {
          "visible absolute inset-0 z-40 bg-black/30 opacity-100":
            isHovering || isNavHovered,
        })}
      />
    </>
  );
};

"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CheckSquare, BarChart3, Inbox } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavItems {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface Project {
  id: string;
  name: string;
}

export const DashBoardNavigation = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems: NavItems[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Private Tasks",
      href: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Inbox",
      href: "/inbox",
      icon: Inbox,
    },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div
      className={cn(
        "sticky flex w-[230px] flex-col items-center",
        isCollapsed && "w-0",
      )}
    >
      <div></div>
      <div></div>
    </div>
  );
};

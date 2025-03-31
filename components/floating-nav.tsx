"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  defaultIndex?: number;
  className?: string;
}

export function FloatingNav({
  navItems,
  defaultIndex = 0,
  className,
}: FloatingNavProps) {
  const validIndex = Math.min(Math.max(defaultIndex, 0), navItems.length - 1);
  const [activeItem, setActiveItem] = useState<string>(
    navItems[validIndex]?.link || "#home"
  );

  const handleItemClick = (link: string) => {
    setActiveItem(link);
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-center justify-center p-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg",
        className
      )}
    >
      <div className="flex items-center justify-center space-x-1">
        {navItems.map((item) => (
          <motion.button
            key={item.name}
            onClick={() => handleItemClick(item.link)}
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full",
              activeItem === item.link
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeItem === item.link && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-primary/10 rounded-full"
                transition={{ type: "spring", duration: 0.3 }}
              />
            )}
            <span className="relative z-10">{item.icon}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

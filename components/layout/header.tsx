
"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-card border-b border-border px-6 flex items-center justify-between z-30">
      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-64 hidden md:block" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}

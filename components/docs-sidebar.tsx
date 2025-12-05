"use client";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-8">
      <div className="space-y-4">
        {docsConfig.sidebarNav.map((group) => (
          <div key={group.title}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {group.title}
            </h4>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                  pathname === item.href ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

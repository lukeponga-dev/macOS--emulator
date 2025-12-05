import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "GitHub",
      href: "https://github.com/your-repo",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
      ],
    },
    {
      title: "Core Components",
      items: [
        {
          title: "Introduction",
          href: "/docs/core-components/introduction",
          items: [],
        },
        {
          title: "MacEmulator",
          href: "/docs/core-components/mac-emulator",
          items: [],
        },
        {
          title: "EmulatorShell",
          href: "/docs/core-components/emulator-shell",
          items: [],
        },
      ],
    },
  ],
};
import { DocsSidebar } from "@/components/docs-sidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

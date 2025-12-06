
import { Card } from "@/components/ui/card";

interface DashboardGridProps {
  title?: string;
  columns?: number;
  children: React.ReactNode;
}

export function DashboardGrid({ title, columns = 3, children }: DashboardGridProps) {
  const gridCols = `grid-cols-${columns}`;

  return (
    <div>
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-8`}>
        {children}
      </div>
    </div>
  );
}

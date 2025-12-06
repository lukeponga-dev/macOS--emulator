
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 w-64 h-full bg-card border-r">
      <nav className="flex flex-col p-4 space-y-2">
        <Link href="/dashboard" className="px-4 py-2 rounded-md hover:bg-accent">Dashboard</Link>
        <Link href="/settings" className="px-4 py-2 rounded-md hover:bg-accent">Settings</Link>
        <Link href="/profile" className="px-4 py-2 rounded-md hover:bg-accent">Profile</Link>
      </nav>
    </aside>
  );
}

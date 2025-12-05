import { MacEmulator } from "@/components/mac-emulator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="MacEmu Logo" className="h-6 w-6" />
            <h1 className="text-lg font-semibold">MacEmu</h1>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Documentation
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Experience macOS on Any Device
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            A comprehensive Mac emulator that provides a realistic macOS experience, right in your web browser.
          </p>
        </div>

        <div className="mt-8">
          <MacEmulator />
        </div>
      </main>

      <footer className="border-t border-border py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; 2024 MacEmu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

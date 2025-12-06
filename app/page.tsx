import { MacEmulator } from "@/components/mac-emulator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center sm:text-left">
          </div>
        </div>

        <div className="mt-8">
          <MacEmulator />
        </div>
      </main>

      <footer className="border-t border-border py-4 mt-16">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; 2024 MacEmu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

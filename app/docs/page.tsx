
import { OverviewSection } from "@/components/overview-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DocsPage() {
  return (
    <div className="w-full">
          <div className="space-y-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Introduction</h1>
            <p className="text-lg text-muted-foreground">
            This Mac emulator is a web-based application designed to replicate the macOS desktop experience in your browser. It's built with modern web technologies to provide a high-fidelity simulation of the macOS environment, complete with a functional Dock, applications, and a familiar user interface. The goal is to create an accurate, performant, and usable emulator.
            </p>
          </div>

          <Separator className="my-8" />

          <section id="dock" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">The Dock</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Dock is a central feature of the macOS interface, providing quick access to applications. The emulator's Dock is interactive and allows you to launch the available applications. It also shows which applications are currently running.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Dock Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Launch applications with a single click.</li>
                  <li>See running applications indicated by a dot below the icon.</li>
                  <li>Click on a running application's icon to bring its window to the front.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          <section id="applications" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Applications</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The emulator comes with a set of pre-installed applications that mimic the functionality of their real macOS counterparts. Here's a look at some of them:
            </p>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notes App</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A simple note-taking application. You can create, edit, and delete notes. The app comes with some default notes to demonstrate its functionality. The notes are stored in the component's state and are not persisted between sessions.
                  </p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Calculator App</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A basic calculator for performing simple arithmetic operations.
                  </p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Terminal App</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A simulated terminal. While not a full-featured shell, it demonstrates the ability to create command-line style applications within the emulator.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          <section id="architecture" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
            <OverviewSection />
          </section>
    </div>
  );
}

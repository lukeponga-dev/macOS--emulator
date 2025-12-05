
# Mac Emulator Documentation

## 1. Project Overview

This document provides a comprehensive overview of the Mac Emulator application, a web-based emulator for macOS. The application is built using Next.js and TypeScript, and it leverages a component-based architecture to simulate the macOS environment.

The primary goals of this project are:
- **Accuracy**: To faithfully emulate Mac hardware behavior.
- **Compatibility**: To support a wide range of macOS versions and applications.
- **Performance**: To achieve near-native execution speeds.
- **Usability**: To provide an intuitive and user-friendly interface.

---

## 2. Core Components

The emulator is composed of several core components that work together to provide the complete user experience.

### `MacEmulator`
This is the main component that orchestrates the entire application. It manages the emulator's state and handles the transitions between the different views (machine manager, boot sequence, and the running desktop).

### `EmulatorShell`
This component acts as the outer shell of the emulator, providing the main UI structure, including the window frame and controls. It wraps the active view and provides a consistent interface for the user.

### `MachineManager`
The `MachineManager` is the initial view of the emulator. It allows users to:
- Create new virtual machines.
- Delete existing virtual machines.
- Start a selected virtual machine.

### `BootSequence`
When a virtual machine is started, the `BootSequence` component is rendered. It simulates the macOS boot-up process, displaying the Apple logo and a progress bar. Once the boot sequence is complete, it transitions to the `MacOSDesktop` view.

### `MacOSDesktop`
This is the main desktop environment of the running virtual machine. It includes the menu bar, dock, and the main desktop area where application windows are displayed. It also handles the shutdown process.

---

## 3. State Management

The emulator's state is managed by the `MacEmulator` component using the `useState` hook. The `EmulatorState` type defines the possible states:

- **`manager`**: The initial state where the user can manage their virtual machines.
- **`booting`**: The state when a virtual machine is starting up.
- **`running`**: The state when a virtual machine is fully booted and the desktop is active.

The `MacEmulator` component conditionally renders the appropriate component based on the current state.

---

## 4. Virtual Machine Configuration

The `VirtualMachine` interface defines the structure of a virtual machine's configuration. This information is used to configure and display the virtual machines in the `MachineManager`.

```typescript
export interface VirtualMachine {
  id: string;
  name: string;
  model: string;
  osVersion: string;
  cpu: string;
  ram: number;
  storage: number;
  status: "stopped" | "running" | "suspended";
}
```

---

## 5. Getting Started

To get the emulator up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser** and navigate to `http://localhost:3000`.

This will start the application in development mode, and you can begin interacting with the emulator.

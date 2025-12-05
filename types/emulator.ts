
export interface NVMeController {
  id: string;
  name: string;
  sizeGb: number;
}

export type EmulatorState = "manager" | "booting" | "running";

export type BootMedia = "os" | "installer";

export interface VirtualMachine {
  id: string;
  name: string;
  model: string;
  osVersion: string;
  cpu: string;
  ram: number;
  storage: number; // This will now represent overall storage, not just a single drive
  nvmeControllers: NVMeController[];
  screenWidth: number;
  screenHeight: number;
  status: "stopped" | "running" | "suspended";
  bootMedia: BootMedia; // New property to determine boot source
  jitEnabled: boolean; // Added for JIT compiler
  mmuEnabled: boolean; // Added for MMU with paging
  mmuMode?: "flat" | "paged"; // Optional: specifies MMU mode
}

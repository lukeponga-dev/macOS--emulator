"use client"

import React, { useState, useEffect } from "react"
import type { VirtualMachine } from "../../types/emulator"
import { GraphicsFramebuffer } from "../emulator/graphics-framebuffer"

interface MacOSInstallerProps {
  machine: VirtualMachine;
}

export const MacOSInstaller: React.FC<MacOSInstallerProps> = ({ machine }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Starting macOS Installer...");
  const [imageData, setImageData] = useState<Uint8ClampedArray | null>(null);

  useEffect(() => {
    // Simulate installer boot process and progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 100) {
        setProgress(currentProgress);
        if (currentProgress === 10) setMessage("Loading essential components...");
        if (currentProgress === 40) setMessage("Verifying installation media...");
        if (currentProgress === 70) setMessage("Preparing for installation...");
      } else {
        clearInterval(interval);
        setMessage("Ready for installation!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Placeholder for installer graphics
    if (machine.screenWidth && machine.screenHeight) {
      const size = machine.screenWidth * machine.screenHeight * 4;
      const newImageData = new Uint8ClampedArray(size);
      for (let i = 0; i < size; i += 4) {
        newImageData[i] = 50;   // Darker blue
        newImageData[i + 1] = 100; // Blue
        newImageData[i + 2] = 150; // Blue
        newImageData[i + 3] = 255; // Alpha
      }
      setImageData(newImageData);
    }
  }, [machine.screenWidth, machine.screenHeight]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black text-white relative">
      <div className="absolute inset-0">
        {machine.screenWidth && machine.screenHeight && (
          <GraphicsFramebuffer
            width={machine.screenWidth}
            height={machine.screenHeight}
            imageData={imageData}
          />
        )}
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">macOS Installer</h1>
        <p className="text-lg mb-8">{message}</p>
        <div className="w-64 bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2">{progress}%</p>
      </div>
    </div>
  );
};

"use client"

import React, { useState, useEffect } from "react"
import type { VirtualMachine } from "@/types/emulator"
import { GraphicsFramebuffer } from "../emulator/graphics-framebuffer"

interface MacOSInstallerProps {
  machine: VirtualMachine;
}

export const MacOSInstaller: React.FC<MacOSInstallerProps> = ({ machine }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Starting macOS Installer...");
  const [imageData, setImageData] = useState<Uint8ClampedArray | null>(null);

  useEffect(() => {
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
    if (machine.screenWidth && machine.screenHeight) {
      const size = machine.screenWidth * machine.screenHeight * 4;
      const newImageData = new Uint8ClampedArray(size);
      // A simple blue gradient background
      for (let y = 0; y < machine.screenHeight; y++) {
        for (let x = 0; x < machine.screenWidth; x++) {
          const i = (y * machine.screenWidth + x) * 4;
          const blue = Math.floor((y / machine.screenHeight) * 155) + 100;
          newImageData[i] = 50;
          newImageData[i + 1] = 100;
          newImageData[i + 2] = blue;
          newImageData[i + 3] = 255;
        }
      }
      setImageData(newImageData);
    }
  }, [machine.screenWidth, machine.screenHeight]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-black relative p-4">
      <div className="absolute inset-0 w-full h-full">
        {machine.screenWidth && machine.screenHeight && (
          <GraphicsFramebuffer
            width={machine.screenWidth}
            height={machine.screenHeight}
            imageData={imageData}
          />
        )}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center bg-black/50 p-6 sm:p-8 rounded-lg shadow-2xl max-w-sm w-full">
        <h1 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">macOS Installer</h1>
        <p className="text-xs sm:text-base mb-4 sm:mb-6 text-gray-300">{message}</p>
        <div className="w-full bg-gray-600 rounded-full h-2 sm:h-3 overflow-hidden">
          <div
            className="bg-blue-400 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">{progress}%</p>
      </div>
    </div>
  );
};

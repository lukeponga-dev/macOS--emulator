"use client";

import React, { useRef, useEffect } from 'react';

interface FramebufferProps {
  width: number;
  height: number;
  // In a real emulator, this would be a more complex data structure
  // representing the pixel data, e.g., Uint8ClampedArray for RGBA.
  // For now, we'll simulate with a simple prop.
  onFrameReady?: (context: CanvasRenderingContext2D) => void;
}

export const Framebuffer: React.FC<FramebufferProps> = ({ width, height, onFrameReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Example: Fill with a solid color initially
        context.fillStyle = '#000000'; // Black background
        context.fillRect(0, 0, width, height);

        // If a callback is provided, invoke it with the context
        if (onFrameReady) {
          onFrameReady(context);
        }
      }
    }
  }, [width, height, onFrameReady]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        backgroundColor: 'black' // Fallback background
      }}
      className="rounded-lg shadow-lg"
    />
  );
};

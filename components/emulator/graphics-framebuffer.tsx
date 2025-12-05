"use client"

import React, { useRef, useEffect } from 'react';

interface GraphicsFramebufferProps {
  width: number;
  height: number;
  imageData: Uint8ClampedArray | null; // Raw pixel data (R, G, B, A)
}

export const GraphicsFramebuffer: React.FC<GraphicsFramebufferProps> = ({ width, height, imageData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    if (imageData) {
      // Create an ImageData object from the raw pixel data
      const imgData = new ImageData(imageData, width, height);
      // Put the ImageData onto the canvas
      ctx.putImageData(imgData, 0, 0);
    }
  }, [width, height, imageData]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full object-contain" // Maintain aspect ratio and fill container
      style={{ imageRendering: 'pixelated' }} // For crisp pixel art if applicable
    />
  );
};

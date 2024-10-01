import React, { useEffect, useState, useRef } from "react";

// Reusable ImageWithMasks component incorporating canvas for drawing
const ImageWithMasks = ({
  imageSrc,
  initialMasks = [],
  selectedColor,
  resetMasks,
  imgWidth = 800, // Default values in case props are missing
  imgHeight = 600,
}) => {
  const [maskData, setMaskData] = useState(
    initialMasks.map((mask) => ({ ...mask, color: "transparent" }))
  );
  const canvasRef = useRef(null);

  // Effect to update masks if resetMasks prop changes
  useEffect(() => {
    if (resetMasks) {
      setMaskData(
        initialMasks.map((mask) => ({ ...mask, color: "transparent" }))
      );
    }
  }, [resetMasks, initialMasks]);

  useEffect(() => {
    drawImageAndMasks();
  }, [maskData, imageSrc, imgWidth, imgHeight]);

  console.log("maskData: ", maskData); // Log the mask data to check the structure

  // Function to draw image and masks on the canvas
  const drawImageAndMasks = () => {
    if (!canvasRef.current || !imageSrc) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas first
      ctx.drawImage(image, 0, 0, imgWidth, imgHeight); // Draw image scaled to canvas

      // Check if maskData exists and has valid points to draw
      maskData.forEach((mask) => {
        if (mask.points && Array.isArray(mask.points)) {
          // Check if points array exists
          ctx.fillStyle = mask.color || selectedColor || "rgba(255, 0, 0, 0.5)"; // Use selectedColor if provided
          mask.points.forEach(([x, y]) => {
            // Scale mask coordinates based on the image size
            const scaledX = x * (imgWidth / originalImageWidth);
            const scaledY = y * (imgHeight / originalImageHeight);
            ctx.fillRect(scaledX, scaledY, 3, 3); // Adjust point scaling
          });
        }
      });
    };
  };

  // Redraw image and masks when mask data or the image changes
  useEffect(() => {
    if (maskData && imageSrc) {
      drawImageAndMasks();
    }
  }, [maskData, imageSrc, imgWidth, imgHeight]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          width: imgWidth,
          height: imgHeight,
        }}
      />
    </div>
  );
};

export default ImageWithMasks;

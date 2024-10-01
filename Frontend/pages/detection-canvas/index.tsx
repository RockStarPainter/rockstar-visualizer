import { useEffect, useRef } from "react";

const ImageMaskOverlay = ({
  imgSrc,
  maskData,
}: {
  imgSrc: string;
  maskData: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("imgSrc: " + imgSrc);
    console.log("maskData: " + JSON.stringify(maskData, null, 2));
  }, [maskData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      const baseImage = new window.Image(); // Use the native Image constructor
      baseImage.src = imgSrc;

      baseImage.onload = () => {
        // Set the canvas size to match the image size
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;

        // Draw the base image
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

        // Get the width and height of the image (already matched to canvas)
        const imgWidth = baseImage.width;
        const imgHeight = baseImage.height;

        // Assuming your masks were generated at a different resolution
        const maskOriginalWidth = imgWidth; // Adjust this to match the resolution of your mask data
        const maskOriginalHeight = imgHeight; // Adjust this to match the resolution of your mask data

        // Calculate scaling factors (if mask is in different resolution, apply scaling)
        const scaleX = imgWidth / maskOriginalWidth;
        const scaleY = imgHeight / maskOriginalHeight;

        // Check if maskData contains valid boxes or masks
        if (maskData && Array.isArray(maskData.boxes)) {
          maskData.boxes.forEach((box: any, index: number) => {
            console.log(`Drawing box ${index + 1}:`, box);

            // Assuming that `box` contains [x1, y1, x2, y2] (two corners of the box)
            if (Array.isArray(box) && box.length === 4) {
              const [x1, y1, x2, y2] = box;

              // Scale the coordinates to fit the canvas
              const scaledX1 = x1 * scaleX;
              const scaledY1 = y1 * scaleY;
              const scaledX2 = x2 * scaleX;
              const scaledY2 = y2 * scaleY;

              // Calculate the width and height of the box
              const boxWidth = scaledX2 - scaledX1;
              const boxHeight = scaledY2 - scaledY1;

              // Set stroke color and draw the bounding box
              ctx.strokeStyle = "rgba(255, 0, 0, 1)"; // Red border
              ctx.lineWidth = 2;
              ctx.strokeRect(scaledX1, scaledY1, boxWidth, boxHeight); // Draw bounding box
            } else {
              console.error("Invalid box format:", box);
            }
          });
        } else {
          console.error(
            "maskData is not an array or contains invalid data:",
            maskData
          );
        }
      };

      // Handle errors when loading the image
      baseImage.onerror = (err) => {
        console.error("Error loading base image:", err);
      };
    }
  }, [imgSrc, maskData]);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid #ccc", maxWidth: "100%" }}
    />
  );
};

export default ImageMaskOverlay;
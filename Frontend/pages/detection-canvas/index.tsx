import React, { useState, useEffect, useRef } from "react";

const ImageMaskOverlay = ({
  imgSrc,
  maskData,
}: {
  imgSrc: any;
  maskData: any;
}) => {
  const canvasRef = useRef(null);

  // Function to map segment index to color
  const getSegmentColor = (segmentIndex:any) => {
    const colors = {
      0: "rgba(255, 0, 0, 0.5)", // Red for walls
      1: "rgba(0, 255, 0, 0.5)", // Green for ceiling
      // Add more segments as needed
    };

    return colors[segmentIndex] || "rgba(0, 0, 255, 0.5)"; // Default color if not specified
  };

  // Draw the image and masks on the canvas
  const drawImageAndMasks = () => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const image = new Image();

    // Load the uploaded image into the canvas
    image.src = imgSrc;

    image.onload = () => {
      // Set canvas size based on image dimensions
      const aspectRatio = image.width / image.height;
      canvas!.width = image.width /2; // Fixed width
      canvas!.height = 670 / aspectRatio; // Adjust height to maintain aspect ratio
      ctx.drawImage(image, 0, 0, canvas!.width, canvas!.height); // Draw the image on the canvas

      // Ensure mask data is available
      if (maskData?.masks?.length) {
        // Draw each mask segment
        maskData.masks.forEach((maskSegment:any, segmentIndex:any) => {
          const segmentColor = getSegmentColor(segmentIndex); // Get color based on the segment
          ctx.fillStyle = segmentColor;

          maskSegment.forEach(([x, y]) => {
            // Ensure the point is within canvas bounds
            if (x >= 0 && y >= 0 && x < canvas!.width && y < canvas!.height) {
              ctx.fillRect(x, y, 1, 1); // Draw small mask pixels for clarity
            }
          });
        });
      } else {
        console.error("No valid mask data available.");
      }
    };
  };

  // Redraw the image and masks whenever mask data or the image changes
  useEffect(() => {
    if (maskData && imgSrc) {
      drawImageAndMasks();
    }
  }, [maskData, imgSrc]);

  return (
    <div>
      {/* Canvas to display the image and masks */}
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", width: "800px", height: "500px" }}
      />
    </div>
  );
};

export default ImageMaskOverlay;
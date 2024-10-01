import { useEffect, useRef } from "react";

const ImageMaskOverlay = ({
  imgSrc,
  maskData,
}: {
  imgSrc: any;
  maskData: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // generate random colors for each mask
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Add some transparency
  };

  // Draw the image and masks on the canvas
  const drawImageAndMasks = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const image = new Image();

    // Load the uploaded image into the canvas
    image.src = imgSrc;

    image.onload = () => {
      // Set canvas size based on image dimensions
      canvas!.width = image.width;
      canvas!.height = image.height;
      ctx!.drawImage(image, 0, 0); // Draw the image on the canvas

      // Draw bounding boxes (if available)
      if (maskData?.boxes && maskData.boxes.length > 0) {
        ctx!.strokeStyle = "blue"; // Set color for bounding boxes
        ctx!.lineWidth = 2; // Set the line width

        maskData.boxes.forEach((box: any) => {
          const [x, y, width, height] = box;
          console.log(
            `Drawing bounding box: [${x}, ${y}, ${width}, ${height}]`
          ); // Log bounding box info
          ctx!.strokeRect(x, y, width, height); // Draw the bounding box
        });
      }

      // Draw segmentation masks (if available)
      if (maskData?.masks && maskData.masks.length > 0) {
        maskData.masks.forEach((mask: any) => {
          ctx!.fillStyle = getRandomColor(); // Use random colors for each mask
          mask.forEach(([x, y]: any) => {
            // Ensure the point is within canvas bounds
            if (x >= 0 && y >= 0 && x < canvas!.width && y < canvas!.height) {
              console.log(`Drawing mask point at [${x}, ${y}]`); // Log each mask point
              ctx!.fillRect(x, y, 2, 2); // Draw small mask pixels for clarity
            }
          });
        });
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
      <canvas ref={canvasRef} style={{ width: "800px", height: "500px" }} />
    </div>
  );
};

export default ImageMaskOverlay;

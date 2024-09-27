import React, { useEffect, useState } from "react";


// Reusable ImageWithMasks component
const ImageWithMasks = ({
  imageSrc,
  initialMasks,
  selectedColor,
  resetMasks,
  imgWidth,
  imgHeight,
}: any) => {
  // Initialize masks with colors, with a fallback to an empty array if initialMasks is undefined
  const [masks, setMasks] = useState(
    (initialMasks || []).map((mask:any) => ({ ...mask, color: "transparent" }))
  );
  const [currentColor, setCurrentColor] = useState(selectedColor); // Store the currently selected color

  // Update current color when selectedColor prop changes
  useEffect(() => {
    setCurrentColor(selectedColor);
  }, [selectedColor]);

  // Effect to reset masks when resetMasks is triggered
  useEffect(() => {
    if (resetMasks) {
      setMasks(
        (initialMasks || []).map((mask: any) => ({ ...mask, color: "transparent" }))
      ); // Reset to initial state
    }
  }, [resetMasks, initialMasks]);

  const handleClick = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // Get x position relative to the image
    const clickY = e.clientY - rect.top; // Get y position relative to the image

    const updatedMasks = masks.map((mask:any) => {
      const isInside =
        clickX >= mask.x &&
        clickX <= mask.x + mask.width &&
        clickY >= mask.y &&
        clickY <= mask.y + mask.height;

      if (isInside) {
        // If mask is already filled, change its color
        if (mask.color !== "transparent") {
          return { ...mask, color: currentColor }; // Toggle color to the selected color
        } else {
          return { ...mask, color: currentColor }; // Fill with current color
        }
      }
      return mask; // Return the mask unchanged
    });

    setMasks(updatedMasks); // Update the masks state
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: imgWidth,
        height: imgHeight,
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Masked"
          style={{ width: imgWidth, height: imgHeight }}
          onClick={handleClick} // Add click event listener
        />
      )}
      {masks.map((mask:any, index:any) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: mask.x / 800,
            top: mask.y / 600,
            width: mask.width,
            height: mask.height,
            backgroundColor: mask.color, // Use the individual color of the mask
            border: "2px solid red",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default ImageWithMasks;

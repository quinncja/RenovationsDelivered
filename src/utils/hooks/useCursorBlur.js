import { useEffect } from "react";

function useCursorBlur(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) {
      console.log("null");
      return;
    }

    const element = ref.current;

    // Store the original overflow style
    const originalOverflow = element.style.overflow;

    // Set overflow to hidden to prevent cursorBlur from overflowing
    element.style.overflow = "hidden";

    // Create the cursorBlur element
    const cursorBlur = document.createElement("div");

    // Apply styles to the cursorBlur element
    cursorBlur.style.position = "absolute";
    cursorBlur.style.pointerEvents = "none"; // Allows clicks to pass through
    cursorBlur.style.width = options.size || "50px";
    cursorBlur.style.height = options.size || "50px";
    cursorBlur.style.background = options.color || "rgba(255, 255, 255, 0.5)";
    cursorBlur.style.borderRadius = "50%";
    cursorBlur.style.filter = `blur(${options.blurAmount || "10px"})`;
    cursorBlur.style.display = "none"; // Hide by default
    cursorBlur.style.transform = "translate(-50%, -50%)"; // Center over cursor

    // Ensure the parent element is positioned
    const originalPosition = window.getComputedStyle(element).position;
    if (originalPosition === "static") {
      element.style.position = "relative";
    }

    // Append the cursorBlur to the element
    element.appendChild(cursorBlur);

    // Event handlers
    const handleMouseEnter = () => {
      cursorBlur.style.display = "block";
    };

    const handleMouseLeave = () => {
      cursorBlur.style.display = "none";
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      cursorBlur.style.left = `${e.clientX - rect.left}px`;
      cursorBlur.style.top = `${e.clientY - rect.top}px`;
    };

    // Attach event listeners
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);

    // Clean up on unmount
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeChild(cursorBlur);

      // Restore the original overflow style
      element.style.overflow = originalOverflow;

      // Reset the original position style if modified
      if (originalPosition === "static") {
        element.style.position = "";
      }
    };
  }, [ref, options]);
}

export default useCursorBlur;

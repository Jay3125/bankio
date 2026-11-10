import { useEffect } from "react";

// Closes an open popover after an outside click or when Escape is pressed.
export default function useDismissableLayer(ref, isOpen, onDismiss) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        onDismiss();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onDismiss, ref]);
}

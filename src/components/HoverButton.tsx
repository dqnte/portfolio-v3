import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const HoverButton = ({
  disabled,
  direction,
  text,
  component,
  onClick,
  className,
}: {
  disabled?: boolean;
  direction: string;
  text: string;
  component: any;
  onClick: () => void;
  className: string;
}) => {
  const [hover, setHover] = useState(false);

  const initial = {
    opacity: 0,
    x: direction === "left" ? 8 : direction === "right" ? -8 : 0,
    y: direction === "up" ? 8 : direction === "down" ? -8 : 0,
  };

  const exit = {
    opacity: 0,
    x: direction === "left" ? -8 : direction === "right" ? 8 : 0,
    y: direction === "up" ? -8 : direction === "down" ? 8 : 0,
  };

  useEffect(() => {
    if (disabled) {
      setHover(false);
    }
  }, [disabled]);

  return (
    <button
      className={`HoverButton ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      disabled={disabled}
    >
      <AnimatePresence mode={"wait"}>
        <motion.div
          key={hover ? "component" : "text"}
          initial={initial}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={exit}
          transition={{ duration: 0.15 }}
        >
          {hover ? component : text}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default HoverButton;

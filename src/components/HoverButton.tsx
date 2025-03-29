import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const HoverButton = ({
  disabled,
  direction,
  text,
  component,
  onClick,
  className,
  hovered,
}: {
  disabled?: boolean;
  direction?: string;
  text: string;
  component: any;
  onClick?: () => void;
  className?: string;
  hovered?: boolean;
}) => {
  const [hover, setHover] = useState(false);

  let initial: any = {
    opacity: 0,
  }

  let exit: any = {
    opacity: 0,
  }

  if (direction === "left") {
    initial.x = 8;
    exit.x = -8;
  } else if (direction === "right") {
    initial.x = -8;
    exit.x = 8;
  } else if (direction === "up") {
    initial.y = 8;
    exit.y = -8;
  } else if (direction === "down") {
    initial.y = -8;
    exit.y = 8;
  }


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
      <AnimatePresence mode={"wait"} initial={false}>
        <motion.div
          key={hover || hovered ? "component" : "text"}
          className={"HoverButton__content"}
          initial={initial}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={exit}
          transition={{ duration: 0.15 }}
        >
          {hover || hovered ? component : text}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default HoverButton;

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

export default function ScrollTop() {
  const [hover, setHover] = useState(false);

  return (
    <div className={"ScrollTop"}>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={"ScrollTop__button"}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <AnimatePresence mode={"wait"}>
          <motion.div
            key={hover ? "icon" : "text"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {hover ? <ArrowUpward /> : "top"}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}

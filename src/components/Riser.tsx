import { motion } from "framer-motion";

export default function Riser({
  children,
  className,
  style,
  key,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  key?: string;
}) {
  return (
    <motion.div
      className={"riser"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
      style={style}
      key={key}
    >
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: 0, transition: { duration: 0.2 } }}
        exit={{ y: 10 }}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

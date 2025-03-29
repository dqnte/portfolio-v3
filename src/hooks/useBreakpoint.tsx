import { useEffect, useState } from "react";

type BREAKPOINT = "mobile" | "tablet" | "desktop";

const breakpoints: Record<number, BREAKPOINT> = {
  700: "mobile",
  1000: "tablet",
};

export const useBreakpoint = (): BREAKPOINT => {
  const [breakpoint, setBreakPoint] = useState<BREAKPOINT>("desktop");
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    if (0 < windowSize.width && windowSize.width < 700) {
      setBreakPoint(breakpoints[700]);
    } else if (700 < windowSize.width && windowSize.width < 1000) {
      setBreakPoint(breakpoints[1000]);
    } else {
      setBreakPoint("desktop");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;

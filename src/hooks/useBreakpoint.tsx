import { useEffect, useState } from "react";

type BREAKPOINT = "mobile" | "desktop";

const breakpoints: Record<number, BREAKPOINT> = {
  700: "mobile",
  960: "desktop",
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
    } else {
      setBreakPoint(breakpoints[960]);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;

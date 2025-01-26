import { useState, useRef, useEffect } from "react";
import { IPhoto } from "../utilities";
import { useInView } from "framer-motion";

const useRefDimensions = (ref: any) => {
  const [dimensions, setDimensions] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    if (!ref.current) return;

    const { current } = ref;
    const resizeObserver = new ResizeObserver(() => {
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return dimensions;
};

const Image = ({
  photo,
  className,
  alt,
  onMouseEnter,
  onMouseLeave,
  onLoad,
  shouldLoad = true,
  fetchPriority,
  inViewRef,
  sizeOn,
}: {
  photo: IPhoto;
  className?: string;
  containerClassName?: string;
  alt?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  shouldLoad?: boolean;
  fetchPriority?: "auto" | "high" | "low";
  inViewRef?: React.RefObject<HTMLDivElement>;
  sizeOn: "w" | "h";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(!shouldLoad);

  const loaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const inView = useInView(inViewRef ?? containerRef, { once: true });
  const aspectRatio = photo.height / photo.width;

  const { width, height } = useRefDimensions(containerRef);

  const dimensions = {
    width: sizeOn === "h" && height ? height / aspectRatio : undefined,
    height: sizeOn === "w" && width ? width * aspectRatio : undefined,
  };

  return (
    <div className={"Image"} ref={containerRef}>
      {inView && (
        <img
          onLoad={loaded}
          src={photo.smallUrl}
          className={`Image__img ${className ?? ""} ${isLoaded ? "" : "hide"}`}
          alt={alt}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          fetchPriority={fetchPriority}
          style={dimensions}
        />
      )}
      {true && (
        <div
          className={`Image__loading ${className ?? ""}`}
          style={{
            background: photo?.color,
            ...dimensions,
          }}
        />
      )}
    </div>
  );
};

export default Image;

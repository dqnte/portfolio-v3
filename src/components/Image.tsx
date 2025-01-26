import { useState, useRef } from "react";
import { IPhoto } from "../utilities";
import { useInView } from "framer-motion";

const Image = ({
  photo,
  className,
  containerClassName,
  alt,
  onMouseEnter,
  onMouseLeave,
  onLoad,
  shouldLoad = true,
  useAspect = false,
  fetchPriority,
  inViewRef,
}: {
  photo: IPhoto;
  className?: string;
  containerClassName?: string;
  alt?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  shouldLoad?: boolean;
  useAspect?: boolean;
  fetchPriority?: "auto" | "high" | "low";
  inViewRef?: React.RefObject<HTMLDivElement>;
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

  return (
    <div className={`Image ${containerClassName ?? ""}`} ref={containerRef}>
      {inView && (
        <img
          onLoad={loaded}
          src={photo.smallUrl}
          className={`Image__img ${className ?? ""} ${isLoaded ? "" : "hide"}`}
          alt={alt}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          fetchPriority={fetchPriority}
        />
      )}
      {!isLoaded && (
        <div
          className={`Image__loading ${className ?? ""}`}
          style={{
            background: photo?.color,
            aspectRatio: useAspect && photo.width / photo.height,
          }}
        />
      )}
    </div>
  );
};

export default Image;

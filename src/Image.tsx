import { useState } from "react";
import { IPhoto } from "./utilities";

const Image = ({
  photo,
  className,
  containerClassName,
  alt,
  onMouseEnter,
  onMouseLeave,
  onLoad,
  shouldLoad = true,
}: {
  photo: IPhoto;
  className?: string;
  containerClassName?: string;
  alt?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  shouldLoad?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(!shouldLoad);

  const loaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div className={`Image ${containerClassName ?? ""}`}>
      <img
        onLoad={loaded}
        src={photo.smallUrl}
        className={`Image__img ${className ?? ""} ${isLoaded ? "" : "hide"}`}
        alt={alt}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {!isLoaded && (
        <div
          className={`Image__Loading ${className ?? ""}`}
          style={{
            background: photo?.color,
          }}
        />
      )}
    </div>
  );
};

export default Image;

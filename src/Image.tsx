import { useState } from "react";
import { IPhoto } from "./utilities";

interface ImageProps {
  photo: IPhoto;
  className?: string;
  alt?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

const Image = (props: ImageProps) => {
  const { photo, className, alt, onMouseEnter, onMouseLeave, onLoad } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  const loaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div className="Image">
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
          className="Image__Loading"
          style={{
            background: photo?.color ?? "white",
          }}
        />
      )}
    </div>
  );
};

export default Image;

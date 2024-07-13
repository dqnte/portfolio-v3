import { useState } from "react";
import "./Image.scss";

const Image = (props) => {
  const { photo, className, alt, onMouseEnter, onMouseLeave, onLoad } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const aspectRatio = photo.width / photo.height;

  const loaded = (e) => {
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
        className={`Image__img ${className} ${isLoaded ? "" : "hide"}`}
        alt={alt}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {!isLoaded && (
        <div
          className="Image__Loading"
          style={{ aspectRatio, background: photo?.color }}
        />
      )}
    </div>
  );
};

export default Image;

import { useState, Fragment } from "react";
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
    <Fragment>
      <img
        style={{ display: isLoaded ? "block" : "none" }}
        onLoad={loaded}
        className={className}
        alt={alt}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        src={photo.smallUrl}
      />
      {!isLoaded && (
        <div
          className="Image__Loading"
          style={{ aspectRatio, background: photo?.color }}
        />
      )}
    </Fragment>
  );
};

export default Image;

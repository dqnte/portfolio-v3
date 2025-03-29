import { useState } from "react";

const Grid = () => {
  const rows = 12;
  const [showGrid, setShowGrid] = useState(false);

  return (
    <>
      {showGrid && (
        <div className={"Grid"}>
          <div className={"Grid__container"}>
            {Array.from({ length: rows }).map((_, i) => {
              return <div key={i} className={"Grid__column"} />;
            })}
          </div>
        </div>
      )}
      <button className={"Grid__toggle"} onClick={() => setShowGrid(!showGrid)}>
        x
      </button>
    </>
  );
};

export default Grid;

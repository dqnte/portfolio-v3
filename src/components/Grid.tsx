import { useState } from "react";

const Grid = () => {
  const rows = 12;
  const [showGrid, setShowGrid] = useState(false);

  return (
    <>
      {showGrid && (
        <div className={"Grid"}>
          {Array.from({ length: rows }).map((_, i) => {
            return <div key={i} className={"Grid__column"} />;
          })}
        </div>
      )}
      <button className={"Grid__toggle"} onClick={() => setShowGrid(!showGrid)}>
        x
      </button>
    </>
  );
};

export default Grid;

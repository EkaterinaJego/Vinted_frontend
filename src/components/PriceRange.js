import React from "react";
import { Range, getTrackBackground } from "react-range";
import "./priceRange.css";

const MIN = 0;
const MAX = 100000;

const PriceRange = ({ rangeValues, handleRange }) => {
  return (
    <Range
      step={10}
      min={MIN}
      max={MAX}
      values={rangeValues}
      onChange={(values) => handleRange(values)}
      renderTrack={({ props, children }) => (
        <div
          className="renderTrackdiv"
          style={{
            ...props.style,
          }}
        >
          <div
            className="renderTrackbardiv"
            ref={props.ref}
            style={{
              background: getTrackBackground({
                values: rangeValues,
                colors: ["#ccc", " #2cb1ba", "#ccc"],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ index, props }) => (
        <div
          className="renderThumbdiv"
          {...props}
          style={{
            ...props.style,
          }}
        >
          <div className="renderThumbnumbers">{rangeValues[index]}€</div>
        </div>
      )}
    />
  );
};

export default PriceRange;

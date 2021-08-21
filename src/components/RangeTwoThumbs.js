import { Range, getTrackBackground } from "react-range";
import "./rangetwothumbs.css";

const RangeTwoThumbs = ({ handleRange, rangeValues }) => {
  const MIN = 0;
  const MAX = 100;

  return (
    <Range
      step={1}
      min={0}
      max={100}
      values={rangeValues}
      onChange={(values) => handleRange(values)}
      renderTrack={({ props, children }) => {
        <div
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: rangeValues,
                colors: ["#ccc", "#548BF4", "#ccc"],
                min: MIN,
                max: MAX,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>;
      }}
      renderThumb={({ props }) => (
        <>
          <div className="trackThumb" {...props}>
            <div className="price">{rangeValues[props.key] + "€"}</div>
          </div>
          <div className="seconddiv"></div>
          <div className="thirddiv"></div>
        </>
      )}
    />
  );
};

export default RangeTwoThumbs;

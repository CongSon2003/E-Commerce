import React from "react";

const EffectZoomAnimate = ({ isHover }) => {
  return (
    <>
      {
        <div
          className={`absolute inset-0 bg-[#0000001a] cursor-pointer ${
            isHover === 2
              ? "animate_zoomInTopLeft"
              : isHover === 3
              ? "animate_zoomOutLeft"
              : "invisible"
          }`}
        ></div>
      }
      {
        <div
          className={`absolute inset-0 bg-[#0000001a] cursor-pointer ${
            isHover === 2
              ? "animate_zoomInBottomRight"
              : isHover === 3
              ? "animate_zoomOutRight"
              : "invisible"
          }`}
        ></div>
      }
    </>
  );
};

export default EffectZoomAnimate;

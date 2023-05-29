/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div
      className={`gap-4 relative py-8 text-white ${showControls ? "" : "hover:cursor-default"}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="mb-2">{title}</h1>
      <div className="relative flex">
        <div
          className={`slider-action left ${!showControls ? "hidden" : ""} absolute top-0 bottom-0 left-0 w-14 flex justify-center items-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} className="text-2xl" />
        </div>
        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${!showControls ? "hidden" : ""} absolute top-0 bottom-0 right-0 w-14 flex justify-center items-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} className="text-2xl" />
        </div>
      </div>
    </div>
  );
});
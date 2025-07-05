import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";

const TrailerSlider = ({ activeIndex, setActiveIndex, title, trailers }) => {
  const sliderRef = useRef(null);

  const handleSlide = (direction) => {
    if (sliderRef.current) {
      const newIndex =
        direction === "left"
          ? Math.max(0, activeIndex - 1)
          : Math.min(trailers.length - 1, activeIndex + 1);

      setActiveIndex(newIndex);
      
      const slideWidth = sliderRef.current.clientWidth;
      const newScrollLeft = newIndex * slideWidth;

      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full bg-black">
      {/* Main container */}
      <div className="max-w-[90%] mx-auto relative group">
        {/* Navigation Arrows */}
        <button
          onClick={() => handleSlide("left")}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20
            ${activeIndex === 0 ? "hidden" : ""}
            bg-black/50 hover:bg-black/80 text-white p-3 rounded-full
            transition-all duration-200 backdrop-blur-sm
            opacity-0 group-hover:opacity-100`}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => handleSlide("right")}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20
            ${activeIndex === trailers.length - 1 ? "hidden" : ""}
            bg-black/50 hover:bg-black/80 text-white p-3 rounded-full
            transition-all duration-200 backdrop-blur-sm
            opacity-0 group-hover:opacity-100`}
        >
          <ChevronRight size={24} />
        </button>

        {/* Trailer Container */}
        <div
          ref={sliderRef}
          className="overflow-x-hidden scroll-smooth relative"
        >
          <div className="flex">
            {trailers.length > 0 && (
              <div className="flex-none w-full">
                <div className="relative mt-16 left-8 pt-[56.25%]">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailers[activeIndex]?.key}`}
                    width="95%"
                    height="75%"
                    controls={true}
                    className="absolute top-0 left-7"
                    config={{
                      youtube: {
                        playerVars: {
                          modestbranding: 1,
                          rel: 0,
                        },
                      },
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white text-xl font-bold">
                    {trailers.title}
                  </h3>
                </div>
              </div>
            )}
            {trailers?.length === 0 && (
              <h1 className="text-2xl mt-20 text-center w-full flex justify-center items-center ">
                No Trailers available
                {/* for{" "} <span className="text-red-600">{title}</span> */}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerSlider;

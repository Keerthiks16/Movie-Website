import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";

const SimilarContent = ({ similar }) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { contentType } = useContentStore();

  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        sliderRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Update arrow visibility after scroll
      setTimeout(() => {
        setShowLeftArrow(sliderRef.current.scrollLeft > 0);
        setShowRightArrow(
          sliderRef.current.scrollLeft <
            sliderRef.current.scrollWidth - sliderRef.current.clientWidth
        );
      }, 300);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-black p-4">
      <h2 className="text-white text-xl mb-4">
        Similar {formattedContentType}
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Movie Container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll gap-4 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {similar.map((movie, index) => (
            <Link to={`/watch/${movie.id}`} key={index}>
              <div className="flex-none">
                <div className="w-52 h-80 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img
                    src={ORIGINAL_IMG_BASE_URL + movie.poster_path}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-sm mt-2 text-center text-wrap">
                  {movie.title || movie.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SimilarContent;

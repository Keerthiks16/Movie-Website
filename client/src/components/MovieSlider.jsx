import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieSlider = ({ category }) => {
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`, {
        withCredentials: true,
      });
      setContent(res.data.content);
    };
    getContent();
  }, [contentType]);

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
        {formattedCategoryName} {formattedContentType}
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
          {content.map((content, index) => (
            <Link to={`/watch/${content.id}`} key={index}>
              <div className="flex-none">
                <div className="w-72 h-40 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img
                    src={ORIGINAL_IMG_BASE_URL + content.backdrop_path}
                    alt={content.title || content.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-sm mt-2 text-center">
                  {content.original_title || content.original_name}
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

export default MovieSlider;

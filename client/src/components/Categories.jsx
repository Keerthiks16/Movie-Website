import React from "react";
import { MOVIE_CATEGORIES, TV_CATEGORIES } from "../utils/constants";
import MovieSlider from "./MovieSlider";
import { useContentStore } from "../store/content";

const Categories = () => {
  const { contentType } = useContentStore();
  return (
    <div className="flex flex-col gap-10 bg-black py-10">
      {contentType === "movie"
        ? MOVIE_CATEGORIES.map((category) => (
            <MovieSlider key={category} category={category} />
          ))
        : TV_CATEGORIES.map((category) => (
            <MovieSlider key={category} category={category} />
          ))}
    </div>
  );
};

export default Categories;

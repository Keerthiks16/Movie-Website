import React from "react";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import useGetTrendingContent from "../hooks/useGetTrendingContent";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import HeroShimmer from "../tools/HeroShimmer";

const TrendingContent = () => {
  // Sample movie data - replace with your actual data
  const { trendingContent } = useGetTrendingContent();
  // console.log("Trending content: ", trendingContent);
  const imgurl = ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path;

  const roundToOneDecimal = (number) => {
    return Math.round(number * 10) / 10;
  };

  const movie = {
    title: trendingContent?.original_title || trendingContent?.name,
    year:
      trendingContent?.release_date?.split("-")[0] ||
      trendingContent?.first_air_date?.split("-")[0],
    description: trendingContent?.overview,
    posterUrl: imgurl,
    genre: "Sci-Fi, Action, Adventure",
    duration: "2h 28min",
    rating: roundToOneDecimal(trendingContent?.vote_average) + "⭐",
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? text.substr(0, maxLength) + "..."
      : text || "";
  };

  if (!trendingContent) return <HeroShimmer />;

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-end pb-20">
        <div className="container mx-auto px-6">
          {/* Movie Info */}
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl font-bold text-white mb-2">
              {movie.title}
            </h1>

            <div className="text-gray-300 text-lg">
              {movie.year} • {movie.rating}
              {/* • {movie.duration} • {movie.genre} */}
            </div>

            <p className="text-gray-300 text-lg">
              {truncateText(movie.description, 300)}
              {/* {movie.description} */}
            </p>

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <Link to={`/watch/${trendingContent?.id}`}>
                <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                  <Play className="w-5 h-5" />
                  <span>Play Now</span>
                </button>
              </Link>

              <Link to={`/watch/${trendingContent?.id}`}>
                <button className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700/80 text-white px-6 py-3 rounded-lg transition-colors">
                  <Info className="w-5 h-5" />
                  <span>More Info</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingContent;

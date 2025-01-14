import React from "react";

const Details = ({ title, date, rating, description, posterImage }) => {
  return (
    <div className="relative w-full min-h-screen bg-black/95">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

      <div className="relative container mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left content */}
          <div className="flex-1">
            <h1 className="text-6xl font-bold text-white mb-6">{title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-300 text-lg">{date}</span>
              {rating && (
                <>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <span className="px-3 py-1 border-2 border-gray-300 rounded-md text-gray-300">
                    {rating}
                  </span>
                </>
              )}
            </div>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>

          {/* Right content - Poster */}
          <div className="lg:w-1/3">
            {posterImage && (
              <div className="relative">
                <img
                  src={posterImage}
                  alt={`${title} Poster`}
                  className="w-full rounded-lg shadow-xl"
                />
                {/* Poster glow effect */}
                <div className="absolute inset-0 rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.15)]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

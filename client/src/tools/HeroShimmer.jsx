import React from "react";

const SimpleShimmer = () => {
  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {/* Animated shimmer line */}
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
          animation: "shimmer 2.5s infinite linear",
        }}
      />
    </div>
  );
};

// Add the shimmer animation to Tailwind config
const shimmerAnimation = {
  "@keyframes shimmer": {
    "0%": {
      transform: "translateX(-100%)",
    },
    "100%": {
      transform: "translateX(100%)",
    },
  },
};

export default SimpleShimmer;

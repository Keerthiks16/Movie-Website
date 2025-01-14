import React from "react";

const NothingToSee = () => {
  return (
    <div className="h-[60vh] w-full flex items-center justify-center bg-black">
      {/* Background glow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full"></div>

      {/* Text with glow effect */}
      <h1 className="text-5xl font-bold text-white relative">
        <span className="absolute inset-0 blur-sm text-red-500">
          Nothing to See Here
        </span>
        Nothing to See Here
      </h1>
    </div>
  );
};

export default NothingToSee;

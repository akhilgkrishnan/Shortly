import React from "react";

const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200 animate-pulse">
          <i className="ri-links-line text-2xl"></i>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-800">Loading Shortly...</p>
      <p className="text-xs text-gray-600 font-medium mt-1">Preparing your dashboard</p>
    </div>
  );
};

export default PageLoader;

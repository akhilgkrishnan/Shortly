import React from "react";
import PropTypes from "prop-types";

const StatsOverview = ({ urls = [] }) => {
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((acc, curr) => acc + (curr.click_count || 0), 0);
  const totalUniqueClicks = urls.reduce((acc, curr) => acc + (curr.unique_clicks || 0), 0);
  const pinnedCount = urls.filter(u => u.is_pinned).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm flex items-center space-x-3.5">
        <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
          <i className="ri-links-line leading-none"></i>
        </div>
        <div>
          <div className="inline-flex items-center space-x-1 text-gray-700">
            <i className="ri-links-line text-purple-600 text-xs"></i>
            <p className="text-[11px] font-bold uppercase tracking-wider">Links</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">{totalUrls}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm flex items-center space-x-3.5">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
          <i className="ri-bar-chart-box-line leading-none"></i>
        </div>
        <div>
          <div className="inline-flex items-center space-x-1 text-gray-700">
            <i className="ri-bar-chart-box-line text-emerald-600 text-xs"></i>
            <p className="text-[11px] font-bold uppercase tracking-wider">Clicks</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">{totalClicks}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm flex items-center space-x-3.5">
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl flex-shrink-0">
          <i className="ri-user-smile-line leading-none"></i>
        </div>
        <div>
          <div className="inline-flex items-center space-x-1 text-gray-700">
            <i className="ri-user-smile-line text-blue-600 text-xs"></i>
            <p className="text-[11px] font-bold uppercase tracking-wider">Unique</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">{totalUniqueClicks}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm flex items-center space-x-3.5">
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl flex-shrink-0">
          <i className="ri-pushpin-2-fill leading-none"></i>
        </div>
        <div>
          <div className="inline-flex items-center space-x-1 text-gray-700">
            <i className="ri-pushpin-2-fill text-amber-500 text-xs"></i>
            <p className="text-[11px] font-bold uppercase tracking-wider">Pinned</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">{pinnedCount}</p>
        </div>
      </div>
    </div>
  );
};

StatsOverview.propTypes = {
  urls: PropTypes.array,
};

export default StatsOverview;

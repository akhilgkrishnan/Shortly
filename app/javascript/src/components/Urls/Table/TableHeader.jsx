import React from "react";

const TableHeader = () => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 text-xs uppercase font-bold tracking-wider">
      <tr>
        <th scope="col" className="w-14 px-3 py-3.5 text-center">
          <span className="inline-flex items-center justify-center space-x-1" title="Pinned link">
            <i className="ri-pushpin-2-fill text-purple-600 text-sm leading-none"></i>
            <span>Pin</span>
          </span>
        </th>
        <th scope="col" className="px-5 py-3.5 text-left">
          <span className="inline-flex items-center space-x-1.5">
            <i className="ri-global-line text-gray-500 text-sm leading-none"></i>
            <span>Original URL</span>
          </span>
        </th>
        <th scope="col" className="px-5 py-3.5 text-left">
          <span className="inline-flex items-center space-x-1.5">
            <i className="ri-links-line text-purple-600 text-sm leading-none"></i>
            <span>Shortened URL</span>
          </span>
        </th>
        <th scope="col" className="w-36 px-3 py-3.5 text-center">
          <span className="inline-flex items-center justify-center space-x-1.5">
            <i className="ri-bar-chart-2-line text-purple-600 text-sm leading-none"></i>
            <span>Clicks (Total/Uniq)</span>
          </span>
        </th>
        <th scope="col" className="w-32 px-4 py-3.5 text-center">
          <span className="inline-flex items-center justify-center space-x-1.5">
            <i className="ri-settings-4-line text-gray-500 text-sm leading-none"></i>
            <span>Actions</span>
          </span>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;

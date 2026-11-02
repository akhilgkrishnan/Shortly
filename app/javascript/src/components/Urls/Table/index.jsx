import React, { useContext } from "react";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { UrlsDataContext } from "components/Dashboard";

const Table = ({ pinUrl, handleClick, deleteUrl }) => {
  const data = useContext(UrlsDataContext) || [];
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2.5">
          <h2 className="text-base font-bold text-gray-900">Shortened Links</h2>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
            {data.length}
          </span>
        </div>
        <span className="inline-flex items-center space-x-1.5 text-xs text-gray-700 font-semibold hidden sm:inline-flex">
          <i className="ri-pushpin-2-fill text-purple-600 text-sm leading-none"></i>
          <span>Pinned links appear first</span>
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <TableRow pinUrl={pinUrl} handleClick={handleClick} deleteUrl={deleteUrl} />
        </table>
      </div>
    </div>
  );
};

export default Table;

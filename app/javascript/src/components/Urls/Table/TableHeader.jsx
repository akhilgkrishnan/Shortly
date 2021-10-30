import React from "react";

const TableHeader = () => {
  return (
    <thead className="bg-purple-600 text-white text-lg ">
      <tr>
        <th className="p-6 rounded-t rounded-tr-none"></th>
        <th>Orginal</th>
        <th>Short Url</th>
        <th className="rounded-r rounded-br-none"></th>
      </tr>
    </thead>
  );
};

export default TableHeader;

import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ data }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200 mb-px">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td className="px-1 py-4 text-2xl font-medium text-center leading-5 text-bb-gray whitespace-no-wrap bg-gray-100">
            <i
              className={`text-gray-600 p-4 bg-gray-100 hover:text-purple-400 ${
                rowData.is_pinned
                  ? "ri-pushpin-2-fill text-purple-400"
                  : "ri-pushpin-2-fill"
              }`}
            ></i>
          </td>
          <td className="p-4 text-md break-all text-bb-gray">
            <a
              className="underline hover:text-gray-700 cursor-pointer"
              href={rowData.long_url}
              target="_blank"
              rel="noreferrer"
            >
              {rowData.long_url}
            </a>
          </td>
          <td
            className="p-4 text-md break-all
            leading-5 text-right cursor-pointer"
          >
            <a
              className="underline hover:text-gray-700 cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              {rowData.short_url}
            </a>
          </td>
          <td className="px-6 py-4 text-md text-center bg-gray-100">
            {rowData.click_count}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableRow;

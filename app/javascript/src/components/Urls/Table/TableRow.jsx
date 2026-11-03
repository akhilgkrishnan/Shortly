import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UrlsDataContext } from "components/Dashboard";
import Toastr from "components/Common/Toastr";
import QrModal from "components/Urls/QrModal";

const TableRow = ({ pinUrl, handleClick, deleteUrl }) => {
  const data = useContext(UrlsDataContext) || [];
  const [copiedId, setCopiedId] = useState(null);
  const [activeQr, setActiveQr] = useState(null);

  const handleCopy = (e, url, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    Toastr.success("Short URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (e, slug) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this short link?")) {
      deleteUrl(slug);
    }
  };

  const ensureHttp = (rawUrl) => {
    if (!rawUrl) return "#";
    if (/^https?:\/\//i.test(rawUrl)) return rawUrl;
    if (/^(javascript|data|vbscript|file):/i.test(rawUrl)) return "#";
    return `https://${rawUrl}`;
  };

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-100 text-sm">
        {data.map((rowData) => (
          <tr
            key={rowData.id}
            className={`hover:bg-purple-50/30 transition-colors ${
              rowData.is_pinned ? "bg-purple-50/40" : ""
            }`}
          >
            {/* Pin Column */}
            <td className="w-14 px-3 py-4 text-center whitespace-nowrap">
              {rowData.owned !== false ? (
                <button
                  type="button"
                  title={rowData.is_pinned ? "Unpin URL" : "Pin URL to top"}
                  className={`w-8 h-8 inline-flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                    rowData.is_pinned
                      ? "text-purple-600 bg-purple-100 hover:bg-purple-200 shadow-xs"
                      : "text-gray-500 hover:text-purple-600 hover:bg-gray-100"
                  }`}
                  onClick={() => pinUrl(rowData.slug, rowData.is_pinned)}
                >
                  <i
                    className={`${
                      rowData.is_pinned
                        ? "ri-pushpin-2-fill text-purple-600"
                        : "ri-pushpin-2-line text-gray-400"
                    } text-base leading-none`}
                  ></i>
                </button>
              ) : rowData.is_pinned ? (
                <span
                  title="Pinned by owner"
                  className="w-8 h-8 inline-flex items-center justify-center text-purple-500 cursor-default"
                >
                  <i className="ri-pushpin-2-fill text-base leading-none"></i>
                </span>
              ) : null}
            </td>

            {/* Original URL Column */}
            <td className="px-5 py-4 max-w-xs sm:max-w-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-global-line text-gray-500 flex-shrink-0 text-base"></i>
                <a
                  className="text-gray-900 hover:text-purple-600 truncate transition-colors font-semibold block"
                  href={ensureHttp(rowData.long_url)}
                  target="_blank"
                  rel="noreferrer"
                  title={rowData.long_url}
                >
                  {rowData.long_url}
                </a>
              </div>
            </td>

            {/* Shortened URL Column */}
            <td className="px-5 py-4 whitespace-nowrap">
              <a
                className="text-purple-600 hover:text-purple-800 font-bold transition-colors cursor-pointer inline-flex items-center space-x-1.5 hover:underline"
                href={rowData.short_url}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(rowData.short_url);
                }}
                target="_blank"
                rel="noreferrer"
              >
                <span>{rowData.short_url}</span>
                <i className="ri-external-link-line text-xs opacity-75"></i>
              </a>
            </td>

            {/* Clicks Badge Column */}
            <td className="w-32 px-3 py-4 text-center whitespace-nowrap">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-300">
                <span
                  title="Total Clicks"
                  className="inline-flex items-center space-x-1"
                >
                  <i className="ri-bar-chart-2-line text-xs text-purple-600"></i>
                  <span>{rowData.click_count || 0}</span>
                </span>
                <span className="text-gray-400 font-normal">|</span>
                <span
                  title="Unique Visitors"
                  className="inline-flex items-center space-x-1 text-blue-700"
                >
                  <i className="ri-user-smile-line text-xs text-blue-600"></i>
                  <span>{rowData.unique_clicks || 0}</span>
                </span>
              </span>
            </td>

            {/* Actions Column */}
            <td className="w-32 px-4 py-4 text-center whitespace-nowrap">
              <div className="flex items-center justify-center space-x-1.5">
                <button
                  type="button"
                  title="Copy short link"
                  onClick={(e) => handleCopy(e, rowData.short_url, rowData.id)}
                  className={`w-8 h-8 inline-flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
                    copiedId === rowData.id
                      ? "bg-green-50 border-green-300 text-green-700 shadow-xs"
                      : "bg-white border-gray-300 text-gray-700 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                >
                  <i
                    className={
                      copiedId === rowData.id
                        ? "ri-check-line text-base font-bold"
                        : "ri-file-copy-line text-base"
                    }
                  ></i>
                </button>
                <button
                  type="button"
                  title="View QR Code"
                  onClick={() =>
                    setActiveQr({ url: rowData.short_url, slug: rowData.slug })
                  }
                  className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
                >
                  <i className="ri-qr-code-line text-base"></i>
                </button>
                {rowData.owned !== false && (
                  <button
                    type="button"
                    title="Delete link"
                    onClick={(e) => handleDelete(e, rowData.slug)}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:text-red-700 hover:border-red-300 hover:bg-red-50 transition-all cursor-pointer"
                  >
                    <i className="ri-delete-bin-line text-base"></i>
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <QrModal
        isOpen={Boolean(activeQr)}
        onClose={() => setActiveQr(null)}
        url={activeQr?.url}
        slug={activeQr?.slug}
      />
    </>
  );
};

export default TableRow;

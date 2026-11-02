import React from "react";
import PropTypes from "prop-types";

const QrModal = ({ isOpen, onClose, url, slug }) => {
  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    url || ""
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center transform transition-all border border-gray-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <i className="ri-qr-code-line text-lg"></i>
            </div>
            <h3 className="font-bold text-gray-900 text-base">QR Code</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl inline-block my-2 border border-gray-100">
          <img
            src={qrImageUrl}
            alt={`QR Code for ${url}`}
            className="w-48 h-48 mx-auto rounded"
            loading="lazy"
          />
        </div>

        <p className="text-xs text-gray-700 font-semibold mt-2 font-mono break-all px-2">
          {url}
        </p>

        <div className="mt-5 flex gap-2">
          <a
            href={qrImageUrl}
            download={`shortly-qr-${slug}.png`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center space-x-1"
          >
            <i className="ri-download-2-line"></i>
            <span>Open / Save Image</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

QrModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string,
  slug: PropTypes.string,
};

export default QrModal;

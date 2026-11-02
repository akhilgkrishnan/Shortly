import React from "react";
import PropTypes from "prop-types";

const Button = ({ type = "button", buttonText, onClick, loading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full sm:w-auto h-full px-6 py-3 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:opacity-60 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer whitespace-nowrap"
    >
      {loading ? (
        <span className="flex items-center space-x-2">
          <i className="ri-loader-4-line animate-spin text-base"></i>
          <span>Shortening...</span>
        </span>
      ) : (
        <span className="flex items-center space-x-1.5">
          <span>{buttonText}</span>
          <i className="ri-arrow-right-line text-sm"></i>
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;

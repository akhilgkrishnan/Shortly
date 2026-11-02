import React from "react";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 hover:border-gray-400 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm transition-all shadow-xs"
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;

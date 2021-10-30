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
        className="bg-white border-2 border-white
                  rounded-l appearance-none w-full
                  py-2 px-4 text-gray-700 leading-tight
                  focus:outline-none focus:border-purple-500"
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

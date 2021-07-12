import React from "react";
import PropTypes from "prop-types";

const Button = ({ type = "button", buttonText, onClick, loading }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="rounded-r bg-purple-500 hover:bg-purple-400
                  focus:shadow-outline focus:outline-none text-white
                  font-bold py-2 px-4 cursor-pointer"
      >
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;

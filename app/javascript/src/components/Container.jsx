import React from "react";

import PropTypes from "prop-types";
const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 my-6 w-full ${className}`}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;

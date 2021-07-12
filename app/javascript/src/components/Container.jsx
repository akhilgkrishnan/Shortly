import React from "react";

import PropTypes from "prop-types";
const Container = ({ children }) => {
  return (
    <>
      <div className="my-4 w-4/6 p-4 my-0 mx-auto">{children}</div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;

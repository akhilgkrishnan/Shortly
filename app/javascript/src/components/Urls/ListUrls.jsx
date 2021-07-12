import React from "react";
import Table from "./Table";

const ListUrls = ({ pinUrl, handleClick }) => {
  return <Table pinUrl={pinUrl} handleClick={handleClick} />;
};

export default ListUrls;

import React from "react";
import Table from "./Table";

const ListUrls = ({ data, pinUrl, handleClick }) => {
  return <Table data={data} pinUrl={pinUrl} handleClick={handleClick} />;
};

export default ListUrls;

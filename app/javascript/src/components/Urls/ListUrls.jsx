import React from "react";
import Table from "./Table";

const ListUrls = ({ pinUrl, handleClick, deleteUrl }) => {
  return <Table pinUrl={pinUrl} handleClick={handleClick} deleteUrl={deleteUrl} />;
};

export default ListUrls;

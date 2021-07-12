import React from "react";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ data, pinUrl, handleClick }) => {
  return (
    <table className="divide-y min-w-full shadow rounded table-auto">
      <TableHeader />
      <TableRow data={data} pinUrl={pinUrl} handleClick={handleClick} />
    </table>
  );
};

export default Table;

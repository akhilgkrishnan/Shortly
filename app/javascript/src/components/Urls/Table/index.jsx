import React from "react";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ pinUrl, handleClick }) => {
  return (
    <table className="divide-y min-w-full shadow rounded table-auto">
      <TableHeader />
      <TableRow pinUrl={pinUrl} handleClick={handleClick} />
    </table>
  );
};

export default Table;

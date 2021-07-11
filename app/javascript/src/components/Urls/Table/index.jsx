import React from "react";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ data }) => {
  return (
    <table className="divide-y min-w-full shadow rounded table-auto">
      <TableHeader />
      <TableRow data={data} />
    </table>
  );
};

export default Table;

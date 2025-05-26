import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

import { Student } from "../../../interfaces/student_interface";

export const StudentGradesList = () => {
  const { dataGridProps } = useDataGrid<Student>();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        flex: 1,
        minWidth: 50,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "fullname",
        flex: 1,
        headerName: "Fullname",
        minWidth: 200,
        display: "flex",
        renderCell: function render({ row }) {
          return `${row.name} ${row.lastname}`;
        },
      },
      {
        field: "semester",
        flex: 1,
        headerName: "Semester",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "actions",
        headerName: "Action",
        align: "center",
        headerAlign: "center",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <ShowButton hideText recordItemId={row.id} />
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </List>
  );
};
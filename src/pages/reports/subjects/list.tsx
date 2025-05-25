import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

import { Subject } from "../../../interfaces/subject_interface";

export const SubjectReportsList = () => {
  const { dataGridProps } = useDataGrid<Subject>();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "semester",
        flex: 1,
        headerName: "Semester",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "average",
        flex: 1,
        headerName: "Average",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton
                hideText
                recordItemId={row.id}
                confirmTitle={`Are you sure you want to delete the subject: ${row.name}?`}
              />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List canCreate={false}>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </List>
  );
};

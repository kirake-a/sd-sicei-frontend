import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
} from "@refinedev/mui";
import React, { useState, useEffect } from "react";

import { Student } from "../../interfaces/student_interface";
import { getAllStudents } from "../../api/api_students";

export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

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
        field: "lastname",
        flex: 1,
        headerName: "Lastname",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
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
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        rows={students}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
      />
    </List>
  );
};

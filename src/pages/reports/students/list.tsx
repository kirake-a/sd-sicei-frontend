import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

import { Student } from "../../../interfaces/student_interface";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";


export const StudentReportsList = () => {
  const { dataGridProps } = useDataGrid<Student>();
  const studentRecord = [
  {
    id: 1,
    name: "Carlos",
    lastname: "Ramírez",
    status: "Regular",
  },
];

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
        field: "status",
        flex: 1,
        headerName: "Status",
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
            <ShowButton hideText recordItemId={row.id} />
          );
        },
      },
    ],
    []
  );

  return (
    <List canCreate={false}>
      <Box mb={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="semester-select-label">Semester</InputLabel>
          <Select
            labelId="semester-select-label"
            id="semester-select"
            defaultValue=""
            label="Semester"
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="type-student-select-label">Type of Student</InputLabel>
          <Select
            labelId="type-student-select-label"
            id="type-student-select"
            defaultValue=""
            label="Type of Student"
          >
            <MenuItem value="all">All Students</MenuItem>
            <MenuItem value="regular">Regular Students</MenuItem>
            <MenuItem value="irregular">Irregular Students</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </List>
  );
};

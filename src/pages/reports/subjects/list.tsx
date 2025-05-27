import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

import { Subject } from "../../../interfaces/subject_interface";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  SelectChangeEvent
} from "@mui/material";

export const SubjectReportsList = () => {
  const { dataGridProps } = useDataGrid<Subject>();

  const [semester, setSemester] = React.useState<string>("");

  const handleSemesterChange = (event: SelectChangeEvent) => {
    setSemester(event.target.value);
  };

  const filteredRows = React.useMemo(() => {
    if (!dataGridProps.rows) return [];

    if (semester === "") {
      return dataGridProps.rows;
    }

    return dataGridProps.rows.filter(
      (row) => row.semester.toString() === semester
    );
  }, [dataGridProps.rows, semester]);

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
          field: "description",
          flex: 1,
          headerName: "Description",
          minWidth: 200,
          renderCell: (params) => (
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
                maxWidth: "100%",
              }}
              title={params.value}
            >
              {params.value}
            </span>
          ),
        },      
        {
          field: "credits",
          flex: 1,
          headerName: "Credits",
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
            onChange={handleSemesterChange}
          >
            <MenuItem value="">All</MenuItem>
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
            
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row) => row.id}
        rows={filteredRows}
      />
    </List>
  );
};

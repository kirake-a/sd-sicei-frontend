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
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const StudentReportsList = () => {
  const { dataGridProps } = useDataGrid<Student>();

  const [semester, setSemester] = React.useState<string>("");
  
  const handleSemesterChange = (event: SelectChangeEvent) => {
    setSemester(event.target.value);
  };

  const [studentType, setStudentType] = React.useState<string>("all");

  const handleStudentTypeChange = (event: SelectChangeEvent) => {
    setStudentType(event.target.value);
  };

  const filteredRows = React.useMemo(() => {
    if (!dataGridProps.rows) return [];

    return dataGridProps.rows.filter((row) => {
      const semesterMatch = semester === "" || row.semester.toString() === semester;
      const statusMatch =
        studentType === "all" ||
        (studentType === "regular" && row.status === true) ||
        (studentType === "irregular" && row.status === false);

      return semesterMatch && statusMatch;
    });
  }, [dataGridProps.rows, semester, studentType]);

  const COLORS = ["#4caf50", "#f44336"];

  const pieData = React.useMemo(() => {
    if (!dataGridProps.rows) return [];

    const summary: { [key: string]: { regular: number; irregular: number } } = {};

    dataGridProps.rows.forEach((row) => {
      const sem = row.semester.toString();
      const status = row.status ? "regular" : "irregular";

      if (!summary[sem]) {
        summary[sem] = { regular: 0, irregular: 0 };
      }

      summary[sem][status]++;
    });

    return Object.entries(summary).flatMap(([semester, counts]) => [
      {
        name: `Semester ${semester} - Regular`,
        value: counts.regular,
        group: "Regular",
      },
      {
        name: `Semester ${semester} - Irregular`,
        value: counts.irregular,
        group: "Irregular",
      },
    ]);
  }, [dataGridProps.rows]);

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
        renderCell: function render({ row }) {
          return row.status ? "Regular" : "Irregular";
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

      <Box mb={2}>
        <FormControl fullWidth size="small">
          <InputLabel id="type-student-select-label">Type of Student</InputLabel>
          <Select
            labelId="type-student-select-label"
            id="type-student-select"
            value={studentType}
            label="Type of Student"
            onChange={handleStudentTypeChange}
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
        rows={filteredRows}
      />

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Student Status by Semester
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.group === "Regular" ? COLORS[0] : COLORS[1]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </List>
  );
};

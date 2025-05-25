import { Typography } from "@mui/material";
import { useCustom } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { GradeToShow } from "../../interfaces/grade_interface";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Show
} from "@refinedev/mui";

import Paper from '@mui/material/Paper';

export const StudentGradesShow = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useCustom<GradeToShow[]>({
    url: `grades/students/${id}`,
    method: "get"
  });

  const rows = data?.data || [];

  const columns: GridColDef[] = [
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      minWidth: 70,
      display: 'flex',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'value',
      headerName: 'Grades',
      width: 130
    },
    {
      field: 'materyLevel',
      headerName: 'Mastery level',
      width: 130,
      renderCell: function render({ row }) {
        if (row.value >= 90) {
          return <Typography color="green">Excellent</Typography>;
        } else if (row.value >= 80) {
          return <Typography color="blue">Good</Typography>;
        } else if (row.value >= 70) {
          return <Typography color="orange">Satisfactory</Typography>;
        } else {
          return <Typography color="red">Unsatisfactory</Typography>;
        }
      }
    },
  ];

  return (
    <Show isLoading={isLoading} title="Student Grades" >
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          getRowId={(row) => row.id}
        />
      </Paper>
    </Show>
  );
};

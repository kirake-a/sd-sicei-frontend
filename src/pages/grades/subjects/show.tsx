import { Paper, Typography } from "@mui/material";
import { useCustom } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { useParams } from "react-router-dom";
import { GradeToShow } from "../../../interfaces/grade_interface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const SubjectGradesShow = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useCustom<GradeToShow[]>({
    url: `grades/subjects/${id}`,
    method: "get"
  });
  const rows = data?.data || [];

  const columns: GridColDef[] = [
    {
      field: 'student',
      headerName: 'Student',
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
          return <Typography color="blue">Really Good</Typography>;
        } else if (row.value >= 70) {
          return <Typography color="orange">Satisfactory</Typography>;
        } else {
          return <Typography color="red">Unsatisfactory</Typography>;
        }
      }
    },
  ];

  return (
    <Show isLoading={isLoading} title="Subject Grades" >
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
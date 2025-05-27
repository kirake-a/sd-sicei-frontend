import { Paper, Stack, Box, Button, Typography } from "@mui/material";
import { useCustom } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { useParams } from "react-router-dom";
import { Report } from "../../../interfaces/report_interface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const SubjectReportsShow = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useCustom<Report>({
    url: `reports/subjects/${id}/grades`,
    method: "get"
  });
  const rows = data?.data?.students ?? [];

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
    <Show isLoading={isLoading} canEdit={false} title="Subjects Reports">
      <Stack gap={2}>
          <Box display="flex" gap={4}>
            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Subject Name
              </Typography>
              <TextField value="Subject's Name" />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Semester
              </Typography>
              <TextField value="nose" />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Subject's Average
              </Typography>
              <TextField value={data?.data?.average} />
            </Box>
          </Box>

          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              getRowId={(row) => row.id}
            />
          </Paper>
        </Stack>
    </Show>
  );
};

import {
  Stack,
  Typography,
  Box
} from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Student } from "../../../interfaces/student_interface";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

export const StudentReportsShow = () => {
  const { query } = useShow<Student>();

  const { data, isLoading } = query;
  //const record = data?.data;

  const record = {
  id: 1,
  name: "Andrea",
  lastname: "González",
  semester: 5,
  subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
  grades: [95, 88, 85, 92, 86],
};

const subjectGradeRows =
  record?.subjects?.map((subject, index) => ({
    id: index,
    subject,
    grade: record?.grades?.[index],
  })) || [];

const calculateAverage = (grades?: number[]): string => {
  if (!grades || grades.length === 0) return "N/A";

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  const average = total / grades.length;
  return average.toFixed(2);
};

const average = calculateAverage(record?.grades);

const columns: GridColDef[] = [
  {
    field: "subject",
    headerName: "Subject",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "grade",
    headerName: "Grade",
    flex: 1,
    minWidth: 100,
    type: "number",
  },
];

  return (
    <Show isLoading={isLoading} canEdit={false}>
      <Stack gap={2}>
        <Box display="flex" gap={4} >
          <Box flex={1}>
            <Typography variant="body1" fontWeight="bold">
              Full Name
            </Typography>
            <TextField value={record?.name + " " + record?.lastname} />
          </Box>

          <Box flex={1}>
            <Typography variant="body1" fontWeight="bold">
              Semester
            </Typography>
            <TextField value={record?.semester} />
          </Box>

          <Box flex={1}>
            <Typography variant="body1" fontWeight="bold">
              Student's Average
            </Typography>
            <TextField value={average} />
          </Box>
        </Box>
        <Box>
          <DataGrid
            rows={subjectGradeRows}
            columns={columns}
            hideFooter
          />
        </Box>
      </Stack>
    </Show>
  );
};

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Student } from "../../../interfaces/student_interface";

export const StudentReportsShow = () => {
  const { query } = useShow<Student>();

  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"Full Name"}
        </Typography>
        <TextField value={record?.name + " " + record?.lastname} />

        <Typography variant="body1" fontWeight="bold">
          {"Semester"}
        </Typography>
        <TextField value={record?.semester} />

        <Typography variant="body1" fontWeight="bold">
          {"Subjects"}
        </Typography>
        <TextField value="List of Subjects" />

        <Typography variant="body1" fontWeight="bold">
          {"Grades"}
        </Typography>
        <TextField value="List of Grades" />

        <Typography variant="body1" fontWeight="bold">
          {"Student's Average"}
        </Typography>
        <TextField value="97.5" />
      </Stack>
    </Show>
  );
};

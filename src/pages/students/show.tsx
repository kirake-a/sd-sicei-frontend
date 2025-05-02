import { useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { getStudentById } from "../../api/api_students";
import { Student } from "../../interfaces/student_interface";

export const StudentShow = () => {
  const { query } = useShow<Student>();

  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          {"Full Name"}
        </Typography>
        <TextField value={record?.name + " " + record?.lastname} />

        <Typography variant="body1" fontWeight="bold">
          {"Email"}
        </Typography>
        <TextField value={record?.email} />

        <Typography variant="body1" fontWeight="bold">
          {"Semester"}
        </Typography>
        <TextField value={record?.semester} />
      </Stack>
    </Show>
  );
};

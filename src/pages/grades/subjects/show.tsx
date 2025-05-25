import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Subject } from "../../../interfaces/subject_interface";

export const SubjectGradesShow = () => {
  const { query } = useShow<Subject>();

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
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Semester"}
        </Typography>
        <TextField value={record?.semester} />

        <Typography variant="body1" fontWeight="bold">
          {"Students"}
        </Typography>
        <TextField value="List of Students" />

        <Typography variant="body1" fontWeight="bold">
          {"Grades"}
        </Typography>
        <TextField value="List of Grades" />
      </Stack>
    </Show>
  );
};

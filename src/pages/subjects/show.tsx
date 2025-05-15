import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Subject } from "../../interfaces/subject_interface";

export const SubjectShow = () => {
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
          {"Description"}
        </Typography>
        <TextField value={record?.description} />

        <Typography variant="body1" fontWeight="bold">
          {"Credits"}
        </Typography>
        <TextField value={record?.credits} />

        <Typography variant="body1" fontWeight="bold">
          {"Semester"}
        </Typography>
        <TextField value={record?.semester} />
      </Stack>
    </Show>
  );
};

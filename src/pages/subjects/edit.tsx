import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useParams } from "react-router-dom";

import { Subject } from "../../interfaces/subject_interface";

type FormValues = Omit<Subject, "id">;

export const SubjectEdit = () => {
  const { id } = useParams<{ id: string }>();

  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    refineCoreProps: {
      action: "edit",
      id: id,
      resource: "subjects",
    },
  });

  return (
    <Edit isLoading={false} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors?.name}
          helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="text"
          label={"Name"}
          name="name"
        />

        <TextField
          {...register("description")}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="text"
          label={"Description"}
          name="description"
        />

        <TextField
          {...register("credits", {
            required: "This field is required",
          })}
          error={!!errors?.credits}
          helperText={typeof errors.credits?.message === "string" ? errors.credits.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="number"
          label={"Credits"}
          name="credits"
        />

        <TextField
          {...register("semester", {
            required: "This field is required",
          })}
          error={!!errors?.semester}
          helperText={typeof errors.semester?.message === "string" ? errors.semester.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="number"
          label={"Semester"}
          name="semester"
        />
      </Box>
    </Edit>
  );
};

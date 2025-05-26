import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

import { Subject } from "../../interfaces/subject_interface";

type FormValues = Omit<Subject, "id">;

export const SubjectCreate = () => {

  const {
    saveButtonProps,
    register,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm<FormValues>({
    refineCoreProps: {
      resource: "subjects",
      action: "create",
    },
  })

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", { required: "This field is required" })}
          error={!!errors.name}
          helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          label="Name"
          name="name"
        />
        <TextField
          {...register("description")}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          label="Description"
          name="description"
        />
        <TextField
          {...register("credits", { required: "This field is required" })}
          error={!!errors.credits}
          helperText={typeof errors.credits?.message === "string" ? errors.credits.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="number"
          label="Credits"
          name="credits"
        />
        <TextField
          {...register("semester", {
            required: "This field is required",
            min: { value: 1, message: "Semester must be at least 1" },
            max: { value: 10, message: "Semester must be at most 10" },
          })}
          error={!!errors.semester}
          helperText={typeof errors.semester?.message === "string" ? errors.semester.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="number"
          inputProps={{ min: 1, max: 10 }}
          label="Semester"
          name="semester"
        />
      </Box>
    </Create>
  );
};

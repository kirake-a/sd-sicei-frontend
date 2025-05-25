import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

import { Student } from "../../../interfaces/student_interface";

type FormValues = Omit<Student, "id">;

export const StudentReportsCreate = () => {

  const {
    saveButtonProps,
    register,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm<FormValues>({
    refineCoreProps: {
      resource: "grades-students",
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
          {...register("lastname", { required: "This field is required" })}
          error={!!errors.lastname}
          helperText={typeof errors.lastname?.message === "string" ? errors.lastname.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          label="Lastname"
          name="lastname"
        />
        <TextField
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={typeof errors.email?.message === "string" ? errors.email.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          label="Email"
          name="email"
        />
        <TextField
          {...register("semester", { required: "This field is required" })}
          error={!!errors.semester}
          helperText={typeof errors.semester?.message === "string" ? errors.semester.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="number"
          label="Semester"
          name="semester"
        />
      </Box>
    </Create>
  );
};

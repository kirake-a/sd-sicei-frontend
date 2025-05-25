import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useParams } from "react-router-dom";

import { Student } from "../../../interfaces/student_interface";

type FormValues = Omit<Student, "id">;

export const StudentGradesEdit = () => {
  const { id } = useParams<{ id: string }>();

  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    refineCoreProps: {
      action: "edit",
      id: id,
      resource: "grades-students",
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
          {...register("lastname", {
            required: "This field is required",
          })}
          error={!!errors?.lastname}
          helperText={typeof errors.lastname?.message === "string" ? errors.lastname.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="text"
          label={"Lastname"}
          name="lastname"
        />

        <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!errors?.email}
          helperText={typeof errors.email?.message === "string" ? errors.email.message : ""}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          type="text"
          label={"Email"}
          name="email"
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

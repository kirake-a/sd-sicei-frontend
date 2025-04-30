import { Box, TextField, Button } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "react-hook-form";
import { useNotification } from "@refinedev/core";

import { createStudent } from "../../api/api_students";

import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  lastname: string;
  email: string;
  semester: number;
}

export const StudentCreate = () => {
  const navigate = useNavigate();
  const { open } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await createStudent(data);
      open?.({
        type: "success",
        message: "Student created successfully",
        description: "The student has been created successfully.",
        key: "student-create-success",
        undoableTimeout: 1000,
      });
      navigate("/students");
    } catch (error) {
      console.error("Error creating student:", error);
      open?.({
        type: "error",
        message: "Error creating student",
        description: "There was an error creating the student.",
        key: "student-create-error",
        undoableTimeout: 1000
      });
    }
  }

  return (
    <Create isLoading={isSubmitting} saveButtonProps={{ style: { display: "none" } }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          type="text"
          label={"Name"}
          name="name"
        />
        <TextField
          {...register("lastname", {
            required: "This field is required",
          })}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          margin="normal"
          fullWidth
          type="text"
          label={"Lastname"}
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
          helperText={errors.email?.message}
          margin="normal"
          fullWidth
          type="email"
          label={"Email"}
          name="email"
        />
        <TextField
          {...register("semester", {
            required: "This field is required",
          })}
          error={!!errors.semester}
          helperText={errors.semester?.message}
          margin="normal"
          fullWidth
          type="number"
          label={"Semester"}
          name="semester"
        />
        <Button 
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt:2, alignSelf: "flex-end" }}
        >
          Create Student
        </ Button>
      </Box>
    </Create>
  );
};

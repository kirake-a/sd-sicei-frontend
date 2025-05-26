import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useCustom } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { GradeToShow } from "../../../interfaces/grade_interface";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Edit
} from "@refinedev/mui";

import Paper from '@mui/material/Paper';
import { useEffect, useState, useMemo } from "react";

export const StudentGradesEdit = () => {
  const { id } = useParams();

  const { data, isLoading } = useCustom<GradeToShow[]>({
    url: `grades/students/${id}`,
    method: "get"
  });

  const initialRows = useMemo(() => data?.data || [], [data]);

  const [editedRows, setEditedRows] = useState<Record<number, number>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

useEffect(() => {
  if (initialRows.length > 0) {
    const initialState: Record<number, number> = {};
    initialRows.forEach(row => {
      initialState[row.id] = row.value;
    });
    setEditedRows(initialState);
  }
}, [initialRows]);


  const handleChange = (id: number, value: number) => {

    if (isNaN(value)) {
      setErrors(prev => ({ ...prev, [id]: "Value must be a number" }));
      return;
    }

    if (value < 0 || value > 100) {
      setErrors(prev => ({ ...prev, [id]: "Value must be between 0 and 100" }));
    } else {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }

    setEditedRows(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = (rowId: number, subject: string) => {
    const updatedValue = editedRows[rowId] ?? initialRows.find(row => row.id === rowId)?.value;
    console.log(`Saving value for ${subject}: ${updatedValue}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      minWidth: 70,
      display: 'flex',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'value',
      headerName: 'Grades',
      width: 130,
      renderCell: function render({ row }) {
        return (
          <TextField
            margin="normal"
            value={editedRows[row.id] ?? row.value}
            onChange={(e) => handleChange(row.id, parseInt(e.target.value))}
            error={!!errors[row.id]}
            helperText={errors[row.id]}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { style: { padding: "3px" } },
            }}
            type="number"
            label={"Grade"}
            name="value"
          />
        )
      }
      
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 130,
      align: 'center',
      renderCell: function render({ row }) {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleUpdate(row.id, row.subject);
            }}
          >
            Update
          </Button>
        )
      }
    },
  ];

  return (
    <Edit
      isLoading={isLoading}
      title="Student Grades"
      saveButtonProps={{ style: { display: "none" } }}
    >
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={initialRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          getRowId={(row) => row.id}
        />
      </Paper>
    </Edit>
  );
};
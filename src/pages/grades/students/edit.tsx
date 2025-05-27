import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useCustom, useNotification } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { GradeToShow } from "../../../interfaces/grade_interface";
import axios from "axios";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Edit
} from "@refinedev/mui";

import Paper from '@mui/material/Paper';
import { useEffect, useState, useMemo } from "react";

export const StudentGradesEdit = () => {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_SICEI_API_ORIGIN;
  const { open: notify } = useNotification();

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

  const handleUpdate = async (rowId: number, subject: string) => {
    const updatedValue =
      editedRows[rowId] ?? initialRows.find(row => row.id === rowId)?.value;

    console.log(`Saving value for ${subject}: ${updatedValue}`);

    try {
      await axios.put(`${API_URL}/grades/${rowId}`, {
        value: updatedValue,
      });
      if (notify) {
        notify({
          type: "success",
          message: `Grade for ${subject} updated successfully`,
        });
      }
    } catch (error) {
      if (notify) {
        notify({
          type: "error",
          message: "Failed to update grade",
        });
      }
    }
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
            type="number"
            name="value"
            value={
              editedRows[row.id] === undefined || isNaN(editedRows[row.id])
                ? ""
                : editedRows[row.id].toString()
            }
            onChange={(e) => {
              const rawValue = e.target.value;

              if (rawValue === "") {
                setEditedRows(prev => ({ ...prev, [row.id]: NaN }));
                setErrors(prev => ({ ...prev, [row.id]: "Field is required" }));
                return;
              }

              const value = Number(rawValue);

              if (!Number.isInteger(value)) {
                setErrors(prev => ({ ...prev, [row.id]: "Must be an integer" }));
              } else if (value < 1 || value > 100) {
                setErrors(prev => ({ ...prev, [row.id]: "1 - 100 credits" }));
              } else {
                setErrors(prev => ({ ...prev, [row.id]: "" }));
              }

              setEditedRows(prev => ({ ...prev, [row.id]: value }));
            }}
            error={!!errors[row.id]}
            helperText={errors[row.id]}
            fullWidth
            inputProps={{
              min: 1,
              max: 100,
              step: 1,
              sx: {
                height: '1px',
                fontSize: '14px',
              },
            }}
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
          rowHeight={60} 
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
import { Paper, Stack, Box, Button, Typography } from "@mui/material";
import { useCustom } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { useParams } from "react-router-dom";
import { ReportStudent } from "../../../interfaces/report_interface";
import { Subject } from "../../../interfaces/subject_interface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const SubjectReportsShow = () => {
  const { id } = useParams<{ id: string }>();

  const { data: gradesData, isLoading: isGradesLoading } = useCustom<ReportStudent>({
    url: `reports/subjects/${id}/grades`,
    method: "get",
  });

  const { data: subjectData, isLoading: isStudentLoading } = useCustom<Subject>({
    url: `subjects/${id}`,
    method: "get",
  });

  const isLoading = isGradesLoading || isStudentLoading;
  const rows = gradesData?.data?.students ?? [];

  const columns: GridColDef[] = [
    {
      field: 'student',
      headerName: 'Student',
      flex: 1,
      minWidth: 70,
      display: 'flex',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'value',
      headerName: 'Grades',
      width: 130
    },
    {
      field: 'materyLevel',
      headerName: 'Mastery Level',
      width: 130,
      renderCell: function render({ row }) {
        if (row.value >= 90) {
          return <Typography color="green">Excellent</Typography>;
        } else if (row.value >= 80) {
          return <Typography color="blue">Really Good</Typography>;
        } else if (row.value >= 70) {
          return <Typography color="orange">Satisfactory</Typography>;
        } else {
          return <Typography color="red">Unsatisfactory</Typography>;
        }
      }
    },
  ];

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${subjectData?.data.name + "_" + subjectData?.data.semester}Semester_Grades.pdf`);
  };

  const masteryData = React.useMemo(() => {
    const counts = {
      Excellent: 0,
      "Really Good": 0,
      Satisfactory: 0,
      Unsatisfactory: 0,
    };

    rows.forEach((row) => {
      if (row.value >= 90) counts.Excellent++;
      else if (row.value >= 80) counts["Really Good"]++;
      else if (row.value >= 70) counts.Satisfactory++;
      else counts.Unsatisfactory++;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [rows]);

  const MASTERY_COLORS: Record<string, string> = {
    Excellent: "#4CAF50", 
    "Really Good": "#2196F3",  
    Satisfactory: "#FF9800", 
    Unsatisfactory: "#F44336",
  };


  return (
    <Show isLoading={isLoading} canEdit={false} title="Subjects Reports">
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleDownloadPdf}>
          Download PDF
        </Button>
      </Box>

      {}
      <div ref={contentRef}>
      <Stack gap={2}>
        <Box display="flex" gap={4}>
          <Box flex={1}>
            <Typography variant="body1" fontWeight="bold">
              Subject Name
            </Typography>
            <TextField value={subjectData?.data.name} />
          </Box>

          <Box flex={1}>
            <Typography variant="body1" fontWeight="bold">
              Semester
            </Typography>
            <TextField value={subjectData?.data.semester} />
          </Box>

          <Box flex={1}>
            <Typography variant="body1" fontWeight="bold">
              Subject's Average
            </Typography>
            <TextField value={gradesData?.data?.average} />
          </Box>
        </Box>

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            getRowId={(row) => row.id}
          />
        </Paper>

        <Box mb={4} height={300}>
          <Typography variant="h6" mb={2}>
            Mastery Levels Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={masteryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {masteryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={MASTERY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
      </div>
    </Show>
  );
};

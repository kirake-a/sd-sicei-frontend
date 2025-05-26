import {
  Stack,
  Typography,
  Box,
  Button
} from "@mui/material";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Student } from "../../../interfaces/student_interface";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

export const StudentReportsShow = () => {
  const { query } = useShow<Student>();
  const { data, isLoading } = query;

  const record = {
    id: 1,
    name: "Andrea",
    lastname: "González",
    semester: 5,
    subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
    grades: [95, 88, 85, 92, 86],
  };

  const subjectGradeRows =
    record?.subjects?.map((subject, index) => ({
      id: index,
      subject,
      grade: record?.grades?.[index],
    })) || [];

  const calculateAverage = (grades?: number[]): string => {
    if (!grades || grades.length === 0) return "N/A";

    const total = grades.reduce((sum, grade) => sum + grade, 0);
    const average = total / grades.length;
    return average.toFixed(2);
  };

  const average = calculateAverage(record?.grades);

  const columns: GridColDef[] = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 1,
      minWidth: 100,
      type: "number",
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
    pdf.save(`boleta_${record.name}_${record.lastname}.pdf`);
  };

  return (
    <Show isLoading={isLoading} canEdit={false}>
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
                Full Name
              </Typography>
              <TextField value={record?.name + " " + record?.lastname} />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Semester
              </Typography>
              <TextField value={record?.semester} />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Student's Average
              </Typography>
              <TextField value={average} />
            </Box>
          </Box>

          <Box>
            <DataGrid
              rows={subjectGradeRows}
              columns={columns}
              hideFooter
              autoHeight
            />
          </Box>
        </Stack>
      </div>
    </Show>
  );
};
import {
  Stack,
  Typography,
  Box,
  Button
} from "@mui/material";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCustom } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { ReportSubject } from "../../../interfaces/report_interface";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

export const StudentReportsShow = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useCustom<ReportSubject>({
      url: `reports/students/${id}/grades`,
      method: "get"
  });
  const rows = data?.data?.subjects ?? [];

  const columns: GridColDef[] = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "value",
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
    pdf.save(`Grades_Student's_Full_Name.pdf`);
  };

  return (
    <Show isLoading={isLoading} canEdit={false} title="Student Reports">
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
              <TextField value="Student's Name" />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Semester
              </Typography>
              <TextField value="Student's Semester" />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Student's Average
              </Typography>
              <TextField value={data?.data?.average} />
            </Box>
          </Box>

          <Box>
            <DataGrid
              rows={rows}
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
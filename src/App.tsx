import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { customDataProvider } from "./api/data-provider";

import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import GradingIcon from '@mui/icons-material/Grading';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SummarizeIcon from '@mui/icons-material/Summarize';

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  StudentCreate,
  StudentEdit,
  StudentList,
  StudentShow
} from "./pages/students"

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
              <Refine
                dataProvider={customDataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[  
                  {
                    name: "students",
                    list: "/students",
                    create: "/students/create",
                    edit: "/students/edit/:id",
                    show: "/students/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <PersonIcon />,
                    },
                  },
                  {
                    name: "subjects",
                    list: "/subjects",
                    create: "/subjects/create",
                    edit: "/subjects/edit/:id",
                    show: "/subjects/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <SubjectIcon />,
                    },
                  },
                  {
                    name: "grades",
                    list: "/grades",
                    meta: {
                      label: "Grades",
                      icon: <GradingIcon />,
                    },
                  },
                  {
                    name: "student-grades",
                    list: "/student-grades",
                    create: "/student-grades/create",
                    edit: "/student-grades/edit/:id",
                    show: "/student-grades/show/:id",
                    meta: {
                      parent: "grades",
                      canDelete: false,
                      icon: <AssignmentIndIcon />,
                    },
                  },
                  {
                    name: "subject-grades",
                    list: "/subject-grades",
                    create: "/subject-grades/create",
                    edit: "/subject-grades/edit/:id",
                    show: "/subject-grades/show/:id",
                    meta: {
                      parent: "grades",
                      canDelete: false,
                      icon: <SummarizeIcon />,
                    },
                  },
                  {
                    name: "reports",
                    list: "/reports",
                    meta: {
                      label: "Reports",
                      icon: <AssessmentIcon />,
                    },
                  },
                  {
                    name: "student-reports",
                    list: "/student-reports",
                    create: "/student-reports/create",
                    edit: "/student-reports/edit/:id",
                    show: "/student-reports/show/:id",
                    meta: {
                      parent: "reports",
                      canDelete: false,
                      icon: <AssignmentIndIcon />,
                    },
                  },
                  {
                    name: "subject-reports",
                    list: "/subject-reports",
                    create: "/subject-reports/create",
                    edit: "/subject-reports/edit/:id",
                    show: "/subject-reports/show/:id",
                    meta: {
                      parent: "reports",
                      canDelete: false,
                      icon: <SummarizeIcon />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "FWS3gv-VXqesY-tz8Rmj",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2 Header={() => <Header sticky />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="students" />}
                    />
                    <Route path="/students">
                      <Route index element={<StudentList />} />
                      <Route path="create" element={<StudentCreate />} />
                      <Route path="edit/:id" element={<StudentEdit />} />
                      <Route path="show/:id" element={<StudentShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

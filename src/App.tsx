import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { customDataProvider } from "./api/data-provider";
import { resources } from "./utils/resources";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { Header } from "./components/header";

import {
  StudentCreate,
  StudentEdit,
  StudentList,
  StudentShow
} from "./pages/students"

import {
  SubjectCreate,
  SubjectEdit,
  SubjectList,
  SubjectShow
} from "./pages/subjects"

import {
  StudentGradesCreate,
  StudentGradesEdit,
  StudentGradesList,
  StudentGradesShow
} from "./pages/grades-students"

const StickyHeader = () => <Header sticky />;

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
                resources={resources}
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
                      <ThemedLayoutV2 Header={StickyHeader}>
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

                    <Route path="/subjects">
                      <Route index element={<SubjectList />} />
                      <Route path="create" element={<SubjectCreate />} />
                      <Route path="edit/:id" element={<SubjectEdit />} />
                      <Route path="show/:id" element={<SubjectShow />} />
                    </Route>

                    <Route path="/grades/students">
                      <Route index element={<StudentGradesList />} />
                      <Route path="create" element={<StudentGradesCreate />} />
                      <Route path="edit/:id" element={<StudentGradesEdit />} />
                      <Route path="show/:id" element={<StudentGradesShow />} />
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

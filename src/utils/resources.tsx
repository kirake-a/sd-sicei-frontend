import { IResourceItem } from "@refinedev/core";

import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import GradingIcon from '@mui/icons-material/Grading';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SummarizeIcon from '@mui/icons-material/Summarize';

export const resources: IResourceItem[] = [  
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
        name: "grades-students",
        list: "/grades/students",
        create: "/grades/students/create",
        edit: "/grades/students/edit/:id",
        show: "/grades/students/show/:id",
        meta: {
            parent: "grades",
            canDelete: false,
            icon: <AssignmentIndIcon />,
            label: "Students",
        },
    },
    {
        name: "grades-subjects",
        list: "grades/subjects",
        create: "/grades/subjects/create",
        edit: "/grades/subjects/edit/:id",
        show: "/grades/subjects/show/:id",
        meta: {
            parent: "grades",
            canDelete: false,
            icon: <SummarizeIcon />,
            label: "Subjects",
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
        name: "reports-students",
        list: "/reports/students",
        create: "/reports/students/create",
        edit: "/reports/students/edit/:id",
        show: "/reports/students/show/:id",
        meta: {
            parent: "reports",
            canDelete: false,
            icon: <AssignmentIndIcon />,
            label: "Students",
        },
    },
    {
        name: "reports-subjects",
        list: "/reports/subjects",
        create: "/reports/subjects/create",
        edit: "/reports/subjects/edit/:id",
        show: "/reports/subjects/show/:id",
        meta: {
            parent: "reports",
            canDelete: false,
            icon: <SummarizeIcon />,
            label: "Subjects",
        },
    },
]
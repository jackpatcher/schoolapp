import AppAccessGuard from "@/components/AppAccessGuard";
import { appRoleAccess, type Role } from "@/shared/models/roles";
import HomeworkStudentApp from './student';
import HomeworkTeacherApp from './teacher';

const studentAccess = Object.keys(appRoleAccess).filter((role) => appRoleAccess[role as Role].includes('student')) as Role[];
const teacherAccess = Object.keys(appRoleAccess).filter((role) => appRoleAccess[role as Role].includes('teacher')) as Role[];

export const homeworkRoutes = [
  {
    path: '/app/homework/student',
    element: (
      <AppAccessGuard allowedRoles={studentAccess}>
        <HomeworkStudentApp />
      </AppAccessGuard>
    ),
  },
  {
    path: '/app/homework/teacher',
    element: (
      <AppAccessGuard allowedRoles={teacherAccess}>
        <HomeworkTeacherApp />
      </AppAccessGuard>
    ),
  },
];

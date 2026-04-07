import AppAccessGuard from "@/components/AppAccessGuard";
import { appRoleAccess, type Role } from "@/shared/models/roles";
import NoticeTeacherApp from './teacher';
import NoticeAdminApp from './admin';

const teacherAccess = Object.keys(appRoleAccess).filter((role) => appRoleAccess[role as Role].includes('teacher')) as Role[];
const adminAccess = Object.keys(appRoleAccess).filter((role) => appRoleAccess[role as Role].includes('admin')) as Role[];

export const noticeRoutes = [
  {
    path: '/app/notice/teacher',
    element: (
      <AppAccessGuard allowedRoles={teacherAccess}>
        <NoticeTeacherApp />
      </AppAccessGuard>
    ),
  },
  {
    path: '/app/notice/admin',
    element: (
      <AppAccessGuard allowedRoles={adminAccess}>
        <NoticeAdminApp />
      </AppAccessGuard>
    ),
  },
];

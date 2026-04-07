import AppAccessGuard from "@/components/AppAccessGuard";
import { appRoleAccess, type Role } from "@/shared/models/roles";
import SpotifyStudentApp from './student';
import SpotifyTeacherApp from './teacher';

const studentAccess = Object.keys(appRoleAccess).filter((role) => appRoleAccess[role as Role].includes('student')) as Role[];
const teacherAccess = Object.keys(appRoleAccess).filter((role) => appRoleAccess[role as Role].includes('teacher')) as Role[];

export const spotifyRoutes = [
  {
    path: '/app/spotify/student',
    element: (
      <AppAccessGuard allowedRoles={studentAccess}>
        <SpotifyStudentApp />
      </AppAccessGuard>
    ),
  },
  {
    path: '/app/spotify/teacher',
    element: (
      <AppAccessGuard allowedRoles={teacherAccess}>
        <SpotifyTeacherApp />
      </AppAccessGuard>
    ),
  },
];

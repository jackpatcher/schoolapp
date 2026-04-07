import { studentRoutes } from '../roles/student/routes';
import { teacherRoutes } from '../roles/teacher/routes';
import { parentRoutes } from '../roles/parent/routes';
import { adminRoutes } from '../roles/admin/routes';
import { executiveRoutes } from '../roles/executive/routes';
import { appRoutes } from '@/apps/routes';

export const routes = [
  ...studentRoutes,
  ...teacherRoutes,
  ...parentRoutes,
  ...adminRoutes,
  ...executiveRoutes,
  ...appRoutes,
];

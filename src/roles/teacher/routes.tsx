
import TeacherDashboard from './dashboard';
import TeacherTimetable from './timetable';
import TeacherLogin from './login';
import TeacherAppStore from './apps';

export const teacherRoutes = [
  {
    path: '/teacher/login',
    element: <TeacherLogin />,
  },
  {
    path: '/teacher/dashboard',
    element: <TeacherDashboard />,
  },
  {
    path: '/teacher/apps',
    element: <TeacherAppStore />,
  },
  {
    path: '/teacher/timetable',
    element: <TeacherTimetable />,
  },
];

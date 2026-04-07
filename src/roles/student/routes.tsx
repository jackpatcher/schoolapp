
import StudentDashboard from './dashboard';
import StudentTimetable from './timetable';
import StudentLogin from './login';
import StudentAppStore from './apps';

export const studentRoutes = [
  {
    path: '/student/login',
    element: <StudentLogin />,
  },
  {
    path: '/student/dashboard',
    element: <StudentDashboard />,
  },
  {
    path: '/student/apps',
    element: <StudentAppStore />,
  },
  {
    path: '/student/timetable',
    element: <StudentTimetable />,
  },
];

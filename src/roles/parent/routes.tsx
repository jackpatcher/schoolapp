
import ParentDashboard from './dashboard';
import ParentTimetable from './timetable';
import ParentLogin from './login';
import ParentAppStore from './apps';

export const parentRoutes = [
  {
    path: '/parent/login',
    element: <ParentLogin />,
  },
  {
    path: '/parent/dashboard',
    element: <ParentDashboard />,
  },
  {
    path: '/parent/apps',
    element: <ParentAppStore />,
  },
  {
    path: '/parent/timetable',
    element: <ParentTimetable />,
  },
];

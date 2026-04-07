
import ExecutiveDashboard from './dashboard';
import ExecutiveTimetable from './timetable';
import ExecutiveLogin from './login';
import ExecutiveAppStore from './apps';

export const executiveRoutes = [
  {
    path: '/executive/login',
    element: <ExecutiveLogin />,
  },
  {
    path: '/executive/dashboard',
    element: <ExecutiveDashboard />,
  },
  {
    path: '/executive/apps',
    element: <ExecutiveAppStore />,
  },
  {
    path: '/executive/timetable',
    element: <ExecutiveTimetable />,
  },
];

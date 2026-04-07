
import AdminDashboard from './dashboard';
import AdminTimetable from './timetable';
import AdminLogin from './login';
import AdminAppStore from './apps';

export const adminRoutes = [
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/apps',
    element: <AdminAppStore />,
  },
  {
    path: '/admin/timetable',
    element: <AdminTimetable />,
  },
];

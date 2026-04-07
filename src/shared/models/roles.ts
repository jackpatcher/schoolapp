export type Role = 'student' | 'teacher' | 'parent' | 'admin' | 'executive';

export const roleDashboardPath: Record<Role, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  parent: '/parent/dashboard',
  admin: '/admin/dashboard',
  executive: '/executive/dashboard',
};

export const roleAppsPath: Record<Role, string> = {
  student: '/student/apps',
  teacher: '/teacher/apps',
  parent: '/parent/apps',
  admin: '/admin/apps',
  executive: '/executive/apps',
};

// Access mapping for app mode switching.
// - student: ดูได้เฉพาะโหมด student
// - teacher: ดูได้ทั้ง student และ teacher
// - parent: ดูได้ทั้ง student และ parent
// - admin: ดูได้ทุกโหมด (ทุก role)
// - executive: ดูได้เฉพาะ executive เท่านั้น
export const appRoleAccess: Record<Role, Role[]> = {
  student: ['student'],
  teacher: ['student', 'teacher'],
  parent: ['student', 'parent'],
  admin: ['student', 'teacher', 'parent', 'admin', 'executive'],
  executive: ['executive'],
};

export const canAccessAppMode = (currentRole: Role, targetMode: Role) => {
  return appRoleAccess[currentRole]?.includes(targetMode) ?? false;
};

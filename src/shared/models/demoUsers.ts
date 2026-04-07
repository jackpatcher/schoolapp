import { Role } from './roles';

export interface DemoUser {
  username: string;
  password: string;
  name: string;
  role: Role;
}

export const demoUsers: DemoUser[] = [
  { username: 'student', password: 'pass123', name: 'Student User', role: 'student' },
  { username: 'teacher', password: 'pass123', name: 'Teacher User', role: 'teacher' },
  { username: 'parent', password: 'pass123', name: 'Parent User', role: 'parent' },
  { username: 'admin', password: 'pass123', name: 'Admin User', role: 'admin' },
  { username: 'executive', password: 'pass123', name: 'Executive User', role: 'executive' },
];

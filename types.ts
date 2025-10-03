export enum AttendanceStatus {
  Present = 'มาเรียน',
  Late = 'มาสาย',
  Leave = 'ลา',
  Absent = 'ขาด',
}

export enum UserRole {
  Instructor = 'instructor',
  Student = 'student',
}

export interface Student {
  id: string;
  name: string;
}

export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  students: Student[];
}

export interface Instructor {
  id: string;
  name: string;
}

export interface User {
    id: string;
    name: string;
    role: UserRole;
}

export interface Notification {
  id: string;
  courseId: string;
  message: string;
}
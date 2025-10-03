import { Course, Instructor, Student, AttendanceStatus, User, UserRole } from './types';

export const MOCK_INSTRUCTOR_USER: User = {
  id: 'T001',
  name: 'อ.นาราศักดิ์'
  role: UserRole.Instructor,
};

export const MOCK_STUDENT_USER: User = {
  id: '65002',
  name: 'นายฟอร์ดคนดีCS',
  role: UserRole.Student,
}

const STUDENTS_CS: Student[] = [
  { id: '65001', name: 'ไอปาล์มครั่งนี้พอเเล้ว' },
  { id: '65002', name: 'ไอต้าเด็กเสริฟ' },
  { id: '65003', name: 'ไอเจฟสายวิชาการ' },
  { id: '65004', name: 'ไอทรอยสายเมา' },
  { id: '65005', name: 'ไอฟลุ๊คสายดีด' },
  { id: '65006', name: 'ไอกานไปเลื่อย' },
  { id: '65007', name: 'ไอโอมมหาเทพผนึกมาร' },
  { id: '65008', name: 'เเพตทริคกู้โลก' },
  { id: '65009', name: 'นายปรีชา หาญกล้า' },
  { id: '65010', name: 'นางสาวพรทิพย์ ใจงาม' },
  { id: '65011', name: 'นายภานุพงศ์ ศิริชัย' },
  { id: '65012', name: 'นางสาวมยุรา จิตใส' },
];

const STUDENTS_IT: Student[] = [
    { id: '66101', name: 'นายยงยุทธ ทองดี' },
    { id: '66102', name: 'นางสาวรุ่งนภา ศรีเมือง' },
    { id: '66103', name: 'นายวรวุฒิ แก้วใส' },
    { id: '66104', name: 'นางสาวศิริพร คำดี' },
    { id: '66105', name: 'นายสมศักดิ์ มีชัย' },
    { id: '66106', name: 'นางสาวสุภาพร ชัยชนะ' },
    { id: '66107', name: 'นายอานนท์ บุญมา' },
];


export const MOCK_COURSES: Course[] = [
  {
    id: 'C101',
    code: 'CS101',
    name: 'แคลคูลัส',
    students: STUDENTS_CS,
  },
  {
    id: 'C102',
    code: 'CS321',
    name: 'การเขียนโปรเเกรมเชิงโครงสร้าง',
    students: STUDENTS_CS.slice(0, 8),
  },
  {
    id: 'C201',
    code: 'IT250',
    name: 'การประกอบคอม',
    students: STUDENTS_IT,
  },
  {
    id: 'C301',
    code: 'GE100',
    name: 'วิทยาการคอมพิวเตอร์เบื้องต้้น',
    students: [...STUDENTS_CS.slice(5, 10), ...STUDENTS_IT.slice(2, 6)],
  },
];

export const ATTENDANCE_STATUS_OPTIONS: AttendanceStatus[] = [
  AttendanceStatus.Present,
  AttendanceStatus.Late,
  AttendanceStatus.Leave,
  AttendanceStatus.Absent,
];

export const STATUS_COLORS: Record<AttendanceStatus, string> = {
  [AttendanceStatus.Present]: 'bg-green-100 text-green-800',
  [AttendanceStatus.Late]: 'bg-yellow-100 text-yellow-800',
  [AttendanceStatus.Leave]: 'bg-blue-100 text-blue-800',
  [AttendanceStatus.Absent]: 'bg-red-100 text-red-800',
};

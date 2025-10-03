import React, { useMemo } from 'react';
import { Course, AttendanceStatus } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { ATTENDANCE_STATUS_OPTIONS, STATUS_COLORS } from '../constants';

interface InstructorAttendanceHistoryPageProps {
  course: Course;
  onBack: () => void;
}

const generateMockHistory = (studentCount: number) => {
    const history = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) { // Generate 5 past sessions
        const date = new Date(today);
        date.setDate(today.getDate() - (i * 7)); // Go back 1 week for each session

        const absent = Math.floor(Math.random() * (studentCount * 0.15)); // max 15% absent
        const leave = Math.floor(Math.random() * (studentCount * 0.1)); // max 10% leave
        const late = Math.floor(Math.random() * (studentCount * 0.2)); // max 20% late
        const present = studentCount - absent - leave - late;

        history.push({
            date: date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'}),
            summary: {
                [AttendanceStatus.Present]: present,
                [AttendanceStatus.Late]: late,
                [AttendanceStatus.Leave]: leave,
                [AttendanceStatus.Absent]: absent,
            }
        });
    }
    return history;
}


const SessionHistoryCard: React.FC<{ session: ReturnType<typeof generateMockHistory>[0] }> = ({ session }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-5">
                <h3 className="text-md font-bold text-gray-800 mb-4">{session.date}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ATTENDANCE_STATUS_OPTIONS.map(status => (
                        <div key={status} className={`p-3 rounded-lg ${STATUS_COLORS[status]}`}>
                            <p className="font-bold text-xl">{session.summary[status]}</p>
                            <p className="text-xs font-medium">{status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const InstructorAttendanceHistoryPage: React.FC<InstructorAttendanceHistoryPageProps> = ({ course, onBack }) => {
  const mockHistory = useMemo(() => generateMockHistory(course.students.length), [course.students.length]);

  return (
    <div className="container mx-auto max-w-4xl">
      <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center">
        <ArrowLeftIcon />
        กลับไปหน้าหลัก
      </button>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">ประวัติการเช็คชื่อ</h1>
        <p className="text-gray-600 mt-1">{course.name} ({course.code})</p>
      </div>
      <div className="space-y-6">
        {mockHistory.map(session => (
          <SessionHistoryCard key={session.date} session={session} />
        ))}
      </div>
    </div>
  );
};

export default InstructorAttendanceHistoryPage;
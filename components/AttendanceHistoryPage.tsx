import React, { useMemo } from 'react';
import { Course, AttendanceStatus } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { ATTENDANCE_STATUS_OPTIONS, STATUS_COLORS } from '../constants';

interface AttendanceHistoryPageProps {
  courses: Course[];
  onBack: () => void;
}

const CourseHistoryCard: React.FC<{ course: Course }> = ({ course }) => {
    // Generate mock history data for demonstration
    const attendanceSummary = useMemo(() => {
        const totalClasses = 15; // Assume a 15-week semester
        const absent = Math.floor(Math.random() * 3); // 0-2
        const leave = Math.floor(Math.random() * 2); // 0-1
        const late = Math.floor(Math.random() * 4); // 0-3
        const present = totalClasses - absent - leave - late;

        return {
            [AttendanceStatus.Present]: present,
            [AttendanceStatus.Late]: late,
            [AttendanceStatus.Leave]: leave,
            [AttendanceStatus.Absent]: absent,
        };
    }, [course.id]);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{course.code}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ATTENDANCE_STATUS_OPTIONS.map(status => (
                        <div key={status} className={`p-3 rounded-lg ${STATUS_COLORS[status]}`}>
                            <p className="font-bold text-xl">{attendanceSummary[status]}</p>
                            <p className="text-xs font-medium">{status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const AttendanceHistoryPage: React.FC<AttendanceHistoryPageProps> = ({ courses, onBack }) => {
  return (
    <div className="container mx-auto max-w-4xl">
      <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center">
        <ArrowLeftIcon />
        กลับไปหน้าหลัก
      </button>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">ประวัติการมาเรียน</h1>
        <p className="text-gray-600 mt-1">สรุปการเข้าเรียนของคุณในแต่ละรายวิชา</p>
      </div>
      <div className="space-y-6">
        {courses.map(course => (
          <CourseHistoryCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default AttendanceHistoryPage;

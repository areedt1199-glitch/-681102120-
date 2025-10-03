
import React, { useState } from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';
import AttendanceSheet from './AttendanceSheet';
import InstructorAttendanceHistoryPage from './InstructorAttendanceHistoryPage';

interface DashboardPageProps {
  courses: Course[];
  onAddNotification: (courseId: string, message: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ courses, onAddNotification }) => {
  const [view, setView] = useState<'dashboard' | 'attendance' | 'history'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleTakeAttendance = (course: Course) => {
    setSelectedCourse(course);
    setView('attendance');
  };

  const handleViewHistory = (course: Course) => {
    setSelectedCourse(course);
    setView('history');
  };

  const handleBackToDashboard = () => {
    setSelectedCourse(null);
    setView('dashboard');
  };
  
  const handleSaveAttendance = () => {
    if (selectedCourse) {
      onAddNotification(selectedCourse.id, `การเช็คชื่อวิชา ${selectedCourse.code} ได้รับการบันทึกแล้ว`);
    }
  }

  if (view === 'attendance' && selectedCourse) {
    return <AttendanceSheet course={selectedCourse} onBack={handleBackToDashboard} onSave={handleSaveAttendance} />;
  }

  if (view === 'history' && selectedCourse) {
    return <InstructorAttendanceHistoryPage course={selectedCourse} onBack={handleBackToDashboard} />;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">รายวิชาของฉัน</h1>
        <p className="text-gray-600 mt-1">เลือกรายวิชาเพื่อเริ่มการเช็คชื่อ หรือดูประวัติ</p>
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onTakeAttendance={handleTakeAttendance}
              onViewHistory={handleViewHistory}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <img src="https://www.cpru.ac.th/img_n/logo-2.png" alt="CPRU Logo" className="w-20 h-20 mx-auto mb-6 text-gray-400 opacity-50"/>
            <h2 className="text-xl font-semibold text-gray-700">ไม่พบรายวิชา</h2>
            <p className="text-gray-500 mt-2">ยังไม่มีรายวิชาที่ถูกกำหนดให้กับคุณ</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
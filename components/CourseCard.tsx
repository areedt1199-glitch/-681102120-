
import React from 'react';
import { Course } from '../types';
import DocumentTextIcon from './icons/DocumentTextIcon';

interface CourseCardProps {
  course: Course;
  onTakeAttendance: (course: Course) => void;
  onViewHistory: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onTakeAttendance, onViewHistory }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4">
        <h2 className="text-lg font-bold text-white truncate">{course.name}</h2>
        <p className="text-sm text-indigo-100">{course.code}</p>
      </div>
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="flex items-center text-gray-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>{course.students.length} students</span>
        </div>
        <div className="flex items-center gap-x-2 mt-4">
          <button 
            onClick={() => onTakeAttendance(course)}
            className="flex-1 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center text-sm"
          >
            เช็คชื่อ
          </button>
           <button 
            onClick={() => onViewHistory(course)}
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-x-1.5 text-sm"
          >
            <DocumentTextIcon className="h-4 w-4" />
            ประวัติ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
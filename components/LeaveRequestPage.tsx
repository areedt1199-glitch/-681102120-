import React from 'react';
import { Course } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface LeaveRequestPageProps {
  courses: Course[];
  onBack: () => void;
}

const LeaveRequestPage: React.FC<LeaveRequestPageProps> = ({ courses, onBack }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('ส่งใบลาสำเร็จ! (This is a demo)');
        onBack();
    }
  return (
    <div className="container mx-auto max-w-2xl">
      <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center">
        <ArrowLeftIcon />
        กลับไปหน้าหลัก
      </button>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ยื่นใบลา / เอกสารประกอบ</h1>
        <p className="text-gray-600 mb-6">กรุณากรอกข้อมูลและแนบไฟล์เอกสารที่เกี่ยวข้อง เช่น ใบรับรองแพทย์</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="course" className="text-sm font-medium text-gray-700 block mb-2">
              เลือกรายวิชา
            </label>
            <select id="course" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200">
                {courses.map(course => <option key={course.id} value={course.id}>{course.code} - {course.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="reason" className="text-sm font-medium text-gray-700 block mb-2">
                เหตุผลการลา
            </label>
            <textarea id="reason" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" placeholder="เช่น ป่วย, กิจกรรมมหาวิทยาลัย..."></textarea>
          </div>
          <div>
            <label htmlFor="file-upload" className="text-sm font-medium text-gray-700 block mb-2">
              แนบไฟล์เอกสาร
            </label>
            <input type="file" id="file-upload" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out"
            >
              ส่งเอกสาร
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestPage;

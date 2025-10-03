
import React from 'react';
import { Instructor } from '../types';

interface HeaderProps {
  instructor: Instructor | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ instructor, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src="https://www.cpru.ac.th/img_n/logo-2.png" alt="CPRU Logo" className="h-10 w-10 mr-3"/>
            <h1 className="text-xl font-bold text-gray-800">ระบบเช็คชื่อเข้าเรียน</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-700">{instructor?.name}</p>
              <p className="text-xs text-gray-500">อาจารย์ผู้สอน</p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

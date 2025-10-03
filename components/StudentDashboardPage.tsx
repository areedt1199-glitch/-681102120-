import React, { useState } from 'react';
import { Course, User, Notification } from '../types';
import StudentHeader from './StudentHeader';
import FaceScanPage from './FaceScanPage';
import QRCodeScannerPage from './QRCodeScannerPage';
import LeaveRequestPage from './LeaveRequestPage';
import AttendanceHistoryPage from './AttendanceHistoryPage';
import CameraIcon from './icons/CameraIcon';
import QrCodeIcon from './icons/QrCodeIcon';
import DocumentPlusIcon from './icons/DocumentPlusIcon';
import ClockIcon from './icons/ClockIcon';


interface StudentDashboardPageProps {
  user: User;
  courses: Course[];
  onLogout: () => void;
  notifications: Notification[];
  onRemoveNotification: (id: string) => void;
}

type StudentView = 'dashboard' | 'face-scan' | 'qr-scan' | 'leave-request' | 'attendance-history';

const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({ user, courses, onLogout, notifications, onRemoveNotification }) => {
    const [view, setView] = useState<StudentView>('dashboard');

    const renderView = () => {
        switch(view) {
            case 'face-scan':
                return <FaceScanPage onBack={() => setView('dashboard')} />;
            case 'qr-scan':
                return <QRCodeScannerPage onBack={() => setView('dashboard')} />;
            case 'leave-request':
                return <LeaveRequestPage courses={courses} onBack={() => setView('dashboard')} />;
            case 'attendance-history':
                return <AttendanceHistoryPage courses={courses} onBack={() => setView('dashboard')} />;
            case 'dashboard':
            default:
                return <DashboardContent onNavigate={setView} />;
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <StudentHeader user={user} onLogout={onLogout} notifications={notifications} onRemoveNotification={onRemoveNotification} />
            <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
                {renderView()}
            </main>
        </div>
    );
};

const DashboardContent: React.FC<{onNavigate: (view: StudentView) => void}> = ({ onNavigate }) => (
    <div className="container mx-auto">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">ยินดีต้อนรับ</h1>
            <p className="text-gray-600 mt-1">เลือกเมนูการใช้งานสำหรับวันนี้</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <CheckInCard
                title="สแกนใบหน้าพร้อม Location"
                description="เช็คชื่อด้วยใบหน้าและตำแหน่งปัจจุบันของคุณ"
                icon={<CameraIcon />}
                onClick={() => onNavigate('face-scan')}
            />
            <CheckInCard
                title="สแกน QR Code"
                description="เช็คชื่อด้วย QR Code ที่อาจารย์แสดงในห้องเรียน"
                icon={<QrCodeIcon />}
                onClick={() => onNavigate('qr-scan')}
            />
            <CheckInCard
                title="ยื่นใบลา/เอกสาร"
                description="ส่งเอกสารประกอบการลา เช่น ใบรับรองแพทย์"
                icon={<DocumentPlusIcon />}
                onClick={() => onNavigate('leave-request')}
            />
             <CheckInCard
                title="ประวัติการมาเรียน"
                description="ดูสรุปสถิติการเข้าเรียนของคุณในแต่ละรายวิชา"
                icon={<ClockIcon />}
                onClick={() => onNavigate('attendance-history')}
            />
        </div>
    </div>
);

const CheckInCard: React.FC<{title: string, description: string, icon: React.ReactNode, onClick: () => void}> = ({ title, description, icon, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center p-8"
    >
      <div className="text-indigo-500 mb-4">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
);


export default StudentDashboardPage;
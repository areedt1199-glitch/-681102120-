
import React, { useState, useEffect, useMemo } from 'react';
import { Course, Student, AttendanceStatus, AttendanceRecord } from '../types';
import { ATTENDANCE_STATUS_OPTIONS, STATUS_COLORS } from '../constants';

interface AttendanceSheetProps {
  course: Course;
  onBack: () => void;
  onSave?: () => void;
}

const AttendanceStatusRadio: React.FC<{
  student: Student;
  status: AttendanceStatus;
  selectedValue: AttendanceStatus;
  onChange: (studentId: string, newStatus: AttendanceStatus) => void;
}> = ({ student, status, selectedValue, onChange }) => (
  <label className="flex items-center justify-center space-x-2 cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-gray-200">
    <input
      type="radio"
      name={`attendance-${student.id}`}
      value={status}
      checked={selectedValue === status}
      onChange={() => onChange(student.id, status)}
      className="form-radio h-4 w-4 text-indigo-600"
    />
  </label>
);


const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ course, onBack, onSave }) => {
  const [attendance, setAttendance] = useState<Map<string, AttendanceStatus>>(new Map());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const initialAttendance = new Map<string, AttendanceStatus>();
    course.students.forEach(student => {
      initialAttendance.set(student.id, AttendanceStatus.Present);
    });
    setAttendance(initialAttendance);
  }, [course]);

  const handleAttendanceChange = (studentId: string, newStatus: AttendanceStatus) => {
    setAttendance(prev => new Map(prev).set(studentId, newStatus));
    setIsSaved(false);
  };
  
  const attendanceSummary = useMemo(() => {
      const summary = {
          [AttendanceStatus.Present]: 0,
          [AttendanceStatus.Late]: 0,
          [AttendanceStatus.Leave]: 0,
          [AttendanceStatus.Absent]: 0,
      };
      for (const status of attendance.values()) {
          summary[status]++;
      }
      return summary;
  }, [attendance]);

  const handleSave = () => {
    console.log('Saving attendance:', Array.from(attendance.entries()));
    setIsSaved(true);
    onSave?.();
    setTimeout(() => setIsSaved(false), 3000); // Reset save confirmation after 3s
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            กลับไปหน้าหลัก
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
          <p className="text-gray-600 mt-1">{course.code} - วันที่ {new Date().toLocaleDateString('th-TH')}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center ${isSaved ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isSaved ? (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                 บันทึกแล้ว
                </>
            ) : 'บันทึกการเช็คชื่อ'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {ATTENDANCE_STATUS_OPTIONS.map(status => (
          <div key={status} className={`p-4 rounded-lg shadow ${STATUS_COLORS[status].replace('text-', 'border-').replace('bg-', 'bg-opacity-25 border-2 ')}`}>
            <p className="font-bold text-2xl">{attendanceSummary[status]}</p>
            <p className="text-sm font-medium">{status}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                    <th scope="col" className="px-6 py-3 w-16 text-center">ลำดับ</th>
                    <th scope="col" className="px-6 py-3">รหัสนักศึกษา</th>
                    <th scope="col" className="px-6 py-3">ชื่อ-สกุล</th>
                    {ATTENDANCE_STATUS_OPTIONS.map(status => (
                        <th key={status} scope="col" className="px-2 py-3 text-center w-20">{status}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {course.students.map((student, index) => (
                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 font-mono">{student.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{student.name}</td>
                    {ATTENDANCE_STATUS_OPTIONS.map(status => (
                        <td key={status} className="px-2 py-2 text-center">
                            <AttendanceStatusRadio
                                student={student}
                                status={status}
                                selectedValue={attendance.get(student.id) || AttendanceStatus.Present}
                                onChange={handleAttendanceChange}
                            />
                        </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;
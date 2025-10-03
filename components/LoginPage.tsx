import React, { useState } from 'react';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';
import { User, UserRole } from '../types';
import { MOCK_INSTRUCTOR_USER, MOCK_STUDENT_USER } from '../constants';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [regStudentId, setRegStudentId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('กรุณากรอกอีเมล หรือ รหัสนักศึกษา');
      return;
    }
    setLoginError('');
    // Simple logic to differentiate login type for the demo
    if (loginEmail.includes('@')) {
      onLogin(MOCK_INSTRUCTOR_USER);
    } else {
      onLogin(MOCK_STUDENT_USER);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('รหัสผ่านไม่ตรงกัน');
      return;
    }
    setErrorMessage('');
    // In a real app, you would handle registration API call here.
    alert('ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ');
    setIsRegistering(false);
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div id="auth-container" className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <img src="https://www.cpru.ac.th/img_n/logo-2.png" alt="CPRU Logo" className="w-24 h-24 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-gray-800">มหาวิทยาลัยราชภัฏชัยภูมิ</h1>
          <p className="text-gray-600">ระบบเช็คชื่อเข้าเรียน</p>
        </div>
        
        {!isRegistering ? (
            <div id="login-form">
                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="login-email" className="text-sm font-medium text-gray-700 block mb-2">
                    อีเมล หรือ รหัสนักศึกษา
                    </label>
                    <input
                    type="text"
                    id="login-email"
                    value={loginEmail}
                    onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (loginError) setLoginError('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="student.id or teacher@cpru.ac.th"
                    required
                    />
                    {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
                </div>
                <div className="relative">
                    <label
                    htmlFor="login-password"
                    className="text-sm font-medium text-gray-700 block mb-2"
                    >
                    รหัสผ่าน
                    </label>
                    <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="login-password"
                    defaultValue="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="••••••••"
                    required
                    />
                    <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label="Toggle password visibility"
                    >
                    {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                </div>
                <div>
                    <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out"
                    >
                    ลงชื่อเข้าใช้
                    </button>
                </div>
                </form>
                <div className="text-center mt-6">
                    <button onClick={() => setIsRegistering(true)} id="show-register" className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
                        ยังไม่มีบัญชี? ลงทะเบียน
                    </button>
                </div>
            </div>
        ) : (
            <div id="register-form">
                <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                     <div>
                        <label htmlFor="reg-student-id" className="text-sm font-medium text-gray-700 block mb-2">
                            รหัสนักศึกษา
                        </label>
                        <input
                            type="text"
                            id="reg-student-id"
                            value={regStudentId}
                            onChange={e => setRegStudentId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            placeholder="รหัสนักศึกษา"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-password"
                            className="text-sm font-medium text-gray-700 block mb-2">
                            รหัสผ่าน
                        </label>
                        <input
                            type="password"
                            id="reg-password"
                            value={regPassword}
                            onChange={e => setRegPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="reg-confirm-password"
                            className="text-sm font-medium text-gray-700 block mb-2">
                           ยืนยันรหัสผ่าน
                        </label>
                        <input
                            type="password"
                            id="reg-confirm-password"
                            value={regConfirmPassword}
                            onChange={e => setRegConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {errorMessage && <p id="error-message" className="text-red-500 text-sm text-center">{errorMessage}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out"
                        >
                            ลงทะเบียน
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <button onClick={() => setIsRegistering(false)} id="show-login" className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
                       มีบัญชีอยู่แล้ว? กลับไปหน้าเข้าสู่ระบบ
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
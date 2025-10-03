import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import Header from './components/Header';
import StudentDashboardPage from './components/StudentDashboardPage';
import { Course, User, UserRole, Notification } from './types';
import { MOCK_COURSES } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.Instructor) {
      setCourses(MOCK_COURSES);
    } else if (user.role === UserRole.Student) {
      const studentCourses = MOCK_COURSES.filter(course =>
        course.students.some(s => s.id === user.id)
      );
      setCourses(studentCourses);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCourses([]);
    setNotifications([]);
  };

  const handleAddNotification = (courseId: string, message: string) => {
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random()}`,
      courseId,
      message,
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const handleRemoveNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };


  const renderContent = () => {
    if (!currentUser) {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentUser.role) {
      case UserRole.Instructor:
        return (
          <div className="flex flex-col h-screen">
            <Header instructor={currentUser} onLogout={handleLogout} />
            <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
              <DashboardPage courses={courses} onAddNotification={handleAddNotification} />
            </main>
          </div>
        );
      case UserRole.Student:
        const studentCourseIds = new Set(courses.map(c => c.id));
        const studentNotifications = notifications.filter(n => studentCourseIds.has(n.courseId));
        return <StudentDashboardPage 
                  user={currentUser} 
                  courses={courses} 
                  onLogout={handleLogout}
                  notifications={studentNotifications}
                  onRemoveNotification={handleRemoveNotification} 
                />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {renderContent()}
    </div>
  );
};

export default App;
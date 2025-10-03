import React, { useState, useRef, useEffect } from 'react';
import { Notification } from '../types';
import BellIcon from './icons/BellIcon';
import XMarkIcon from './icons/XMarkIcon';

interface NotificationBellProps {
    notifications: Notification[];
    onRemoveNotification: (id: string) => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications, onRemoveNotification }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Toggle notifications"
            >
                <BellIcon />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 sm:w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="px-4 py-2 border-b">
                            <p className="text-sm font-semibold text-gray-800">การแจ้งเตือน</
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div key={notification.id} className="flex items-start justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                                    <p className="flex-1 pr-2">{notification.message}</p>
                                    <button onClick={() => onRemoveNotification(notification.id)} className="text-gray-400 hover:text-gray-600">
                                        <XMarkIcon />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-center text-gray-500">
                                <p>ไม่มีการแจ้งเตือนใหม่</p>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;

import React, { useState, useEffect, useRef } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface FaceScanPageProps {
  onBack: () => void;
}

const FaceScanPage: React.FC<FaceScanPageProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('scanning');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCameraAndLocation = async () => {
        try {
            // Get camera stream
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            // Get location
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { latitude, longitude } = pos.coords;
                    setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
                },
                () => {
                    setError("ไม่สามารถเข้าถึงตำแหน่งได้ กรุณาเปิด GPS");
                    setStatus('error');
                },
                { enableHighAccuracy: true }
            );
        } catch (err) {
            console.error("Error accessing media devices.", err);
            setError("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการเข้าถึง");
            setStatus('error');
        }
    };
    
    startCameraAndLocation();

    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const handleCapture = () => {
      if(location && !error) {
        setStatus('success');
      } else {
        setError("ยังไม่ได้รับตำแหน่ง กรุณารอสักครู่หรือตรวจสอบการตั้งค่า")
        setStatus('error');
      }
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center">
        <ArrowLeftIcon />
        กลับไปหน้าหลัก
      </button>
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">สแกนใบหน้าพร้อม Location</h1>
        <p className="text-gray-600 mb-6">จัดใบหน้าของคุณให้อยู่ในกรอบและกดปุ่มเพื่อเช็คชื่อ</p>

        <div className="relative w-full aspect-square max-w-sm mx-auto bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-gray-300">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scaleX-[-1]"></video>
        </div>

        {status === 'error' && <p className="text-red-600 font-semibold my-4">{error}</p>}
        {status === 'success' && <p className="text-green-600 font-semibold my-4">เช็คชื่อสำเร็จ!</p>}
        {location && <p className="text-sm text-gray-500 mb-4">ตำแหน่งปัจจุบัน: {location}</p>}

        <button 
            onClick={handleCapture}
            disabled={status === 'success'}
            className="w-full max-w-sm bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out disabled:bg-gray-400"
        >
            {status === 'success' ? 'สำเร็จแล้ว' : 'ยืนยันการเช็คชื่อ'}
        </button>
      </div>
    </div>
  );
};

export default FaceScanPage;

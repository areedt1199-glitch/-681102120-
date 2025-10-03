import React, { useEffect, useRef, useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface QRCodeScannerPageProps {
  onBack: () => void;
}

const QRCodeScannerPage: React.FC<QRCodeScannerPageProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing media devices.", err);
            setError("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการเข้าถึง");
        }
    };
    
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="container mx-auto max-w-2xl">
      <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center">
        <ArrowLeftIcon />
        กลับไปหน้าหลัก
      </button>
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">สแกน QR Code</h1>
        <p className="text-gray-600 mb-6">สแกน QR Code ที่แสดงในห้องเรียนเพื่อเช็คชื่อ</p>

        <div className="relative w-full aspect-video max-w-sm mx-auto bg-gray-200 rounded-lg overflow-hidden mb-4 border-4 border-gray-300">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
            {error && <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"><p className="text-white text-center p-4">{error}</p></div>}
        </div>
        <p className="text-sm text-gray-500">กำลังค้นหา QR Code...</p>
        <p className="text-xs text-gray-400 mt-4">(This is a placeholder for QR code scanning functionality)</p>
      </div>
    </div>
  );
};

export default QRCodeScannerPage;

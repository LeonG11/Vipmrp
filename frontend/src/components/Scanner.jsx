import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const Scanner = ({ onScan, onClose }) => {
  const scannerRef = useRef(null);
  // Используем ref для хранения статуса инициализации, чтобы избежать повторного запуска
  const isStarted = useRef(false);

  useEffect(() => {
    const scannerId = "reader";
    const html5QrCode = new Html5Qrcode(scannerId);
    scannerRef.current = html5QrCode;

    const start = async () => {
      // Если уже запущен или компонент размонтирован — ничего не делаем
      if (isStarted.current) return;
      
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (text) => {
            // При успешном сканировании
            if (isStarted.current) {
              isStarted.current = false;
              html5QrCode.stop().then(() => onScan(text));
            }
          }
        );
        isStarted.current = true;
      } catch (e) {
        console.error("Ошибка старта камеры:", e);
      }
    };

    start();

    return () => {
      // Очистка при размонтировании
      isStarted.current = false;
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          scannerRef.current.stop()
            .then(() => scannerRef.current.clear())
            .catch(e => console.warn("Cleanup error:", e));
        } else {
          // На случай если камера еще не успела стартовать, а компонент уже закрыли
          scannerRef.current.clear();
        }
      }
    };
  }, [onScan]); // Зависимость от onScan если она меняется

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      {/* Твоя верстка остается без изменений */}
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-md relative border border-slate-700">
        <button onClick={onClose} className="absolute -top-12 right-0 text-white bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center">×</button>
        <h2 className="text-lg font-semibold mb-4 text-center text-white">Сканер штрих-кодов</h2>
        <div id="reader" className="overflow-hidden rounded-xl bg-black min-h-[250px]"></div>
      </div>
    </div>
  );
};

export default Scanner;


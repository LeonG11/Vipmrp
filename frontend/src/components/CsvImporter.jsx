import React, { useRef } from 'react';
import { parseAndImportCsv } from '../api';

export default function CsvImporter({ onImported }) {
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await parseAndImportCsv(file);
      alert(`Успешно! Загружено деталей: ${result.count}`);
      if (onImported) onImported(); // Обновляем список деталей на странице
    } catch (err) {
      alert("Ошибка импорта: " + err);
    } finally {
      // Очищаем инпут, чтобы можно было загрузить тот же файл повторно
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-3xl p-6 mb-8 flex flex-col items-center justify-center transition-all hover:border-blue-500/50">
      <h3 className="text-white font-bold mb-2">Импорт заказа из Базиса</h3>
      <p className="text-slate-400 text-sm mb-4">Выберите .csv файл для массовой загрузки</p>
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleUpload} 
        accept=".csv" 
        className="hidden" 
        id="csv-upload"
      />
      
      <label 
        htmlFor="csv-upload"
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl cursor-pointer transition-all shadow-lg active:scale-95"
      >
        ВЫБРАТЬ ФАЙЛ
      </label>
    </div>
  );
}


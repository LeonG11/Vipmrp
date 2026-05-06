import React, { useRef } from "react";
import { parseAndImportCsv } from "../api";

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
      alert(`Ошибка импорта: ${err}`);
    } finally {
      // Очищаем инпут, чтобы можно было загрузить тот же файл повторно
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        className="hidden"
        id="csv-upload"
      />
      <label
        htmlFor="csv-upload"
        className="h-9 md:h-10 px-4 md:px-6 bg-state-800 hover:bg-state-700 text white rounded-lg md:rounded-xl cursor-pointer transition-all border boder-slate-700 flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold shadow-sm"
      >
        <span className="text-blue-400 text-sm">📁</span>
        <span className="hidden lg:inline">ИМПОРТ БАЗИС</span>
        <span className="lg:hidden">ИМПОРТ</span>
      </label>
    </div>
  );
}

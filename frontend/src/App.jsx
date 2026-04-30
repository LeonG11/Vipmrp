import { useState, useEffect } from 'react';
import * as api from './api';
import PartsTable from './components/PartsTable';
import Scanner from './components/Scanner';
import CsvImporter from './components/CsvImporter';

function App() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null); // Добавили стейт
  const [parts, setParts] = useState([]);


  const loadData = async () => {
      try{
          const res = await api.getAllParts();
          setParts(res.data || []);
      }catch(e){
          console.error(e);
      }
  };

  useEffect(()=>{
      loadData();
  }, []);

  const handleScan = async (id) => {
    try {
      const res = await api.getPart(id);

      if (res.data) {
        setIsScannerOpen(false);
        setSelectedPart(res.data); // Теперь стейт существует
        alert(`Деталь ${res.data.name || id} найдена!`); // res.data обычно объект, выводим поле name
      } 
    } catch (err) {
        alert(`Деталь ${id} не найдена`);
        setIsScannerOpen(false); // Закрываем, чтобы не зациклиться на ошибке
    }
  };

  const handleDelete = async (id) => {
      if(window.confirm("Удалить эту панель?")){
          await api.deletePart(id);
          loadData();
      }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-12 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">VIPLIGHT <span className="text-blue-500">MRP</span></h1>
        <button 
          onClick={() => setIsScannerOpen(true)} 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>📷</span> Сканировать QR
        </button>
        <CsvImporter onImported={loadData} />
      </header>

      <main className="w-full max-w-4xl space-y-8">
        {isScannerOpen && (
          <Scanner 
            onScan={handleScan} 
            onClose={() => setIsScannerOpen(false)} 
          />
        )}
      
        {selectedPart && (
          <div className="bg-blue-900/30 border border-blue-500 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-sm text-blue-400">Текущий выбор:</p>
              <p className="font-bold">{selectedPart.name} ({selectedPart.order_id})</p>
            </div>
            <button onClick={() => setSelectedPart(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        <PartForm onCreated={loadData} />
        <PartsTable parts={parts} onRefresh={loadData} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;


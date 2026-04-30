import { useState } from 'react';
import { createPart } from '../api';

export default function PartForm({ onCreated }) {
  const [formData, setFormData] = useState({ id: '', name: '', order_no: '', material: '', status: 'Склад' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPart(formData);
      setFormData({ id: '', name: '', order_no: '', material: '', status: 'Склад' });
      onCreated(); // Вызываем обновление списка в родителе
    } catch (err) { alert("Ошибка при создании"); }
  };

  return (
    <section className="bg-slate-800/80 rounded-3xl border border-slate-700 p-8 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-6">Регистрация новой панели</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input 
          placeholder="ID" className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
          value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} required 
        />
        <input 
          placeholder="Название" className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required 
        />
        <input 
          placeholder="Заказ" className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
          value={formData.order_no} onChange={e => setFormData({...formData, order_no: e.target.value})} required 
        />
        <input 
          placeholder="Материал" className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
          value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} required 
        />
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">ДОБАВИТЬ</button>
      </form>
    </section>
  );
}


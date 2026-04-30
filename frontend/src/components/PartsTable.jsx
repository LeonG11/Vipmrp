export default function PartsTable({ parts, onRefresh, onDelete }) {
  return (
    <section className="bg-slate-800/50 rounded-3xl border border-slate-700 p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white text-[10px] uppercase tracking-widest">Текущее состояние производства</h3>
        <button onClick={onRefresh} className="text-xs text-blue-500 font-bold uppercase">Обновить ↻</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-500 text-[10px] uppercase border-b border-slate-700">
            <th className="pb-4">ID</th>
            <th className="pb-4">Наименование</th>
            <th className="pb-4">Материал</th>
            <th className="pb-4">Статус</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {parts.map(p => (
            <tr key={p.id} className="hover:bg-white/5 transition-colors">
              <td className="py-4 font-mono text-blue-400 text-xs">{p.id}</td>
              <td className="py-4 font-bold text-sm">{p.name}</td>
              <td className="py-4 text-slate-400 text-xs">{p.material}</td>
              <td className="py-4">
                <span className="px-2 py-1 rounded text-[9px] font-black uppercase border border-slate-600 text-slate-400">{p.status}</span>
              </td>
              <td>
                <button onClick={() => onDelete(p.id)} className="text-red-500 hover:text-red-400 text-xs font-bold">x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}


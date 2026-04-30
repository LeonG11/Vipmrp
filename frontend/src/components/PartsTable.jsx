export default function PartsTable({ parts, onRefresh, onDelete }) {
  return (
    <section className="bg-slate-800/50 rounded-3xl border border-slate-700 p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white text-[10px] uppercase tracking-widest">Цех: Поток деталей</h3>
        <button onClick={onRefresh} className="text-xs text-blue-500 font-bold uppercase">Обновить ↻</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 text-[10px] uppercase border-b border-slate-700">
              <th className="pb-4">Заказ / ID</th>
              <th className="pb-4">Деталь</th>
              <th className="pb-4">Размеры (L x W)</th>
              <th className="pb-4">Статус</th>
              <th className="pb-4">Действие</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {parts.map(p => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4">
                   <div className="font-mono text-blue-400 text-xs">{p.id}</div>
                   <div className="text-[10px] text-slate-500">{p.order_no}</div>
                   <div className="text-[10px] text-slate-500">{p.destignation}</div>
                </td>
                <td className="py-4">
                  <div className="font-bold text-sm text-white">{p.name}</div>
                  <div className="text-[10px] text-slate-500">{p.material}</div>
                </td>
                <td className="py-4 font-mono text-emerald-400 text-sm">
                  {p.length} × {p.width} <span className="text-[10px] text-slate-600">x{p.quantity}</span>
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 rounded text-[9px] font-black uppercase border border-emerald-500/50 text-emerald-500 bg-emerald-500/10">
                    {p.status}
                  </span>
                </td>
                <td className="py-4">
                  <button onClick={() => onDelete(p.id)} className="hover:scale-125 transition-transform text-red-500">
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


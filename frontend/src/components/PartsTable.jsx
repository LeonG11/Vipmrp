import { useNavigate } from "react-router-dom";

export default function PartsTable({ parts, onRefresh, onDelete }) {
  const navigate = useNavigate();
  return (
    <section className="bg-[#0f172a]/60 rounded-[2rem] border border-slate-800 p-4 md:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex justify-between items-center mb-10 px-2">
        <div className="space-y-1">
          <h3 className="text-white text-[12px] font-black uppercase tracking-[0.3em] opacity-90">
            Цех: поток деталей
          </h3>
          <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
        </div>
        <button
          onClick={onRefresh}
          className="text-[11px] text-blue-400 font-black uppercase flex items-center gap-2 hover:text-blue-300 transition-all bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20"
        >
          Обновить <span className="text-lg">↻</span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {parts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/part/${p.id}`)}
            className="group relative bg-slate-900/40 border border-slate-800/50 rounded-[1.5rem] p-6 hover:bg-slate-800/40 transition-all cursor-pointer hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)]"
          >
            {/* Верхняя строка: ID и Номер заказа */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-blue-500 text-sm font-black bg-blue-500/10 px-2 py-0.5 rounded">
                  {p.id}
                </span>
                <div className="text-[13px] text-slate-300 font-bold tracking-tight">
                  {p.order_no}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(p.id);
                }}
                className="text-slate-600 hover:text-red-500 transition-colors p-1"
              >
                ✕
              </button>
            </div>

            {/* Название и Материал */}
            <div className="mb-6">
              <h4 className="text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {p.name}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed max-w-[90%]">
                {p.material}
              </p>
            </div>

            {/* Блок Размеров */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800/50 mb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Готовая</p>
                <p className="text-2xl font-black text-white">
                  {p.length} <span className="text-slate-600 text-xs font-normal">×</span> {p.width}
                </p>
              </div>
              <div className="space-y-1 border-l border-slate-800/50 pl-4">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Заготовка</p>
                <p className="text-lg font-bold text-slate-400 italic">
                  {p.length_first} × {p.width_first}
                </p>
              </div>
            </div>

            {/* Нижняя строка: Кол-во и Статус */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase font-black">Кол-во</span>
                  <span className="text-xl font-black text-white">{p.quantity}</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-800"></div>
                <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_10px_20px_rgba(16,185,129,0.05)]">
                  {p.status}
                </div>
              </div>
              
              <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest group-hover:text-blue-500/50">
                Детали →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

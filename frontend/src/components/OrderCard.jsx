export default function OrderCard({ order, isSelected, onClick, partsCount }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20" : "border-slate-800 bg-slate-800 bg-slate-900/50 hover:border-slate-600"}`}
    >
      <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">
        Заказ
      </div>
      <div className="text-lg font-black text-white truncate">
        #{order.order_no}
      </div>
      <div className="text-[10px] text-blue-400 mt-4 font-mono">
        {partsCount} панелей
      </div>
    </div>
  );
}

import CsvImporter from "./CsvImporter";
import { useNavigate } from "react-router-dom";

export default function Header({ onRefresh, onOpenScanner }) {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-black text-white tracking-tighter">
            VIPLIGHT <span className="text-blue-500">MRP</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <CsvImporter onImported={onRefresh} />
          </div>
          <button
            onClick={() => navigate("/add")}
            className="hidden md:flex h-10 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs items-center gap-2"
          >
            <span>+</span> НОВАЯ ПАНЕЛЬ
          </button>
          <button
            onClick={onOpenScanner}
            className="h-9 px-4 md:h-10 md:px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg md:rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <span>📷</span> СКАНЕР
          </button>
        </div>
      </div>
    </header>
  );
}

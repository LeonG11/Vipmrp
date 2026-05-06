import { useNavigate } from "react-router-dom";
import PartForm from "../components/PartForm";

export default function AddPartPage() {
  const navigate = useNavigate();

  const handleAfterCreate = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <button 
          onClick={() => navigate("/")}
          className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          Вернуться в поток
        </button>

        <div className="mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            Новая <span className="text-blue-500">Панель</span>
          </h2>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">
            Ручной ввод данных в систему MRP
          </p>
        </div>

        <div className="shadow-2xl shadow-blue-900/10">
          <PartForm onCreated={handleAfterCreate} />
        </div>

        <p className="mt-8 text-center text-slate-600 text-[10px] uppercase tracking-widest leading-loose">
          После нажатия кнопки "Добавить" деталь мгновенно <br /> 
          появится в общем списке на главной панели.
        </p>
      </div>
    </div>
  );
}

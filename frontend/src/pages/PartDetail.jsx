import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../api";

export default function PartDetail() {
  const { id } = useParams(); // Получаем ID из URL /part/:id
  const navigate = useNavigate();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getPart(id);
        setPart(res.data);
      } catch (err) {
        console.error("Ошибка загрузки детали:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-white animate-pulse">Загрузка данных...</div>
    );
  if (!part)
    return (
      <div className="p-10 text-white">
        Деталь не найдена :( <span></span>
        <button onClick={() => navigate("/")}>Назад</button>
      </div>
    );
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Кнопка назад */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors uppercase text-sm font-black"
        >
          ← Вернуться в список
        </button>

        <div className="bg-slate-800/50 border border-slate-700 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex flex-col">
              <InterDate
                label="Заказ"
                state={part.order_no}
                color="text-white"
              />
              <InterDate
                label="Обозначение"
                state={part.designation}
                color="text-slate-500"
              />
              <InterDate
                label="Название"
                state={part.name}
                color="text-slate-500"
              />
              <InterDate
                label="Изделие"
                state={part.product_name}
                color="text-slate-500"
              />
              <InterDate
                label="Материал"
                state={part.material}
                color="text-slate-500"
              />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/50 px-6 py-2 rounded-2xl">
              <p className="text-[10px] text-blue-500 uppercase font-black">
                Текущее состояние
              </p>
              <p className="text-base font-bold text-white uppercase ">
                {part.status}
              </p>
            </div>
          </header>

          {/* Основная сетка параметров (L, W, T) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <DataBox
              label="Длина готовая (заготовка)(L)"
              value={`${part.length} (${part.length_first})`}
              sub="мм"
              color="blue"
            />
            <DataBox
              label="Ширина готовая (заготовка)(W)"
              value={`${part.width} (${part.width_first})`}
              sub="мм"
              color="blue"
            />
            <DataBox
              label="Толщина"
              value={part.thickness}
              sub="мм"
              color="slate"
            />
          </div>

          {/* Секция Кромки (L1, L2, W1, W2) */}
          <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-700/50">
            <h3 className="text-[10px] text-slate-500 uppercase font-black mb-4 tracking-widest">
              Облицовка кромок
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <EdgeBox label="L1" value={part.edge_l1} />
              <EdgeBox label="L2" value={part.edge_l2} />
              <EdgeBox label="W1" value={part.edge_w1} />
              <EdgeBox label="W2" value={part.edge_w2} />
            </div>
          </div>

          {/* Доп. информация */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/30 p-6 rounded-3xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase mb-2">
                Примечание
              </p>
              <p className="text-sm italic">{part.note || "Нет"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Мини-компоненты для верстки
const DataBox = ({ label, value, sub, color }) => (
  <div
    className={`p-3 rounded-2xl border ${color === "blue" ? "bg-blue-500/5 border-blue-500/20" : "bg-slate-700/10 border-slate-700"}`}
  >
    <p className="text-[10px] text-slate-500 uppercase m-1 font-bold">
      {label}
    </p>
    <p className="text-2xl font-mono font-black text-white">
      {value}
      <span className="text-sm font-normal text-slate-600 ml-1 ">{sub}</span>
    </p>
  </div>
);

const InterDate = ({ label, state, color }) => (
  <div
    className={`text-base font-black  ${color} tracking-tighter flex flex-row`}
  >
    {label}
    {": "} <div className="font-medium ml-1">{state}</div>
  </div>
);

const EdgeBox = ({ label, value }) => (
  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
    <p className="text-[9px] text-slate-500 uppercase mb-1">{label}</p>
    <p className="text-xs font-bold text-slate-300 truncate">{value || "—"}</p>
  </div>
);

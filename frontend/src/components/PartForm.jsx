import { useState } from "react";
import { createPart } from "../api";

export default function PartForm({ onCreated }) {
  const initialState = {
    designation: "",
    order_no: "",
    material: "",
    length: 0,
    width: 0,
    length_first: 0,
    width_first: 0,
    thickness: 0,
    quantity: 1,
    product_name: "",
    status: "Создан",
    name: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Преобразуем числовые поля, чтобы Go не ругался
      const dataToSend = {
        ...formData,
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        length_first: parseFloat(formData.length_first),
        width_first: parseFloat(formData.width_first),
        thickness: parseFloat(formData.thickness),
        quantity: parseInt(formData.quantity),
      };
      await createPart(dataToSend);
      setFormData(initialState);
      onCreated();
    } catch (err) {
      alert("Ошибка: " + err.response?.data?.error);
    }
  };

  return (
    <section className="bg-slate-800/80 rounded-3xl border border-slate-700 p-8 shadow-xl mb-8">
      <h3 className="text-lg font-bold text-white mb-6">
        Регистрация новой панели
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          placeholder="Заказ №"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          value={formData.order_no}
          onChange={(e) =>
            setFormData({ ...formData, order_no: e.target.value })
          }
          required
        />
        <input
          placeholder="Обозначение"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          value={formData.designation}
          onChange={(e) =>
            setFormData({ ...formData, designation: e.target.value })
          }
          required
        />
        <input
          placeholder="Наименование"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          placeholder="Изделие"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          value={formData.product_name}
          onChange={(e) =>
            setFormData({ ...formData, product_name: e.target.value })
          }
          required
        />
        <input
          placeholder="Материал"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          value={formData.material}
          onChange={(e) =>
            setFormData({ ...formData, material: e.target.value })
          }
          required
        />

        {/* Числовые поля */}
        <input
          type="number"
          placeholder="L (Длина)"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          onChange={(e) => setFormData({ ...formData, length: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="W (Ширина)"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          onChange={(e) => setFormData({ ...formData, width: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="L (Длина заготовки)"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          onChange={(e) =>
            setFormData({ ...formData, length_first: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="W (Ширина заготовки)"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          onChange={(e) =>
            setFormData({ ...formData, width_first: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Толщина"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          value={formData.thickness}
          onChange={(e) =>
            setFormData({ ...formData, thickness: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Кол-во"
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
        >
          ДОБАВИТЬ
        </button>
      </form>
    </section>
  );
}

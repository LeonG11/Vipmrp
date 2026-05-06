import { useState, useEffect } from "react";
import * as api from "../api"; // Импортируем все функции из api/index.js
import PartsTable from "../components/PartsTable";
import Scanner from "../components/Scanner";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";

export default function Dashboard() {
  // --- СОСТОЯНИЕ (Память компонента) ---
  const [parts, setParts] = useState([]); // Список всех панелей
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Открыта ли камера
  const navigate = useNavigate();

  // --- ЛОГИКА (Функции-курьеры) ---

  // Загрузка данных с бэкенда
  const loadData = async () => {
    try {
      const [partsRes, ordersRes] = await Promise.all([
        api.getAllParts(),
        api.getAllOrders(),
      ]);
      setParts(partsRes.data || []);
      setOrders(ordersRes.data || []);
    } catch (e) {
      console.error("Ошибка при получении данных:", e);
    }
  };

  // Выполняется один раз при открытии страницы
  useEffect(() => {
    loadData();
  }, []);

  const filteredParts = selectedOrder
    ? parts.filter((p) => String(p.order_no) === String(selectedOrder))
    : parts;

  // Что делать, когда сканер распознал ID
  const handleScan = (id) => {
    setIsScannerOpen(false);
    // Просто переходим на страницу детали
    window.location.href = `/part/${id}`;
  };

  // Удаление панели
  const handleDelete = async (id) => {
    if (window.confirm("Удалить эту панель из системы?")) {
      try {
        await api.deletePart(id);
        loadData(); // Перезагружаем список после удаления
      } catch (e) {
        alert("Не удалось удалить деталь", e);
      }
    }
  };

  // --- ПРЕДСТАВЛЕНИЕ (Интерфейс) ---
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col">
      {/* Шапка */}
      <Header
        onRefresh={loadData}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-4 py-10 space-y-10">
        {/* Модальное окно сканера */}
        {isScannerOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
              <Scanner
                onScan={handleScan}
                onClose={() => setIsScannerOpen(false)}
              />
              <button
                onClick={() => setIsScannerOpen(false)}
                className="w-full mt-4 text-slate-400 font-bold uppercase text-xs"
              >
                Закрыть камеру
              </button>
            </div>
          </div>
        )}

        <section>
          <div className="flex justify-between items-end mb-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <h2>Активные заказы</h2>
            {selectedOrder && (
              <button
                onClick={() =>
                  setSelectedOrder(
                    selectedOrder === orders.order_no ? null : orders.order_no,
                  )
                }
                className="text-blue-400 text-xs hover:underline"
              >
                Сбросить фильтр
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.ID}
                order={order}
                isSelected={selectedOrder === order.order_no}
                onClick={() =>
                  setSelectedOrder(
                    selectedOrder === order.order_no ? null : order.order_no,
                  )
                }
                partsCount={
                  parts.filter((p) => p.order_no === order.order_no).length
                }
              />
            ))}
          </div>
        </section>
        <PartsTable
          parts={filteredParts}
          onRefresh={loadData}
          onDelete={handleDelete}
        />
      </main>

      <footer className="mt-20 pb-10 text-slate-600 text-[10px] uppercase tracking-widest">
        Система управления потоком v1.0
      </footer>
    </div>
  );
}

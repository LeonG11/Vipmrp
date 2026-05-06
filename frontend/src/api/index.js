import axios from "axios";
import Papa from "papaparse";

const API_URL = "/api";

// Базовые CRUD операции
export const getAllParts = () => axios.get(`${API_URL}/parts`);
export const getAllOrders = () => axios.get(`${API_URL}/orders`);
export const getPart = (id) => axios.get(`${API_URL}/parts/${id}`);
export const createPart = (data) => axios.post(`${API_URL}/parts`, data);
export const updatePartStatus = (id, status) =>
  axios.patch(`${API_URL}/parts/${id}/status`, { status });
export const deletePart = (id) => axios.delete(`${API_URL}/parts/${id}`);
export const createPartsBulk = (data) =>
  axios.post(`${API_URL}/parts/bulk`, data);

// Функция импорта CSV
export const parseAndImportCsv = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: "CP1251",
      complete: async (results) => {
        const mappedParts = results.data
          .filter((row) => row["Наименование детали"]) // Очистка от пустых строк
          .map((row) => ({
            designation: row["Обозначение детали"] || "",
            order_no: row["Заказ изделия"] || "",
            name: row["Наименование детали"] || "",
            material: row["Наименование материала"] || "",
            thickness: parseFloat(
              row["Толщина с учетом облицовки пласти"]?.replace(",", ".") || 0,
            ),
            quantity: parseInt(row["Количество"]) || 1,
            length: parseFloat(
              row["Готовая деталь [L]"]?.replace(",", ".") || 0,
            ),
            width: parseFloat(
              row["Готовая деталь [W]"]?.replace(",", ".") || 0,
            ),
            length_first: parseFloat(
              row["Заготовка [L]"]?.replace(",", ".") || 0,
            ),
            width_first: parseFloat(
              row["Заготовка [W]"]?.replace(",", ".") || 0,
            ),
            edge_l1: row["Обозначение облицовки кромки [L1]"] || "",
            edge_l2: row["Обозначение облицовки кромки [L2]"] || "",
            edge_w1: row["Обозначение облицовки кромки [W1]"] || "",
            edge_w2: row["Обозначение облицовки кромки [W2]"] || "",
            product_name: row["Наимен. изделия"] || "Без названия",
            status: "Запланировано",
          }));

        try {
          const response = await createPartsBulk(mappedParts);
          resolve(response.data);
        } catch (err) {
          reject(
            err.response?.data?.error || "Ошибка сервера при bulk-запросе",
          );
        }
      },
      error: (err) => reject(err.message),
    });
  });
};

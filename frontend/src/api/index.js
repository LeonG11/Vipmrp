import Papa from 'papaparse';
import axios from 'axios';

// Используем относительный путь, так как работаем через Traefik
const API_URL = '/api';

export const getPart = (id) => axios.get(`${API_URL}/parts/${id}`);
export const getAllParts = () => axios.get(`${API_URL}/parts`);
export const createPart = (data) => axios.post(`${API_URL}/parts`, data);
export const updatePartStatus = (id, status) => axios.patch(`${API_URL}/parts/${id}/status`, { status });
export const deletePart = (id) => axios.delete(`${API_URL}/parts/${id}`);
export const createPartBulk = (data) => axios.post(`${API_URL}/parts/bulk`, data);

export const parseAndImportCsv = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: "CP1251", // Стандарт для РФ выгрузок
      complete: async (results) => {
        const mappedParts = results.data.map(row => ({
          id: row['№'] ,
          destignation: row['Обозначение детали'],
          order_no: row['Заказ изделия'],
          name: row['Наименование детали'],
          material: row['Наименование материала'],
          thickness: parseFloat(row['Толщина с учетом облицовки пласти']?.replace(',', '.') || 0),
          quantity: parseInt(row['Количество'] || 1),
          length: parseFloat(row['Готовая деталь [L]']?.replace(',', '.') || 0),
          width: parseFloat(row['Готовая деталь [W]']?.replace(',', '.') || 0),
          edge_l1: row['Обозначение облицовки кромки [L1]'],
          edge_l2: row['Обозначение облицовки кромки [L2]'],
          edge_w1: row['Обозначение облицовки кромки [W1]'],
          edge_w2: row['Обозначение облицовки кромки [W2]'],
          groove: row['Паз'],
          note: row['Примечание'],
          product_name: row['Наимен. изделия'],
          status: "Пила" // Стартовый статус по твоим константам
        }));

        try {
          const response = await createPartBulk(mappedParts);
          resolve(response.data);
        } catch (err) {
          reject(err.response?.data?.error || "Ошибка сервера");
        }
      },
      error: (err) => reject(err.message)
    });
  });
};

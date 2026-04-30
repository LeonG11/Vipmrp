import axios from 'axios';

// Используем относительный путь, так как работаем через Traefik
const API_URL = '/api';

export const getPart = (id) => axios.get(`${API_URL}/parts/${id}`);
export const getAllParts = () => axios.get(`${API_URL}/parts`);
export const createPart = (data) => axios.post(`${API_URL}/parts`, data);
export const updatePartStatus = (id, status) => axios.patch(`${API_URL}/parts/${id}/status`, { status });
export const deletePart = (id) => axios.delete(`${API_URL}/parts/${id}`);


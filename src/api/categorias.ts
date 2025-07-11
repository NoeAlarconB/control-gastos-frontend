import axios from 'axios';
import { API, getAuthConfig } from './apiConfig';

export const getCategorias = () => {
    return axios.get(`${API}/categorias`, getAuthConfig());
};

export const postCategoria = (data: { nombre: string; tipo: string }) => {
    return axios.post(`${API}/categorias`, data, getAuthConfig());
};

export const putCategoria = (id: number, data: { nombre: string; tipo: string }) => {
    return axios.put(`${API}/categorias/${id}`, data, getAuthConfig());
};

export const deleteCategoria = (id: number) => {
    return axios.delete(`${API}/categorias/${id}`, getAuthConfig());
};

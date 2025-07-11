import axios from 'axios';
import { API, getAuthConfig } from './apiConfig';

export const getMetodoPago = () => {
    return axios.get(`${API}/metodos-pagos`, getAuthConfig());
};

export const postMetodoPago = (data: { nombre: string}) => {
    return axios.post(`${API}/metodos-pagos`, data, getAuthConfig());
};

export const putMetodoPago = (id: number, data: { nombre: string }) => {
    return axios.put(`${API}/metodos-pagos/${id}`, data, getAuthConfig());
};

export const deleteMetodoPago = (id: number) => {
    return axios.delete(`${API}/metodos-pagos/${id}`, getAuthConfig());
};

import axios from 'axios';
import { API, getAuthConfig } from './apiConfig';

export const getPresupuestos = () => {
    return axios.get(`${API}/presupuestos`, getAuthConfig());
};

export const postPresupuesto = (data: { idCategoria: number; montoMaximo: number; mes: number; anio: number}) => {
    return axios.post(`${API}/presupuestos`, data, getAuthConfig());
};

export const putPresupuesto = (id: number, data: { idCategoria: number; montoMaximo: number; mes: number; anio: number}) => {
    return axios.put(`${API}/presupuestos/${id}`, data, getAuthConfig());
};

export const deletePresupuesto = (id: number) => {
    return axios.delete(`${API}/presupuestos/${id}`, getAuthConfig());
};

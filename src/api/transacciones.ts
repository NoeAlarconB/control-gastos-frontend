import axios from 'axios';
import { API, getAuthConfig } from './apiConfig';

export const getTransacciones = () => {
    return axios.get(`${API}/transacciones`, getAuthConfig());
};

export const postTransaccion = (data: { 
    descripcion?: string; monto: number; tipo: 'gasto' | 'ingreso'; 
    idCategoria: number; idCuenta: number; idMetodoPago: number
}) => {
    return axios.post(`${API}/transacciones`, data, getAuthConfig());
};

export const putTransaccion = (id: number, data: {
    descripcion?: string; monto: number; tipo: 'gasto' | 'ingreso'; 
    idCategoria: number; idCuenta: number; idMetodoPago: number
}) => {
    return axios.put(`${API}/transacciones/${id}`, data, getAuthConfig());
};

export const deleteTransaccion = (id: number) => {
    return axios.delete(`${API}/transacciones/${id}`, getAuthConfig());
};

export const getPresupuestoRestante = ( idCategoria: number, mes: number, anio: number ) =>{
    return axios.get(`${API}/presupuestos/restante/${idCategoria}/${mes}/${anio}`, getAuthConfig());
}




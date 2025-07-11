import axios from 'axios';
import { API, getAuthConfig } from './apiConfig';


export const getCuentasBancarias = () => {
    return axios.get(`${API}/cuentas-bancarias`, getAuthConfig());
};

export const postCuentaBancaria = (data: { nombre: string; saldo: number }) => {
    return axios.post(`${API}/cuentas-bancarias`, data, getAuthConfig());
};

export const putCuentaBancaria = (id: number, data: { nombre: string; saldo: number }) => {
    return axios.put(`${API}/cuentas-bancarias/${id}`, data, getAuthConfig());
};

export const deleteCuentaBancaria = (id: number) => {
    return axios.delete(`${API}/cuentas-bancarias/${id}`, getAuthConfig());
};

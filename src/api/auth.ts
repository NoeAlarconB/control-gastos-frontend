import axios from 'axios';
//LLAMADAS AL BACKEND
const API = import.meta.env.VITE_API_URL;

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API}/auth/login`, { username, password });
    return response.data;
};

export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${API}/auth/register`, { username, email, password });
    return response.data;
};

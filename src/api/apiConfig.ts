// src/services/apiConfig.ts
import { getToken } from '../services/authService';

export const API = import.meta.env.VITE_API_URL;

export const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

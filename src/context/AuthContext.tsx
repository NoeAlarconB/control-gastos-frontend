import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getToken, removeToken } from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

type User = {
    id: number;
    username: string;
    email?: string;
};

type AuthContextType = {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // ← Nuevo
    const navigate = useNavigate();

    const login = (token: string) => {
        const decoded: any = jwtDecode(token);
        setUser({ id: decoded.id, username: decoded.username, email: decoded.email });
        localStorage.setItem('token', token);
        navigate('/dashboard');
    };

    const logout = () => {
        removeToken(); // Elimina el token de localStorage
        setUser(null); // Limpia al usuario del contexto
        navigate('/'); // Redirige al login
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUser({ id: decoded.id, username: decoded.username, email: decoded.email });
            } catch {
                removeToken();
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}> {children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-white p-4">Cargando...</div>; // o un spinner
    }

    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;

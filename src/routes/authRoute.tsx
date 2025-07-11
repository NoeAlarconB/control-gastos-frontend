// src/routes/AppRoutes.tsx

import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import DashboardHomePage from '../pages/DashboardHomePage';
import CuentasPage from '../pages/CuentaBancariaPage';
import CategoriasPage from '../pages/CategoriaPage';
import TransaccionesPage from '../pages/TransaccionPage';
import PresupuestoPage from '../pages/PresupuestoPage';
import PrivateRoute from './privateRoute';
import MetodoPagoPage from '../pages/MetodoPagoPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHomePage />} />
        <Route path="cuentas" element={<CuentasPage />} />
        <Route path="metodoPago" element={<MetodoPagoPage />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="transacciones" element={<TransaccionesPage />} />
        <Route path="presupuesto" element={<PresupuestoPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

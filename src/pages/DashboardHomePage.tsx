import { FaChartPie } from 'react-icons/fa';
import '../styles/dashboard.css'; // Si quieres estilizar desde un CSS externo

const DashboardHomePage = () => {
  return (
    <div className="dashboard-home">
      <h1 className="dashboard-title">
        <FaChartPie style={{ marginRight: '10px' }} />
        Bienvenido al Panel de Control
      </h1>
      <p className="dashboard-subtitle">
        Aquí podrás gestionar tus cuentas, categorías, presupuestos y transacciones.
      </p>
    </div>
  );
};

export default DashboardHomePage;

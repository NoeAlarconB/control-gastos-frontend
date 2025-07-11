import { Home, Banknote, List, Folder, Wallet, LogOut, PiggyBank , } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    const { logout } = useAuth();

    const navItems = [
        { to: '/dashboard', label: 'Inicio', icon: <Home size={25} /> },
        { to: '/dashboard/cuentas', label: 'Cuentas bancarias', icon: <Banknote size={25} /> },
        { to: '/dashboard/metodoPago', label: 'Metodo Pago', icon: <PiggyBank  size={25} /> },
        { to: '/dashboard/categorias', label: 'Categorías', icon: <Folder size={25} /> },
        { to: '/dashboard/presupuesto', label: 'Presupuesto', icon: <Wallet size={25} /> },
        { to: '/dashboard/transacciones', label: 'Transacciones', icon: <List size={25} /> },
    ];

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="logo">{collapsed ? '⚡' : '⚡ZEUS'}</div>
            <nav>
                {navItems.map(item => (
                    <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>
                        <span className="icon">{item.icon}</span>
                        <span className={`label ${collapsed ? 'hidden' : ''}`}>{item.label}</span>
                    </NavLink>
                ))}
                <a onClick={logout}>
                    <LogOut size={20} /> 
                    <span className={`label ${collapsed ? 'hidden' : ''}`}>Cerrar sesión</span>
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="dashboard">
            <Sidebar collapsed={collapsed} />
            <div className="main">
                <Navbar toggleSidebar={() => setCollapsed(!collapsed)} />
                    <div className="content">
                        <Outlet />
                    </div>
            </div>
        </div>
    );
};

export default Dashboard;

import { Menu } from 'lucide-react';
import '../styles/dashboard.css';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    return (
        <div className="navbar">
            <button onClick={toggleSidebar}><Menu /></button>
            <span>Panel de Control</span>
        </div>
    );
};

export default Navbar;

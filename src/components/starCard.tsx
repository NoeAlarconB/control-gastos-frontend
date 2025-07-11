import type { ReactNode } from 'react';
import '../styles/dashboard.css';

type Props = {
    title: string;
    value: string;
    icon: ReactNode;
    colorClass: string;
};

const StarCard = ({ title, value, icon, colorClass }: Props) => {
    return (
        <div className={`star-card ${colorClass}`}>
            <div className="info">
                <span className="title">{title}</span>
                <span className="value">{value}</span>
            </div>
            <div className="icon">{icon}</div>
        </div>
    );
};

export default StarCard;

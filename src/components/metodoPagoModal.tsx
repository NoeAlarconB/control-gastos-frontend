// src/components/MetodoPagoModal.tsx
import { useEffect, useState } from 'react';
import '../styles/modal.css';

type Props = {
    onClose: () => void;
    onSubmit: (data: { nombre: string }) => void;
    defaultData?: { nombre: string };
    title: string;
};

const MetodoPagoModal = ({ onClose, onSubmit, defaultData, title }: Props) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (defaultData) {
        setNombre(defaultData.nombre);
        }
    }, [defaultData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) {
        alert('El nombre es obligatorio');
        return;
        }
        onSubmit({ nombre: nombre.trim() });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                <label>Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre del método de pago"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <div className="modal-actions">
                    <button type="button" className="btn outline" onClick={onClose}> Cancelar </button>
                    <button type="submit" className="btn"> Guardar </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default MetodoPagoModal;

import { useState, useEffect } from 'react';
import '../styles/modal.css';
import '../styles/buttons.css';

type Props = {
    onClose: () => void;
    onSubmit: (data: { nombre: string; tipo: string }) => void;
    defaultData?: { nombre: string; tipo: string };
    title: string;
    };

    const ModalCategoria = ({ onClose, onSubmit, defaultData, title }: Props) => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('gasto');

    useEffect(() => {
        if (defaultData) {
        setNombre(defaultData.nombre);
        setTipo(defaultData.tipo);
        }
    }, [defaultData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ nombre, tipo });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre de la categoría"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required/>

                    <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                        <option value="gasto">Gasto</option>
                        <option value="ingreso">Ingreso</option>
                    </select>

                    <div className="modal-actions">
                        <button type="button" className="btn outline" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCategoria;

import { useEffect, useState } from 'react';
import { getMetodoPago, postMetodoPago, putMetodoPago, deleteMetodoPago } from '../api/metodoPago';
import type { MetodoPago } from '../types/metodoPago';
import MetodoPagoModal from '../components/metodoPagoModal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import '../styles/table.css'

const MetodoPagoPage = () => {
    const [metodos, setMetodos] = useState<MetodoPago[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState<MetodoPago | null>(null);

    const fetchMetodos = async () => {
        try {
        const res = await getMetodoPago();
        setMetodos(res.data.data);
        } catch (err) {
        alert('Error al cargar métodos de pago');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetodos();
    }, []);

    const handleCrear = async (data: { nombre: string }) => {
        await postMetodoPago(data);
        setShowModal(false);
        fetchMetodos();
    };

    const handleActualizar = async (data: { nombre: string }) => {
        if (!editData) return;
        await putMetodoPago(editData.idMetodoPago!, data);
        setEditData(null);
        setShowModal(false);
        fetchMetodos();
    };

    const handleEliminar = async (id: number) => {
        if (confirm('¿Eliminar método de pago?')) {
        await deleteMetodoPago(id);
        fetchMetodos();
        }
    };

    return (
        <div className="page-card">
            <div className="page-header">
                <h2>Métodos de Pago</h2>
                <button className="btn" onClick={() => { setShowModal(true); setEditData(null); }}>
                <Plus/> Agregar
                </button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : metodos.length === 0 ? (
                <p>No tienes métodos de pago registrados.</p>
            ) : (
                <table className="table-wrapper">
                <thead className="data-table">
                    <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {metodos.map((m) => (
                    <tr key={m.idMetodoPago}>
                        <td>{m.nombre}</td>
                        <td>
                        <button className="icon-btn" onClick={() => { setEditData(m); setShowModal(true); }}>
                            <Edit size={18} />
                        </button>
                        <button className="icon-btn danger" onClick={() => handleEliminar(m.idMetodoPago!)}>
                            <Trash2 size={18} />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}

            {showModal && (
                <MetodoPagoModal
                title={editData ? 'Editar método' : 'Nuevo método'}
                defaultData={editData ?? undefined}
                onSubmit={editData ? handleActualizar : handleCrear}
                onClose={() => { setShowModal(false); setEditData(null); }}
                />
            )}
        </div>
    );
};

export default MetodoPagoPage;

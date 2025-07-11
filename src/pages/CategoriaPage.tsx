import { useEffect, useState } from 'react';
import { getCategorias, postCategoria, putCategoria, deleteCategoria } from '../api/categorias';
import ModalCategoria from '../components/categoriaModal';
import type { Categoria } from '../types/categoria';
import { Plus, Edit, Trash2 } from 'lucide-react';
import '../styles/table.css';
import '../styles/buttons.css';

const CategoriaPage = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);

    const fetchCategorias = async () => {
        try {
            const res = await getCategorias();
            setCategorias(res.data.data);
        } catch (err: any) {
            alert('Error al cargar las categorías');
            console.error("Error al obtener categorías:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const handleCrear = async (data: { nombre: string; tipo: string }) => {
        const yaExiste = categorias.some((cat) => 
            cat.nombre.toLowerCase() === data.nombre.toLowerCase() && cat.tipo === data.tipo
        );
        if (yaExiste) {
            alert('Ya existe una categoría con ese nombre y tipo');
            return;
        }

        await postCategoria(data);
        setShowModal(false);
        fetchCategorias();
    };

    const handleActualizar = async (data: { nombre: string; tipo: string }) => {
        if (!editCategoria) return;

        const yaExiste = categorias.some(
        (cat) =>
            cat.idCategoria !== editCategoria.idCategoria &&
            cat.nombre.toLowerCase() === data.nombre.toLowerCase() && cat.tipo === data.tipo
        );
        if (yaExiste) {
            alert('Ya existe otra categoría con ese nombre y tipo');
            return;
        }

        try {
            await putCategoria(editCategoria.idCategoria, data);
            setEditCategoria(null);
            setShowModal(false);
            fetchCategorias();
        } catch (err: any) {
            const mensaje = err.response?.data?.message || 'Error al actualizar la categoría';
            alert(mensaje);
        }
    };

    const handleEliminar = async (id: number) => {
        if (confirm('¿Eliminar esta categoría?')) {
            await deleteCategoria(id);
            fetchCategorias();
        }
    };

    return (
        <div className="page-card">
            <div className="page-header">
                <h2>Categorías</h2>
                <button className="btn" onClick={() => { setShowModal(true); setEditCategoria(null); }}>
                    <Plus size={18} /> Agregar
                </button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : categorias.length === 0 ? (
                <p>No tienes categorías registradas.</p>
            ) : (
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.idCategoria}>
                                <td>{categoria.nombre}</td>
                                <td>{categoria.tipo}</td>
                                <td>
                                    <button className="icon-btn" onClick={() => { 
                                        setEditCategoria(categoria); setShowModal(true); }}><Edit size={18} />
                                    </button>
                                    <button className="icon-btn danger" onClick={() => 
                                        handleEliminar(categoria.idCategoria)} style={{ marginLeft: '8px' }}>
                                            <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {showModal && (
                <ModalCategoria
                title={editCategoria ? 'Editar categoría' : 'Nueva categoría'}
                defaultData={editCategoria ?? undefined}
                onSubmit={editCategoria ? handleActualizar : handleCrear}
                onClose={() => { setShowModal(false); setEditCategoria(null); }}/>
            )}
        </div>
    );
};

export default CategoriaPage;

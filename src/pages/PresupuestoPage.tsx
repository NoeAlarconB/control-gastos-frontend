import { useEffect, useState } from 'react';
import { getPresupuestos, postPresupuesto, putPresupuesto, deletePresupuesto } from '../api/presupuestos';
import { getCategorias } from '../api/categorias';
import type { Presupuesto } from '../types/presupuesto';
import type { Categoria } from '../types/categoria';
import ModalPresupuesto from '../components/presupuestoModal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import '../styles/table.css'

const PresupuestoPage = () => {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editPresupuesto, setEditPresupuesto] = useState<Presupuesto | null>(null);
  
  const fetchPresupuestos = async () => {
    try {
      const [resPresupuestos, resCategorias] = await Promise.all([
        getPresupuestos(),
        getCategorias()
      ]);
      setPresupuestos(resPresupuestos.data.data);
      setCategorias(resCategorias.data.data.filter((c: Categoria) => c.tipo === 'gasto'));
      } catch (err) {
        alert('Error al cargar presupuestos o categorías');
      } finally {
        setLoading(false);
      }
    };

    const handleCrearPresupuesto = async (data: {
      idCategoria: number; montoMaximo: number; mes: number; anio: number;
    }) => {
      const yaExiste = presupuestos.some(p => p.idCategoria === data.idCategoria && 
        p.mes === data.mes && p.anio === data.anio
      );
    
      if (yaExiste) {
        alert('Ya existe un presupuesto para esta categoría en ese mes y año');
        return;
      }
    
      try {
        if (editPresupuesto) {
          await putPresupuesto(editPresupuesto.idPresupuesto!, data);
        } else {
          await postPresupuesto(data);
        }
        setEditPresupuesto(null);
        setShowModal(false);
        fetchPresupuestos();
      } catch (err: any) {
        const msg = err?.response?.data?.message || 'Error al guardar presupuesto';
        alert(msg);
      }
    };
  
    const handleEliminar = async (id: number) => {
      if (confirm('¿Eliminar presupuesto?')) {
        await deletePresupuesto(id);
        fetchPresupuestos();
      }
    };
    
    useEffect(() => {
      fetchPresupuestos();
    }, []);

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Presupuestos</h2>
        <button className="btn" onClick={() => { setEditPresupuesto(null); setShowModal(true); }}> <Plus /> Agregar
        </button>
      </div>
      
      {loading ? (
        <p>Cargando...</p>
      ) : presupuestos.length === 0 ? (
        <p>No tienes presupuestos registrados.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>CATEGORÍA</th>
                <th>MONTO MÁXIMO</th>
                <th>MES</th>
                <th>AÑO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {presupuestos.map((presupuesto) => (
                <tr key={presupuesto.idPresupuesto}>
                  <td>{presupuesto.nombreCategoria}</td>
                  <td>S/. {presupuesto.montoMaximo}</td>
                  <td>{presupuesto.mes}</td>
                  <td>{presupuesto.anio}</td>
                  <td>
                    <button className="icon-btn" onClick={() => { 
                      setEditPresupuesto(presupuesto); setShowModal(true); }}> <Edit size={18} />
                    </button>
                    <button className="icon-btn danger" onClick={() => 
                      handleEliminar(presupuesto.idPresupuesto!)} style={{ marginLeft: '8px' }}><Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ModalPresupuesto
          title={editPresupuesto ? 'Editar presupuesto' : 'Nuevo presupuesto'}
          defaultData={editPresupuesto ?? undefined}
          categorias={categorias}
          onSubmit={handleCrearPresupuesto}
          onClose={() => { setEditPresupuesto(null); setShowModal(false); }}/>
      )}
    </div>
  );
};

export default PresupuestoPage;

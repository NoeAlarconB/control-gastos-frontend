import { useEffect, useState } from 'react';
import { getTransacciones, postTransaccion, putTransaccion, deleteTransaccion } from '../api/transacciones';
import { getPresupuestos } from '../api/presupuestos';
import { getCuentasBancarias } from '../api/cuentas';
import { getMetodoPago } from '../api/metodoPago';
import { Plus, Edit, Trash2 } from 'lucide-react';
import TransaccionModal from '../components/transaccionModal';
import type { Transaccion } from '../types/transaccion';
import type { Presupuesto } from '../types/presupuesto';
import type { CuentaBancaria } from '../types/cuentaBancaria';
import type { MetodoPago } from '../types/metodoPago';
import '../styles/table.css'

const TransaccionPage = () => {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [cuentasBancarias, setCuentas] = useState<CuentaBancaria[]>([]);
  const [metodos, setMetodos] = useState<MetodoPago[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Transaccion | null>(null);

  const fetchData = async () => {
    try {
      const [resTrans, resPres, resCuentas, resMetodos] = await Promise.all([
        getTransacciones(),
        getPresupuestos(),
        getCuentasBancarias(),
        getMetodoPago()
      ]);

      setTransacciones(resTrans.data.data);

      const now = new Date();
      const mesActual = now.getMonth() + 1;
      const anioActual = now.getFullYear();

      const presupuestosActivos = resPres.data.data.filter(
        (p: Presupuesto) => p.mes === mesActual && p.anio === anioActual
      );
      setPresupuestos(presupuestosActivos);

      setCuentas(resCuentas.data.data);
      setMetodos(resMetodos.data.data);
    } catch (err: any) {
      alert('Error al cargar transacciones o datos relacionados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCrear = async (data: {
    idCategoria: number;
    idCuenta: number;
    idMetodoPago: number;
    monto: number;
    tipo: 'ingreso' | 'gasto';
    descripcion?: string;
  }) => {
    try {
      await postTransaccion(data);
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message); 
      } else {
        console.error('Error inesperado:', err);
        alert('Ocurrió un error inesperado al registrar la transacción');
      }
    }
  };

  const handleActualizar = async (data: {
    idCategoria: number;
    idCuenta: number;
    idMetodoPago: number;
    monto: number;
    tipo: 'ingreso' | 'gasto';
    descripcion?: string;
  }) => {
    if (!editData) return;
    try {
      await putTransaccion(editData.idTransacciones!, data);
      setEditData(null);
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        console.error('Error inesperado:', err);
        alert('Ocurrió un error inesperado al actualizar la transacción');
      }
    }
  };

  const handleEliminar = async (id: number) => {
    if (confirm('¿Eliminar esta transacción?')) {
      await deleteTransaccion(id);
      fetchData();
    }
  };

  const formatFecha = (fecha: string | Date | null) => fecha ? (fecha instanceof Date
          ? fecha.toLocaleDateString()
          : new Date(fecha).toLocaleDateString())
      : '';

  return (
      <div className="page-card">
        <div className="page-header">
          <h2>Transacciones</h2>
          <button className="btn" onClick={() => { setShowModal(true); setEditData(null); }}>
            <Plus size={18} /> Agregar
          </button>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : transacciones.length === 0 ? (
          <p>No tienes transacciones registradas.</p>
        ) : (
          <div className="table-wrapper">
            <table className="data-table" >
              <thead>
                <tr>
                  <th>CATEGORÍA</th>
                  <th>CUENTA</th>
                  <th>MÉTODO DE PAGO</th>
                  <th>MONTO</th>
                  <th>TIPO</th>
                  <th>FECHA</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {transacciones.map((t) => (
                  <tr key={t.idTransacciones}>
                    <td>{t.nombreCategoria}</td>
                    <td>{t.nombreCuenta}</td>
                    <td>{t.nombreMetodo}</td>
                    <td data-col="monto">S/. {t.monto}</td>
                    <td>{t.tipo}</td>
                    <td>{formatFecha(t.fechaCreacion)}</td>
                    <td>
                      <button className='icon-btn' onClick={() => { setEditData(t); setShowModal(true); }}>
                        <Edit size={18} />
                      </button>
                      <button className="icon-btn danger" onClick={() => handleEliminar(t.idTransacciones!)} style={{ marginLeft: '8px' }}>
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
          <TransaccionModal
            title={editData ? 'Editar transacción' : 'Nueva transacción'}
            onClose={() => { setShowModal(false); setEditData(null); }}
            onSubmit={editData ? handleActualizar : handleCrear}
            presupuestos={presupuestos}
            cuentas={cuentasBancarias}
            metodos={metodos}
            defaultData={editData ?? undefined}
          />
        )}
      </div>
    );
};

export default TransaccionPage;

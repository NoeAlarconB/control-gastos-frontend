import { useEffect, useState } from 'react';
import { getCuentasBancarias, postCuentaBancaria, putCuentaBancaria, deleteCuentaBancaria, } from '../api/cuentas';
import type { CuentaBancaria } from '../types/cuentaBancaria';
import ModalCuenta  from '../components/cuentaModal';///
import { Plus, Edit, Trash2 } from 'lucide-react';
import '../styles/table.css'

const CuentasBancariaPage = () => {
  const [cuentas, setCuentas] = useState<CuentaBancaria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCuenta, setEditCuenta] = useState<CuentaBancaria | null>(null);
  
  const fetchCuentas = async () => {
    try {
      const res = await getCuentasBancarias();
      setCuentas(res.data.data);
    } catch (err: any) {
      alert('Error al cargar las cuentas');
      console.error("Error al obtener cuentas:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCuentas();
  }, []);

  const handleCrear = async (data: { nombre: string; saldo: number }) => {
    const yaExiste = cuentas.some(c =>
      c.nombre.toLowerCase() === data.nombre.toLowerCase()
    );
  
    if (yaExiste) {
      alert('Ya tienes una cuenta con ese nombre');
      return;
    }
  
    try {
      await postCuentaBancaria(data);
      setShowModal(false);
      await fetchCuentas();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error al crear cuenta';
      alert(msg);
    }
  };

  const handleActualizar = async (data: { nombre: string; saldo: number }) => {
    if (!editCuenta) return;

  const yaExiste = cuentas.some(c => c.idCuenta !== editCuenta.idCuenta &&
    c.nombre.toLowerCase() === data.nombre.toLowerCase()
  );

  if (yaExiste) {
    alert('Ya tienes otra cuenta con ese nombre');
    return;
  }

  try {
    await putCuentaBancaria(editCuenta.idCuenta, data);
    setEditCuenta(null);
    setShowModal(false);
    fetchCuentas();
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Error al actualizar cuenta';
    alert(msg);
  }
  };

  const handleEliminar = async (id: number) => {
    if (confirm('¿Eliminar esta cuenta?')) { await deleteCuentaBancaria(id);
      fetchCuentas();
    }
  };


  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Cuentas Bancarias</h2>
        <button className="btn" onClick={() => { setShowModal(true); setEditCuenta(null); }}>
          <Plus />Agregar
        </button>
      </div>
      
      {loading ? (
        <p>Cargando...</p>
      ) : cuentas.length === 0 ? (
        <p>No hay cuentas registradas.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>SALDO</th>
                <th>FECHA CREACION</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {cuentas.map((cuenta) => (
                <tr key={cuenta.idCuenta}>
                  <td>{cuenta.nombre}</td>
                  <td>S/.{Number(cuenta.saldo).toFixed(2)}</td>
                  <td>{cuenta.fechaCreacion ? new 
                    Intl.DateTimeFormat('es-PE').format(new Date(cuenta.fechaCreacion)): 'Sin fecha'}
                  </td>
                  <td>
                    <button className="icon-btn" onClick={() => { 
                      setEditCuenta(cuenta); setShowModal(true); }}><Edit size={18} />
                    </button>
                    <button className="icon-btn danger" onClick={() => 
                      handleEliminar(cuenta.idCuenta)} style={{ marginLeft: '10px' }}><Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ModalCuenta
          title={editCuenta ? 'Editar cuenta' : 'Nueva cuenta'}
          defaultData={editCuenta ?? undefined}
          onSubmit={editCuenta ? handleActualizar : handleCrear}
          onClose={() => { setShowModal(false); setEditCuenta(null); }}/>
      )}
    </div>
  );
};

export default CuentasBancariaPage;

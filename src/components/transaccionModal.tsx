import { useEffect, useState } from 'react';
import '../styles/modal.css';
import '../styles/buttons.css'
import type { Presupuesto } from '../types/presupuesto';
import type { CuentaBancaria } from '../types/cuentaBancaria';
import type { MetodoPago } from '../types/metodoPago';

type Props = {
  onClose: () => void;
  onSubmit: (data: { idCategoria: number; idCuenta: number; idMetodoPago: number; monto: number; 
    tipo: 'ingreso' | 'gasto';descripcion?: string; }) => void;
    presupuestos: Presupuesto[];
    cuentas: CuentaBancaria[];
    metodos: MetodoPago[];
    defaultData?: {
      idCategoria: number;
      idCuenta: number;
      idMetodoPago: number;
      monto: number;
      tipo: 'ingreso' | 'gasto';
    };
    title: string;
};

const TransaccionModal = ({ onClose, onSubmit, presupuestos, cuentas, metodos, defaultData, title }: Props) => {
  const [idCategoria, setIdCategoria] = useState<number>(0);
  const [idCuenta, setIdCuenta] = useState<number>(0);
  const [idMetodoPago, setIdMetodoPago] = useState<number>(0);
  const [monto, setMonto] = useState<string>('');
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('gasto');

  useEffect(() => {
    if (defaultData) {
      setIdCategoria(defaultData.idCategoria);
      setIdCuenta(defaultData.idCuenta);
      setIdMetodoPago(defaultData.idMetodoPago);
      setMonto(defaultData.monto.toString());
      setTipo(defaultData.tipo);
    }
  }, [defaultData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!idCategoria || !idCuenta || !idMetodoPago) {
      alert('Selecciona categoría, cuenta y método de pago');
      return;
    }
    const valor = parseFloat(monto);
    if (isNaN(valor) || valor <= 0) {
      alert('Ingresa un monto válido');
      return;
    }
    
    onSubmit({ idCategoria, idCuenta, idMetodoPago,monto: valor, tipo, });};

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <div className="form-group">
          <form onSubmit={handleSubmit} className="modal-form">
            <select value={idCategoria} onChange={(e) => setIdCategoria(Number(e.target.value))}>
              <option value={0}>Selecciona categoría</option>
              {presupuestos.map((p) => (
                <option key={p.idCategoria} value={p.idCategoria}>{p.nombreCategoria}</option>
              ))}
            </select>

            <select value={idCuenta} onChange={(e) => setIdCuenta(Number(e.target.value))}>
              <option value={0}>Selecciona cuenta</option>
              {cuentas.map((c) => (
                <option key={c.idCuenta} value={c.idCuenta}>{c.nombre}</option>
              ))}
            </select>

            <select value={idMetodoPago} onChange={(e) => setIdMetodoPago(Number(e.target.value))}>
              <option value={0}>Selecciona método de pago</option>
              {metodos.map((m) => (
                <option key={m.idMetodoPago} value={m.idMetodoPago}>{m.nombre}</option>
              ))}
            </select>

            <select value={tipo} onChange={(e) => setTipo(e.target.value as 'ingreso' | 'gasto')}>
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>

            <input
              type="number"
              placeholder="Monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required/>

            <div className="modal-actions">
              <button type="button" className="btn outline" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransaccionModal;

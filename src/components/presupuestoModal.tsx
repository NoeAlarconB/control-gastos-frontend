import { useEffect, useState } from 'react';
import '../styles/modal.css';
import '../styles/buttons.css'
import type { Categoria } from '../types/categoria';

type Props = {
  onClose: () => void;
  onSubmit: (data: { idCategoria: number; montoMaximo: number; mes: number; anio: number }) => void;
  categorias: Categoria[];
  defaultData?: { idCategoria: number; montoMaximo: number; mes: number; anio: number };
  title: string;
};

const ModalPresupuesto = ({ onClose, onSubmit, categorias, defaultData, title }: Props) => {
  const [idCategoria, setIdCategoria] = useState<number>(0);
  const [montoMaximo, setMontoMaximo] = useState<string>('');
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [anio, setAnio] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    if (defaultData) {
      setIdCategoria(defaultData.idCategoria);
      setMontoMaximo(defaultData.montoMaximo.toString());
      setMes(defaultData.mes);
      setAnio(defaultData.anio);
    }
  }, [defaultData]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault();
    if (idCategoria === 0) return alert('Selecciona una categoría');
    const monto = parseFloat(montoMaximo);
    if (isNaN(monto) || monto <= 0) return alert('Ingresa un monto válido');
    onSubmit({ idCategoria, montoMaximo: monto, mes, anio });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <div className="form-group">
          <form onSubmit={handleSubmit} className="modal-form">
            <select value={idCategoria} onChange={(e) => setIdCategoria(parseInt(e.target.value))}>
              <option value={0}>Seleccione una categoría</option>
              {categorias.map(cat => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.nombre} ({cat.tipo})
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Monto máximo"
              value={montoMaximo}
              onChange={(e) => setMontoMaximo(e.target.value)}
              required/>

            <select value={mes} onChange={(e) => setMes(parseInt(e.target.value))}>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Año"
              value={anio}
              onChange={(e) => setAnio(parseInt(e.target.value))}
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

export default ModalPresupuesto;

import { useState, useEffect } from 'react';
import '../styles/modal.css';
import '../styles/buttons.css'

type Props = {
  onClose: () => void;
  onSubmit: (data: { nombre: string; saldo: number }) => void;
  defaultData?: { nombre: string; saldo: number };
  title: string;
};

const ModalCuenta = ({ onClose, onSubmit, defaultData, title }: Props) => {
  const [nombre, setNombre] = useState('');
  const [saldo, setSaldo] = useState('');

  useEffect(() => {
    if (defaultData) {
      setNombre(defaultData.nombre);
      setSaldo(defaultData.saldo.toString());
    }
  }, [defaultData]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault();
    const saldoNumber = parseFloat(saldo);
    if (isNaN(saldoNumber)) {
      alert('Saldo inválido');
    return;
  }
  onSubmit({ nombre, saldo: saldoNumber });};

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <div className="form-group">
          <form className="modal-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de la cuenta"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required/>
            <input
              type="number"
              placeholder="Saldo"
              value={saldo}
              onChange={(e) => setSaldo((e.target.value))}
              required
            />
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

export default ModalCuenta;

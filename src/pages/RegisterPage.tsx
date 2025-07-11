import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert('Registro exitoso');
      navigate('/');
    } catch {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>REGISTRARSE</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-icon"><FiUser />
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-icon"><FiMail />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-icon"><FiLock />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">REGISTRAR</button>
        </form>
        <div className="register"> ¿Ya tienes una cuenta? <a href="/">Iniciar Sesion</a></div>
      </div>
    </div>
  );
};

export default RegisterPage;

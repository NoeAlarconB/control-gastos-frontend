import { useState } from 'react';
import { login  as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import { FiUser, FiLock } from 'react-icons/fi';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();
    try {
      const response = await loginApi(username, password);
      const token = response.data.token;
      login(token);
      console.log('TOKEN JWT:', token);
      alert('✅ Has iniciado sesión correctamente');
      // Redirigir después
    } catch (err){
      alert('❌ Usuario o contraseña incorrectos. Verifica tus datos.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>INICIO DE SESION</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-icon"><FiUser />
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-icon"><FiLock />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="links">
            <label><input type="checkbox" /> Acordarme</label>
            <a href="#">¿Has olvidado tu contraseña?</a>
          </div>
          <button type="submit">INICIAR SESION</button>
        </form>
        <div className="register">
          ¿No tienes una cuenta? <a href="/register">Registrarse</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

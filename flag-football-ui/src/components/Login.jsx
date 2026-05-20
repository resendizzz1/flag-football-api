import { useState } from 'react';
import './Login.css';

function Login({ setView, setAdminUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://13.223.53.28/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setAdminUser(data.usuario);
        setView('admin');
      } else {
        setError(data.error || 'No tienes permisos de administrador');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Acceso al Sistema</h2>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@correo.com" 
              className="form-input" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="form-input" 
              required 
            />
          </div>

          <button type="submit" className="btn-submit">Iniciar Sesión</button>
        </form>

        <button onClick={() => setView('register')} className="btn-back mt-2" style={{ color: '#3b82f6' }}>
          Crear una cuenta nueva
        </button>

        <button onClick={() => setView('home')} className="btn-back">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default Login;
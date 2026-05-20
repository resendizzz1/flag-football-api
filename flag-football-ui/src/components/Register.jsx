import { useState } from 'react';
import './Login.css';

function Register({ setView }) {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: 'coach' });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    try {
      const response = await fetch('http://13.223.53.28/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMensaje({ texto: 'Cuenta creada. Espera autorización del Administrador.', tipo: 'success' });
        setTimeout(() => setView('login'), 3000);
      } else {
        setMensaje({ texto: data.error || 'Error al registrar', tipo: 'error' });
      }
    } catch (err) {
      setMensaje({ texto: 'Error de conexión con el servidor', tipo: 'error' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Crear Cuenta</h2>
          <p className="login-subtitle">Regístrate en la plataforma</p>
        </div>

        {mensaje.texto && (
          <div className={`mb-4 p-3 rounded text-sm ${mensaje.tipo === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input 
              type="text" 
              className="form-input" 
              required 
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-input" 
              required 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-input" 
              required 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Rol Solicitado</label>
            <select 
              className="form-input" 
              value={formData.rol} 
              onChange={(e) => setFormData({...formData, rol: e.target.value})}
            >
              <option value="coach">Coach / Jugador</option>
              <option value="admin">Administrador de Liga</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Registrarse</button>
        </form>
        <button onClick={() => setView('login')} className="btn-back mt-2">
          Ya tengo cuenta. Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Register;
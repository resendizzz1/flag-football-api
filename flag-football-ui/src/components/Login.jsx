import './Login.css';

function Login({ setView }) {
  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de autenticación conectada al backend
    setView('dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Acceso Administrativo</h2>
          <p className="login-subtitle">Ingresa tus credenciales para gestionar el torneo</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" placeholder="admin@ltc2026.com" className="form-input" required />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" placeholder="••••••••" className="form-input" required />
          </div>

          <button type="submit" className="btn-submit">Iniciar Sesión</button>
        </form>

        <button onClick={() => setView('home')} className="btn-back">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default Login;
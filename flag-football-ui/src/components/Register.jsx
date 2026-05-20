import { useState } from 'react';

function Register({ setView }) {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: 'coach' });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleSubmit = async (e) => {
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
        setMensaje({ texto: 'Registro exitoso. Espera autorización.', tipo: 'success' });
        setTimeout(() => setView('login'), 3000);
      } else {
        setMensaje({ texto: data.error || 'Error al registrar', tipo: 'error' });
      }
    } catch (err) {
      setMensaje({ texto: 'Error de conexión con el servidor', tipo: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
        
        {mensaje.texto && (
          <div className={`mb-4 p-3 rounded ${mensaje.tipo === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input 
              type="text" required className="w-full p-2 border rounded"
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" required className="w-full p-2 border rounded"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input 
              type="password" required className="w-full p-2 border rounded"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rol</label>
            <select 
              className="w-full p-2 border rounded" value={formData.rol}
              onChange={(e) => setFormData({...formData, rol: e.target.value})}
            >
              <option value="coach">Coach / Jugador</option>
              <option value="developer">Desarrollador</option>
              <option value="admin">Administrador de Liga</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Registrarse
          </button>
        </form>
        <button onClick={() => setView('login')} className="w-full mt-4 text-blue-600 hover:underline">
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </div>
  );
}

export default Register;
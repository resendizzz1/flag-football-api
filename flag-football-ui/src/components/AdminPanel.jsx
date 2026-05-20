import { useState, useEffect } from 'react';

function AdminPanel({ setView, adminUser }) {
  const [usuariosPendientes, setUsuariosPendientes] = useState([]);

  const cargarPendientes = () => {
    fetch('http://13.223.53.28/api/auth/usuarios/pendientes')
      .then(res => res.json())
      .then(data => setUsuariosPendientes(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    cargarPendientes();
  }, []);

  const autorizarUsuario = async (id) => {
    await fetch(`http://13.223.53.28/api/auth/usuarios/autorizar/${id}`, { method: 'PUT' });
    cargarPendientes();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <p className="text-gray-600">Bienvenido, {adminUser?.nombre} ({adminUser?.rol})</p>
          </div>
          <button onClick={() => setView('home')} className="bg-red-600 text-white px-4 py-2 rounded">Cerrar Sesión</button>
        </div>

        {adminUser?.rol === 'admin' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Autorizaciones Pendientes</h2>
            {usuariosPendientes.length === 0 ? (
              <p className="text-gray-500">No hay usuarios pendientes de autorización.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Rol</th>
                    <th className="p-3">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosPendientes.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3">{user.nombre}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3 uppercase">{user.rol}</td>
                      <td className="p-3">
                        <button onClick={() => autorizarUsuario(user.id)} className="bg-green-500 text-white px-3 py-1 rounded">Autorizar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
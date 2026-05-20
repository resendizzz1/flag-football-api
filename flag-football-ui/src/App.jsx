import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';

function App() {
  const [view, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {view === 'home' && <Home setView={setView} />}
      {view === 'login' && <Login setView={setView} setAdminUser={setCurrentUser} />}
      {view === 'register' && <Register setView={setView} />}
      {view === 'admin' && <AdminPanel setView={setView} adminUser={currentUser} />}
      {view === 'dashboard' && (
        <div>
          <button 
            onClick={() => setView('home')} 
            style={{ margin: '1rem', padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#f3f4f6', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            ← Volver al Inicio
          </button>
          <Dashboard />
        </div>
      )}
    </>
  );
}

export default App;
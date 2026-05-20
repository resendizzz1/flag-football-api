import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [view, setView] = useState('home'); // 'home', 'login', o 'dashboard'

  return (
    <>
      {view === 'home' && <Home setView={setView} />}
      {view === 'login' && <Login setView={setView} />}
      {view === 'dashboard' && (
        <div>
          <button 
            onClick={() => setView('home')} 
            style={{ margin: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
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
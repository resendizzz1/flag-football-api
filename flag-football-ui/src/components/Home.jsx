import './Home.css';

function Home({ setView }) {
  const resultadosRecientes = [
    { id: 1, equipo1: 'PUMAS', score1: 35, equipo2: 'PANTHERS', score2: 21, fecha: '16 May 2026' },
    { id: 2, equipo1: 'LEONES', score1: 28, equipo2: 'VIKINGOS', score2: 14, fecha: '16 May 2026' },
    { id: 3, equipo1: 'TIGRES', score1: 14, equipo2: 'MAYAS', score2: 0, fecha: '15 May 2026' },
  ];

  const proximosPartidos = [
    { id: 1, equipo1: 'PUMAS', equipo2: 'LEONES', fecha: '23 May 2026', hora: '09:00 AM' },
    { id: 2, equipo1: 'PANTHERS', equipo2: 'MAYAS', fecha: '23 May 2026', hora: '10:30 AM' },
    { id: 3, equipo1: 'TIGRES', equipo2: 'VIKINGOS', fecha: '24 May 2026', hora: '08:00 AM' },
  ];

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <div className="nav-logo">LIGA FLAG 2026</div>
        <div className="nav-actions">
          <button className="btn-secondary" onClick={() => setView('dashboard')}>Dashboard</button>
          <button className="btn-primary" onClick={() => setView('login')}>Admin Login</button>
        </div>
      </nav>

      <header className="hero-section">
        <h1 className="hero-title">Liga Flag Football</h1>
        <p>Toda la información, resultados y estadísticas en tiempo real.</p>
      </header>

      <main className="content-grid">
        <section className="section-card">
          <h2 className="section-title">Resultados Recientes</h2>
          <div className="match-list">
            {resultadosRecientes.map(match => (
              <div key={match.id} className="match-item">
                <div className="match-teams">
                  <span>{match.equipo1}</span>
                  <span>{match.equipo2}</span>
                </div>
                <div className="match-teams" style={{ alignItems: 'flex-end' }}>
                  <span className="match-score">{match.score1}</span>
                  <span className="match-score">{match.score2}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <h2 className="section-title">Próximos Partidos</h2>
          <div className="match-list">
            {proximosPartidos.map(match => (
              <div key={match.id} className="match-item">
                <div className="match-teams">
                  <span>{match.equipo1} vs {match.equipo2}</span>
                  <span className="match-date">{match.fecha} - {match.hora}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
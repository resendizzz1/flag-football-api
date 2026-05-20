import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    fetch('http://13.223.53.28/api/equipos')
      .then(res => res.json())
      .then(data => setEquipos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        
        <div className="dashboard-header">
          <h1 className="dashboard-title">Tabla Posiciones</h1>
          <p className="dashboard-subtitle">Torneo Verano 2026 - Varonil</p>
          <a href="#" className="back-link">« atrás</a>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn">Rol de Juegos</button>
          <button className="nav-btn">Resultados</button>
          <button className="nav-btn active">Tabla Posiciones</button>
          <button className="nav-btn">Score Individual</button>
          <button className="nav-btn">Ofensiva / Defensiva</button>
          <button className="nav-btn">Concentrado</button>
          <button className="nav-btn">MVP</button>
        </div>

        <div className="table-section">
          <h2 className="stage-title">Etapa: Regular</h2>
          
          <div className="table-container">
            <table className="standings-table">
              <thead>
                <tr>
                  <th>Lugar</th>
                  <th>Equipo</th>
                  <th>JJ</th>
                  <th>JG</th>
                  <th>JE</th>
                  <th>JP</th>
                  <th>PF</th>
                  <th>PC</th>
                  <th>Dif</th>
                  <th>Avg</th>
                  <th>PA</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="category-row">
                  <td colSpan="12">VARONIL</td>
                </tr>
                
                {equipos.length > 0 ? (
                  equipos.map((equipo, index) => (
                    <tr key={equipo.id} className="team-row">
                      <td>{index + 1}</td>
                      <td className="team-name-cell">
                        {equipo.logo_url ? (
                          <img src={equipo.logo_url} alt={equipo.nombre} className="team-logo" />
                        ) : (
                          <div className="team-logo-placeholder">Logo</div>
                        )}
                        <span className="team-name">{equipo.nombre}</span>
                      </td>
                      <td>5</td>
                      <td>4</td>
                      <td>0</td>
                      <td>1</td>
                      <td>156</td>
                      <td>71</td>
                      <td>85</td>
                      <td>.800</td>
                      <td>0</td>
                      <td className="points-cell">12</td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-row">
                    <td colSpan="12">No hay equipos registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
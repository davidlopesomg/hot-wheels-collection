import { useEffect, useState } from 'react';
import { loadCollection, calculateStats } from '../utils/dataManager';
import { CollectionStats } from '../types';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState<CollectionStats | null>(null);

  useEffect(() => {
    const cars = loadCollection();
    const calculatedStats = calculateStats(cars);
    setStats(calculatedStats);
  }, []);

  if (!stats) {
    return <div className="dashboard loading">Loading...</div>;
  }

  const topBrands = Object.entries(stats.byBrand)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topColors = Object.entries(stats.byColor)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Minha Coleção</h1>
        <p className="subtitle">Estatísticas da coleção Hot Wheels</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total de Carros</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byBrand).length}</div>
          <div className="stat-label">Marcas Diferentes</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byYear).length}</div>
          <div className="stat-label">Anos Diferentes</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byColor).length}</div>
          <div className="stat-label">Cores Diferentes</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Top 5 Marcas</h2>
          <div className="chart-list">
            {topBrands.map(([brand, count]) => (
              <div key={brand} className="chart-item">
                <span className="chart-label">{brand}</span>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar" 
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
                <span className="chart-value">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h2>Top 5 Cores</h2>
          <div className="chart-list">
            {topColors.map(([color, count]) => (
              <div key={color} className="chart-item">
                <span className="chart-label">{color}</span>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar" 
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
                <span className="chart-value">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h2>Por Fabricante</h2>
          <div className="chart-list">
            {Object.entries(stats.byManufacturer)
              .sort(([, a], [, b]) => b - a)
              .map(([manufacturer, count]) => (
                <div key={manufacturer} className="chart-item">
                  <span className="chart-label">{manufacturer}</span>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar" 
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className="chart-value">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

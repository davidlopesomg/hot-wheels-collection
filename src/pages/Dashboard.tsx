import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadCollection, calculateStats } from '../utils/dataManager';
import { CollectionStats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#8DD1E1', '#D084D0', '#A4DE6C'];

const Dashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<CollectionStats | null>(null);
  const [allCars, setAllCars] = useState<any[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const cars = await loadCollection();
        setAllCars(cars);
        const calculatedStats = calculateStats(cars);
        setStats(calculatedStats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (allCars.length > 0) {
      const filteredCars = selectedManufacturer === 'all' 
        ? allCars 
        : allCars.filter(car => car.fabricante === selectedManufacturer);
      const calculatedStats = calculateStats(filteredCars);
      setStats(calculatedStats);
    }
  }, [selectedManufacturer, allCars]);

  if (loading || !stats) {
    return (
      <div className="dashboard loading">
        <div className="spinner"></div>
        <p>{t('dashboard.loading')}</p>
      </div>
    );
  }

  if (stats.total === 0) {
    return (
      <div className="dashboard empty">
        <div className="empty-state-dashboard">
          <div className="empty-icon">📦</div>
          <h2>{t('dashboard.empty.title')}</h2>
          <p>{t('dashboard.empty.message')}</p>
          <p>{t('dashboard.empty.hint')}</p>
        </div>
      </div>
    );
  }

  const topBrands = Object.entries(stats.byBrand)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topColors = Object.entries(stats.byColor)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topModels = Object.entries(stats.byModel)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Prepare data for pie chart
  const colorChartData = Object.entries(stats.byColor)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Get unique manufacturers for filter
  const manufacturers = Array.from(new Set(allCars.map(car => car.fabricante))).sort();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>{t('dashboard.title')}</h1>
        <p className="subtitle">{t('dashboard.subtitle')}</p>
        
        <div className="dashboard-filter">
          <label htmlFor="manufacturer-filter">{t('dashboard.filterByManufacturer')}:</label>
          <select 
            id="manufacturer-filter"
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className="manufacturer-filter-select"
          >
            <option value="all">{t('dashboard.allManufacturers')}</option>
            {manufacturers.map(manufacturer => (
              <option key={manufacturer} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">{t('dashboard.totalCars')}</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byBrand).length}</div>
          <div className="stat-label">{t('dashboard.differentBrands')}</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byModel).length}</div>
          <div className="stat-label">{t('dashboard.differentModels')}</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byYear).length}</div>
          <div className="stat-label">{t('dashboard.differentYears')}</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byColor).length}</div>
          <div className="stat-label">{t('dashboard.differentColors')}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>{t('dashboard.topBrands')}</h2>
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
          <h2>{t('dashboard.topModels')}</h2>
          <div className="chart-list">
            {topModels.map(([model, count]) => (
              <div key={model} className="chart-item">
                <span className="chart-label">{model}</span>
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
          <h2>{t('dashboard.topColors')}</h2>
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
          <h2>{t('dashboard.byManufacturer')}</h2>
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

      <div className="pie-chart-section">
        <div className="chart-card pie-chart-card">
          <h2>{t('dashboard.colorDistribution')}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={colorChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {colorChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number | undefined) => [`${value || 0} cars`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

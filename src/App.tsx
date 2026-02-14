import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import Scanner from './pages/Scanner';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/hot-wheels-collection">
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/scanner" element={<Scanner />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

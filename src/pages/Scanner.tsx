import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { loadCollection, searchCar } from '../utils/dataManager';
import { HotWheelsCar } from '../types';
import './Scanner.css';

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<HotWheelsCar | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [manualCode, setManualCode] = useState('');

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          handleScanResult(decodedText);
        },
        () => {
          // Scan error - ignore
        }
      );

      setIsScanning(true);
      setError('');
    } catch (err: any) {
      console.error("Scanner error:", err);
      setError('Erro ao acessar a câmera. Verifique as permissões.');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const handleScanResult = (code: string) => {
    const cars = loadCollection();
    const found = searchCar(cars, code);

    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }

    stopScanner();
  };

  const handleManualSearch = () => {
    if (!manualCode.trim()) return;
    handleScanResult(manualCode);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="scanner">
      <header className="scanner-header">
        <h1>Escanear Código</h1>
        <p className="subtitle">Escaneie o código de barras para verificar se já tem o carro</p>
      </header>

      <div className="scanner-container">
        <div id="qr-reader" className={isScanning ? 'active' : ''}></div>

        {!isScanning && !result && !notFound && (
          <div className="scanner-controls">
            <button onClick={startScanner} className="btn-primary">
              📷 Iniciar Scanner
            </button>

            <div className="manual-input">
              <p>ou digite o código manualmente:</p>
              <div className="input-group">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Digite o código"
                  onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                />
                <button onClick={handleManualSearch}>Pesquisar</button>
              </div>
            </div>
          </div>
        )}

        {isScanning && (
          <button onClick={stopScanner} className="btn-secondary">
            Cancelar
          </button>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {result && (
          <div className="result-card found">
            <div className="result-icon">✓</div>
            <h2>JÁ TENHO ESTE CARRO!</h2>
            <div className="car-details">
              <div className="detail-row">
                <span className="label">Marca:</span>
                <span className="value">{result.marca}</span>
              </div>
              <div className="detail-row">
                <span className="label">Modelo:</span>
                <span className="value">{result.modelo}</span>
              </div>
              <div className="detail-row">
                <span className="label">Ano:</span>
                <span className="value">{result.anoModelo}</span>
              </div>
              <div className="detail-row">
                <span className="label">Cor:</span>
                <span className="value">{result.corPrincipal}</span>
              </div>
              {result.coresSecundarias && (
                <div className="detail-row">
                  <span className="label">Cores Secundárias:</span>
                  <span className="value">{result.coresSecundarias}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="label">Código:</span>
                <span className="value">{result.codigo}</span>
              </div>
              {result.notasTema && (
                <div className="detail-row">
                  <span className="label">Notas:</span>
                  <span className="value">{result.notasTema}</span>
                </div>
              )}
            </div>
            <button onClick={() => { setResult(null); setManualCode(''); }} className="btn-primary">
              Escanear Outro
            </button>
          </div>
        )}

        {notFound && (
          <div className="result-card not-found">
            <div className="result-icon">✗</div>
            <h2>NÃO TENHO ESTE CARRO</h2>
            <p>Este carro não está na sua coleção. Pode comprar!</p>
            <button onClick={() => { setNotFound(false); setManualCode(''); }} className="btn-primary">
              Escanear Outro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;

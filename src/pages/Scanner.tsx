import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useLanguage } from '../contexts/LanguageContext';
import { loadCollection, searchCar } from '../utils/dataManager';
import { HotWheelsCar } from '../types';
import './Scanner.css';

const Scanner = () => {
  const { t } = useLanguage();
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
      setError(t('scanner.errors.camera'));
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
        <h1>{t('scanner.title')}</h1>
        <p className="subtitle">{t('scanner.subtitle')}</p>
      </header>

      <div className="scanner-container">
        <div id="qr-reader" className={isScanning ? 'active' : ''}></div>

        {!isScanning && !result && !notFound && (
          <div className="scanner-controls">
            <button onClick={startScanner} className="btn-primary">
              📷 {t('scanner.startScanner')}
            </button>

            <div className="manual-input">
              <p>{t('scanner.manualInput')}</p>
              <div className="input-group">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder={t('scanner.enterCode')}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                />
                <button onClick={handleManualSearch}>{t('scanner.search')}</button>
              </div>
            </div>
          </div>
        )}

        {isScanning && (
          <button onClick={stopScanner} className="btn-secondary">
            {t('scanner.cancel')}
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
            <h2>{t('scanner.found.title')}</h2>
            <div className="car-details">
              <div className="detail-row">
                <span className="label">{t('scanner.found.brand')}</span>
                <span className="value">{result.marca}</span>
              </div>
              <div className="detail-row">
                <span className="label">{t('scanner.found.model')}</span>
                <span className="value">{result.modelo}</span>
              </div>
              <div className="detail-row">
                <span className="label">{t('scanner.found.year')}</span>
                <span className="value">{result.anoModelo}</span>
              </div>
              <div className="detail-row">
                <span className="label">{t('scanner.found.color')}</span>
                <span className="value">{result.corPrincipal}</span>
              </div>
              {result.coresSecundarias && (
                <div className="detail-row">
                  <span className="label">{t('scanner.found.secondaryColors')}</span>
                  <span className="value">{result.coresSecundarias}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="label">{t('scanner.found.code')}</span>
                <span className="value">{result.codigo}</span>
              </div>
              {result.notasTema && (
                <div className="detail-row">
                  <span className="label">{t('scanner.found.notes')}</span>
                  <span className="value">{result.notasTema}</span>
                </div>
              )}
            </div>
            <button onClick={() => { setResult(null); setManualCode(''); }} className="btn-primary">
              {t('scanner.scanAnother')}
            </button>
          </div>
        )}

        {notFound && (
          <div className="result-card not-found">
            <div className="result-icon">✗</div>
            <h2>{t('scanner.notFound.title')}</h2>
            <p>{t('scanner.notFound.message')}</p>
            <button onClick={() => { setNotFound(false); setManualCode(''); }} className="btn-primary">
              {t('scanner.scanAnother')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;

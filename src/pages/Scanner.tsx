import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useLanguage } from '../contexts/LanguageContext';
import { loadCollection, searchCar, addCar } from '../utils/dataManager';
import { trackBarcodeScan, trackCarAdd } from '../utils/analytics';
import { HotWheelsCar } from '../types';
import AddCarForm from '../components/AddCarForm';
import OCRScanner from '../components/OCRScanner';
import './Scanner.css';

const Scanner = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<HotWheelsCar | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [scannedUPC, setScannedUPC] = useState('');
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [addFormCode, setAddFormCode] = useState('');
  const [addFormUPC, setAddFormUPC] = useState('');

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

  const handleScanResult = async (code: string) => {
    try {
      const cars = await loadCollection();
      const found = searchCar(cars, code);

      if (found) {
        setResult(found);
        setNotFound(false);
        setScannedCode('');
        setScannedUPC('');
        trackBarcodeScan(true);
      } else {
        // Not found - check if this looks like a UPC code (numeric, 12-13 digits)
        const isUPC = /^\d{12,13}$/.test(code);
        
        if (isUPC) {
          // Step 1 complete: UPC scanned but not found
          // Save UPC and prompt for Step 2: OCR scan
          setScannedUPC(code);
          setResult(null);
          setNotFound(true);
          setScannedCode('');
          trackBarcodeScan(false);
        } else {
          // Looks like a product code (not UPC)
          setResult(null);
          setNotFound(true);
          setScannedCode(code);
          setScannedUPC('');
          trackBarcodeScan(false);
        }
      }

      stopScanner();
    } catch (error) {
      console.error('Error searching for car:', error);
      setError(t('scanner.errors.search') || 'Error searching collection');
    }
  };

  const handleOCRResult = (productCode: string) => {
    setScannedCode(productCode);
    setShowOCRScanner(false);
    // Open add form with both UPC and product code
    openAddForm(productCode, scannedUPC);
  };

  const openOCRScanner = () => {
    setShowOCRScanner(true);
  };

  const closeOCRScanner = () => {
    setShowOCRScanner(false);
  };

  const handleAddCar = async (car: HotWheelsCar) => {
    try {
      await addCar(car);
      // Track if added from scan or manual entry
      const method = scannedCode || scannedUPC ? 'scan' : 'manual';
      trackCarAdd(method);
      setShowAddForm(false);
      setNotFound(false);
      setScannedCode('');
      setScannedUPC('');
      setAddFormCode('');
      setAddFormUPC('');
      setManualCode('');
      // Show success message
      alert(t('scanner.addCar.success'));
    } catch (error) {
      console.error('Error adding car:', error);
      alert(t('scanner.addCar.error'));
    }
  };

  const openAddForm = (code: string = '', upc: string = '') => {
    setAddFormCode(code);
    setAddFormUPC(upc);
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setAddFormCode('');
    setAddFormUPC('');
  };

  const resetScanner = () => {
    setResult(null);
    setNotFound(false);
    setScannedCode('');
    setScannedUPC('');
    setManualCode('');
  };

  const handleManualSearch = () =>{
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

            <div className="add-manual-section">
              <p>{t('scanner.addManual.text')}</p>
              <button onClick={() => openAddForm()} className="btn-add-manual">
                ➕ {t('scanner.addManual.button')}
              </button>
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
            <button onClick={resetScanner} className="btn-primary">
              {t('scanner.scanAnother')}
            </button>
          </div>
        )}

        {notFound && (
          <div className="result-card not-found">
            <div className="result-icon">✗</div>
            <h2>{t('scanner.notFound.title')}</h2>
            {scannedUPC && (
              <p className="scanned-info">
                {t('scanner.notFound.scannedCode')}: <strong>{scannedUPC}</strong> (UPC)
              </p>
            )}
            {scannedCode && (
              <p className="scanned-info">
                {t('scanner.notFound.scannedCode')}: <strong>{scannedCode}</strong>
              </p>
            )}
            <p>{t('scanner.notFound.message')}</p>
            <div className="not-found-actions">
              {scannedUPC && !scannedCode && (
                <button onClick={openOCRScanner} className="btn-ocr">
                  📷 {t('scanner.ocr.scanProductCode')}
                </button>
              )}
              <button onClick={() => openAddForm(scannedCode, scannedUPC)} className="btn-add">
                ➕ {t('scanner.notFound.addButton')}
              </button>
              <button onClick={resetScanner} className="btn-secondary">
                {t('scanner.scanAnother')}
              </button>
            </div>
          </div>
        )}
      </div>

      {showOCRScanner && (
        <OCRScanner 
          onCodeDetected={handleOCRResult}
          onCancel={closeOCRScanner}
        />
      )}

      {showAddForm && (
        <AddCarForm
          scannedCode={addFormCode}
          scannedUPC={addFormUPC}
          onSave={handleAddCar}
          onCancel={closeAddForm}
        />
      )}
    </div>
  );
};

export default Scanner;

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadCollection, addCar } from '../utils/dataManager';
import { trackBarcodeScan, trackCarAdd } from '../utils/analytics';
import { HotWheelsCar } from '../types';
import { parseBaseCode } from '../utils/codeParser';
import AddCarForm from '../components/AddCarForm';
import OCRScanner from '../components/OCRScanner';
import './Scanner.css';

const Scanner = () => {
  const { t } = useLanguage();
  const [result, setResult] = useState<HotWheelsCar | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [parsedCode, setParsedCode] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [manualCode, setManualCode] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [addFormCode, setAddFormCode] = useState('');

  const handleOCRResult = async (baseCode: string) => {
    try {
      setShowOCRScanner(false);

      // Parse the base code
      const parsed = parseBaseCode(baseCode);
      setParsedCode(parsed);
      setScannedCode(baseCode);

      // Search for car by collector number (most reliable identifier)
      const cars = await loadCollection();
      let found: HotWheelsCar | null = null;

      if (parsed.collectorNumber) {
        // Primary search: by collector number
        found = cars.find(car => 
          car.collectorNumber === parsed.collectorNumber
        ) || null;

        // Fallback: search by full code match
        if (!found) {
          found = cars.find(car => 
            car.codigo.includes(parsed.collectorNumber || '')
          ) || null;
        }
      }

      // Secondary fallback: search by any part of the code
      if (!found && baseCode) {
        found = cars.find(car => 
          car.codigo.toLowerCase().includes(baseCode.toLowerCase())
        ) || null;
      }

      if (found) {
        setResult(found);
        setNotFound(false);
        trackBarcodeScan(true);
      } else {
        setResult(null);
        setNotFound(true);
        trackBarcodeScan(false);
      }
    } catch (error) {
      console.error('Error searching for car:', error);
      setError(t('scanner.errors.search') || 'Error searching collection');
    }
  };

  const openOCRScanner = () => {
    setShowOCRScanner(true);
    setError('');
  };

  const closeOCRScanner = () => {
    setShowOCRScanner(false);
  };

  const handleAddCar = async (car: HotWheelsCar) => {
    try {
      // Enrich car data with parsed code information
      const enrichedCar = { ...car };
      if (parsedCode) {
        enrichedCar.seriesCode = parsedCode.seriesCode;
        enrichedCar.collectorNumber = parsedCode.collectorNumber;
        enrichedCar.productionYear = parsedCode.productionYear;
        enrichedCar.factoryCode = parsedCode.factoryCode;
      }

      await addCar(enrichedCar);
      const method = scannedCode ? 'scan' : 'manual';
      trackCarAdd(method);
      setShowAddForm(false);
      setNotFound(false);
      setScannedCode('');
      setParsedCode(null);
      setAddFormCode('');
      setManualCode('');
      alert(t('scanner.addCar.success'));
    } catch (error) {
      console.error('Error adding car:', error);
      alert(t('scanner.addCar.error'));
    }
  };

  const openAddForm = (code: string = '') => {
    setAddFormCode(code);
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setAddFormCode('');
  };

  const resetScanner = () => {
    setResult(null);
    setNotFound(false);
    setScannedCode('');
    setParsedCode(null);
    setManualCode('');
    setError('');
  };

  const handleManualSearch = async () => {
    if (!manualCode.trim()) return;
    await handleOCRResult(manualCode);
  };

  return (
    <div className="scanner">
      <header className="scanner-header">
        <h1>{t('scanner.title')}</h1>
        <p className="subtitle">{t('scanner.subtitle')}</p>
      </header>

      <div className="scanner-container">
        {!result && !notFound && (
          <div className="scanner-controls">
            <div className="ocr-scan-section">
              <p>{t('scanner.ocr.instruction')}</p>
              <button onClick={openOCRScanner} className="btn-primary">
                📷 {t('scanner.ocr.scanButton')}
              </button>
            </div>

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

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {result && (
          <div className="result-card found">
            <div className="result-icon">✓</div>
            <h2>{t('scanner.found.title')}</h2>
            
            {parsedCode && (
              <div className="code-breakdown">
                <h3>{t('scanner.found.codeBreakdown')}</h3>
                {parsedCode.seriesCode && (
                  <div className="code-part">
                    <span className="code-label">{t('scanner.found.seriesCode')}:</span>
                    <span className="code-value">{parsedCode.seriesCode}</span>
                  </div>
                )}
                {parsedCode.collectorNumber && (
                  <div className="code-part highlight">
                    <span className="code-label">{t('scanner.found.collectorNumber')}:</span>
                    <span className="code-value">{parsedCode.collectorNumber}</span>
                  </div>
                )}
                {parsedCode.productionYear && (
                  <div className="code-part">
                    <span className="code-label">{t('scanner.found.productionYear')}:</span>
                    <span className="code-value">20{parsedCode.productionYear}</span>
                  </div>
                )}
                {parsedCode.factoryCode && (
                  <div className="code-part">
                    <span className="code-label">{t('scanner.found.factoryCode')}:</span>
                    <span className="code-value">{parsedCode.factoryCode}</span>
                  </div>
                )}
              </div>
            )}
            
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
            {scannedCode && (
              <>
                <p className="scanned-info">
                  {t('scanner.notFound.scannedCode')}: <strong>{scannedCode}</strong>
                </p>
                {parsedCode && parsedCode.collectorNumber && (
                  <div className="code-info">
                    <p>{t('scanner.notFound.collectorNumber')}: <strong>{parsedCode.collectorNumber}</strong></p>
                  </div>
                )}
              </>
            )}
            <p>{t('scanner.notFound.message')}</p>
            <div className="not-found-actions">
              <button onClick={() => openAddForm(scannedCode)} className="btn-add">
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
          onSave={handleAddCar}
          onCancel={closeAddForm}
        />
      )}
    </div>
  );
};

export default Scanner;

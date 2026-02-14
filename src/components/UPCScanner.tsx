import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useLanguage } from '../contexts/LanguageContext';
import './UPCScanner.css';

interface UPCScannerProps {
  onBarcodeDetected: (barcode: string) => void;
  onCancel: () => void;
}

const UPCScanner = ({ onBarcodeDetected, onCancel }: UPCScannerProps) => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [manualUPC, setManualUPC] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerIdRef = useRef<string>('upc-reader');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Detect if running on mobile device
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    // On mobile devices, use file input with capture instead of html5-qrcode
    if (isMobileDevice) {
      fileInputRef.current?.click();
      return;
    }
    
    try {
      setError('');
      setIsScanning(true);

      const scanner = new Html5Qrcode(scannerIdRef.current);
      scannerRef.current = scanner;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 150 },
        aspectRatio: 16/9,
        formatsToSupport: [
          // @ts-ignore - html5-qrcode types may not include all formats
          'UPC_A',
          'UPC_E',
          'EAN_13',
          'EAN_8',
          'CODE_128',
          'CODE_39'
        ]
      };

      // Try rear camera first, fallback to any available camera
      try {
        await scanner.start(
          { facingMode: { ideal: 'environment' } },
          config,
          (decodedText) => {
            // Barcode successfully scanned
            onBarcodeDetected(decodedText);
            stopScanner();
          },
          (_errorMessage) => {
            // Scanning errors (ignore these as they're frequent during scanning)
          }
        );
      } catch (e) {
        // Fallback: try without camera constraint if rear camera fails
        console.log('Rear camera not available, trying default camera');
        await scanner.start(
          { facingMode: 'user' }, // Use front camera as fallback
          config,
          (decodedText) => {
            onBarcodeDetected(decodedText);
            stopScanner();
          },
          (_errorMessage) => {
            // Scanning errors
          }
        );
      }
    } catch (err: any) {
      console.error('Scanner start error:', err);
      setError(err.message || t('admin.manufacturers.errors.camera') || 'Failed to start camera');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        const isScanning = scannerRef.current.getState() === 2; // SCANNING state
        if (isScanning) {
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      const scanner = new Html5Qrcode(scannerIdRef.current);
      scannerRef.current = scanner;

      const result = await scanner.scanFile(file, true);
      onBarcodeDetected(result);
      stopScanner();
    } catch (err: any) {
      console.error('File scan error:', err);
      setError(t('admin.manufacturers.errors.noBarcode') || 'No barcode found in image');
    }
  };

  const handleManualSubmit = () => {
    if (manualUPC.trim()) {
      onBarcodeDetected(manualUPC.trim());
    }
  };

  const handleCancel = () => {
    stopScanner();
    onCancel();
  };

  return (
    <div className="upc-scanner-overlay">
      <div className="upc-scanner-container">
        <div className="scanner-header">
          <h2>{t('admin.manufacturers.scanUPC')}</h2>
          <button className="btn-close" onClick={handleCancel}>×</button>
        </div>

        <div className="scanner-content">
          {/* Camera Scanner */}
          <div className="scanner-section">
            <h3>{isMobileDevice ? (t('admin.manufacturers.takePicture') || 'Take Picture of Barcode') : (t('admin.manufacturers.scanWithCamera') || 'Scan with Camera')}</h3>
            <div id={scannerIdRef.current} className="scanner-viewport"></div>
            
            {!isScanning && (
              <button 
                onClick={startScanner} 
                className="btn-primary btn-scan"
              >
                📷 {isMobileDevice ? (t('admin.manufacturers.takePicture') || 'Take Picture') : (t('admin.manufacturers.startScanning') || 'Start Scanning')}
              </button>
            )}

            {isScanning && (
              <button 
                onClick={stopScanner} 
                className="btn-secondary btn-scan"
              >
                ⏹ {t('admin.manufacturers.stopScanning') || 'Stop Scanning'}
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="scanner-divider">
            <span>{t('admin.manufacturers.or') || 'or'}</span>
          </div>

          {/* File Upload */}
          <div className="scanner-section">
            <h3>{t('admin.manufacturers.uploadImage') || 'Upload Image'}</h3>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="file-input"
              style={isMobileDevice ? { display: 'none' } : {}}
            />
            {isMobileDevice && (
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="btn-secondary btn-scan"
              >
                🖼️ {t('admin.manufacturers.chooseFromGallery') || 'Choose from Gallery'}
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="scanner-divider">
            <span>{t('admin.manufacturers.or')}</span>
          </div>

          {/* Manual Entry */}
          <div className="scanner-section">
            <h3>{t('admin.manufacturers.enterManually')}</h3>
            <div className="manual-input-group">
              <input
                type="text"
                value={manualUPC}
                onChange={(e) => setManualUPC(e.target.value)}
                placeholder={t('admin.manufacturers.upcPlaceholder')}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
              />
              <button 
                onClick={handleManualSubmit}
                className="btn-primary"
                disabled={!manualUPC.trim()}
              >
                ✓ {t('admin.manufacturers.submit')}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {/* Instructions */}
          <div className="scanner-instructions">
            <p>💡 {t('admin.manufacturers.upcInstructions')}</p>
          </div>
        </div>

        <div className="scanner-footer">
          <button onClick={handleCancel} className="btn-secondary btn-cancel">
            {t('scanner.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UPCScanner;

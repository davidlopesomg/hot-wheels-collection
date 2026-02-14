import { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { useLanguage } from '../contexts/LanguageContext';
import './OCRScanner.css';

interface OCRScannerProps {
  onCodeDetected: (code: string) => void;
  onCancel: () => void;
}

const OCRScanner = ({ onCodeDetected, onCancel }: OCRScannerProps) => {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [detectedText, setDetectedText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Pattern for Hot Wheels product codes: XXX##-N### ##A or similar
  const extractProductCode = (text: string): string | null => {
    // Remove whitespace and newlines for processing
    const cleanText = text.replace(/\s+/g, ' ').trim();
    
    // Common Hot Wheels code patterns
    const patterns = [
      /([A-Z]{3}\d{2}-[A-Z]\d{3}\s*\d{2}[A-Z])/i,  // JBC17-N521 21A
      /([A-Z]{3}\d{2}-[A-Z]\d{3})/i,                // HTB04-N521
      /([A-Z]{5}-[A-Z]\d{3}\s*\d{2}[A-Z])/i,        // HYY83-N521 21A
      /([A-Z]{3}\d{2}\s+[A-Z]\d{3}\s*\d{2}[A-Z])/i, // Alternative spacing
    ];

    for (const pattern of patterns) {
      const match = cleanText.match(pattern);
      if (match) {
        return match[1].replace(/\s+/g, ' ').trim();
      }
    }

    return null;
  };

  const startCamera = async () => {
    try {
      setError('');
      
      // First try with rear camera preference
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
      } catch (e) {
        // Fallback: try without facingMode constraint
        console.log('Rear camera not available, trying default camera');
        stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('webkit-playsinline', 'true');
        await videoRef.current.play();
        streamRef.current = stream;
        setIsCameraActive(true);
        setError('');
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      let errorMessage = t('scanner.errors.camera') || 'Failed to access camera';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = t('scanner.errors.permission') || 'Camera permission denied. Please allow camera access in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = t('scanner.errors.noCamera') || 'No camera found on this device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = t('scanner.errors.cameraInUse') || 'Camera is already in use by another application.';
      }
      
      setError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/png');
    setPreviewImage(imageData);
    stopCamera();
    processImage(imageData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setPreviewImage(imageData);
      processImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    setProgress(0);
    setError('');
    setDetectedText('');

    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      // Configure Tesseract for better recognition of product codes
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ',
      });

      const { data: { text } } = await worker.recognize(imageData);
      setDetectedText(text);

      const productCode = extractProductCode(text);
      
      await worker.terminate();
      setIsProcessing(false);

      if (productCode) {
        onCodeDetected(productCode);
      } else {
        setError(t('scanner.ocr.noCodeFound') || 'No product code found. Please try again.');
      }
    } catch (err) {
      console.error('OCR error:', err);
      setError(t('scanner.ocr.error') || 'Failed to process image');
      setIsProcessing(false);
    }
  };

  const handleManualEntry = (code: string) => {
    if (code.trim()) {
      onCodeDetected(code.trim());
    }
  };

  return (
    <div className="ocr-scanner-overlay">
      <div className="ocr-scanner-modal">
        <div className="ocr-header">
          <h2>{t('scanner.ocr.title') || 'Scan Product Code'}</h2>
          <button className="close-btn" onClick={onCancel} disabled={isProcessing}>✕</button>
        </div>

        <div className="ocr-content">
          <p className="ocr-instructions">
            {t('scanner.ocr.instructions') || 'Photograph the red product code on the package (e.g., JBC17-N521 21A)'}
          </p>

          {!previewImage && !isCameraActive && (
            <div className="ocr-options">
              <button className="btn-camera" onClick={startCamera}>
                📷 {t('scanner.ocr.useCamera') || 'Use Camera'}
              </button>
              <button className="btn-upload" onClick={() => fileInputRef.current?.click()}>
                🖼️ {t('scanner.ocr.uploadImage') || 'Upload Image'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          )}

          {isCameraActive && (
            <div className="camera-view">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="video-preview"
              />
              <div className="camera-overlay">
                <div className="scan-frame"></div>
                <p className="scan-hint">{t('scanner.ocr.alignCode') || 'Align product code in frame'}</p>
              </div>
              <div className="camera-controls">
                <button className="btn-capture" onClick={captureImage}>
                  📸 {t('scanner.ocr.capture') || 'Capture'}
                </button>
                <button className="btn-cancel" onClick={stopCamera}>
                  {t('scanner.cancel') || 'Cancel'}
                </button>
              </div>
            </div>
          )}

          {previewImage && (
            <div className="preview-section">
              <img src={previewImage} alt="Preview" className="image-preview" />
            </div>
          )}

          {isProcessing && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>{t('scanner.ocr.processing') || 'Processing image...'}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="progress-text">{progress}%</p>
            </div>
          )}

          {detectedText && !isProcessing && (
            <div className="detected-text">
              <h3>{t('scanner.ocr.detectedText') || 'Detected Text:'}</h3>
              <pre>{detectedText}</pre>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              {error}
              <button 
                className="btn-retry" 
                onClick={() => {
                  setError('');
                  setPreviewImage('');
                  setDetectedText('');
                }}
              >
                {t('scanner.ocr.retry') || 'Try Again'}
              </button>
            </div>
          )}

          {error && (
            <div className="manual-entry">
              <p>{t('scanner.ocr.manualEntry') || 'Or enter the code manually:'}</p>
              <input
                type="text"
                placeholder="JBC17-N521 21A"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleManualEntry((e.target as HTMLInputElement).value);
                  }
                }}
                className="manual-code-input"
              />
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default OCRScanner;

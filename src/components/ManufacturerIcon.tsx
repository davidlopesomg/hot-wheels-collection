import { useState, useEffect } from 'react';
import { loadManufacturers } from '../utils/manufacturerManager';
import { Manufacturer } from '../types';
import './ManufacturerIcon.css';

interface ManufacturerIconProps {
  manufacturerName: string;
  size?: number;
  showTooltip?: boolean;
}

const ManufacturerIcon = ({ manufacturerName, size = 32, showTooltip = true }: ManufacturerIconProps) => {
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadManufacturerData = async () => {
      try {
        const manufacturers = await loadManufacturers();
        const foundManufacturer = manufacturers.find(m => m.name.toLowerCase() === manufacturerName.toLowerCase());
        setManufacturer(foundManufacturer || null);
      } catch (error) {
        console.error('Error loading manufacturer:', error);
      } finally {
        setLoading(false);
      }
    };
    loadManufacturerData();
  }, [manufacturerName]);

  if (loading) {
    return <span className="manufacturer-icon-text">{manufacturerName}</span>;
  }

  if (!manufacturer) {
    return <span className="manufacturer-icon-text">{manufacturerName}</span>;
  }

  const getTooltipContent = () => {
    const parts = [manufacturer.name];
    if (manufacturer.upc) {
      parts.push(`UPC: ${manufacturer.upc}`);
    }
    return parts.join('\n');
  };

  // Render logo URL
  if (manufacturer.logoUrl) {
    return (
      <div 
        className="manufacturer-icon-container" 
        title={showTooltip ? getTooltipContent() : undefined}
        tabIndex={0}
        role="img"
        aria-label={getTooltipContent()}
      >
        <img 
          src={manufacturer.logoUrl} 
          alt={manufacturer.name}
          className="manufacturer-icon-img"
          style={{ width: size, height: size }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.classList.add('icon-error');
          }}
        />
      </div>
    );
  }

  // Fallback to text
  return <span className="manufacturer-icon-text" title={showTooltip ? getTooltipContent() : undefined}>{manufacturerName}</span>;
};

export default ManufacturerIcon;

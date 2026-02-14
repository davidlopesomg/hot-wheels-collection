import { useState, useEffect } from 'react';
import { loadBrands } from '../utils/brandManager';
import { Brand } from '../types';
import { getIconData } from '../utils/iconHelper';
import './BrandIcon.css';

interface BrandIconProps {
  brandName: string;
  size?: number;
  showTooltip?: boolean;
}

const BrandIcon = ({ brandName, size = 32, showTooltip = true }: BrandIconProps) => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrandData = async () => {
      try {
        const brands = await loadBrands();
        const foundBrand = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
        setBrand(foundBrand || null);
      } catch (error) {
        console.error('Error loading brand:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBrandData();
  }, [brandName]);

  if (loading) {
    return <span className="brand-icon-text">{brandName}</span>;
  }

  if (!brand) {
    return <span className="brand-icon-text">{brandName}</span>;
  }

  const getTooltipContent = () => {
    const parts = [brand.name];
    if (brand.countryCode) {
      parts.push(`🌍 ${brand.countryCode}`);
    }
    if (brand.description) {
      parts.push(brand.description);
    }
    return parts.join('\n');
  };

  // Render simple-icons SVG
  if (brand.iconSlug) {
    const iconData = getIconData(brand.iconSlug);
    if (iconData) {
      return (
        <div 
          className="brand-icon-container" 
          title={showTooltip ? getTooltipContent() : undefined}
          tabIndex={0}
          role="img"
          aria-label={getTooltipContent()}
        >
          <div 
            className="brand-icon-svg" 
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{
              __html: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <title>${iconData.title}</title>
                <path d="${iconData.path}"/>
              </svg>`
            }}
          />
        </div>
      );
    }
  }

  // Render logo URL
  if (brand.logoUrl) {
    return (
      <div 
        className="brand-icon-container" 
        title={showTooltip ? getTooltipContent() : undefined}
        tabIndex={0}
        role="img"
        aria-label={getTooltipContent()}
      >
        <img 
          src={brand.logoUrl} 
          alt={brand.name}
          className="brand-icon-img"
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
  return <span className="brand-icon-text" title={showTooltip ? getTooltipContent() : undefined}>{brandName}</span>;
};

export default BrandIcon;

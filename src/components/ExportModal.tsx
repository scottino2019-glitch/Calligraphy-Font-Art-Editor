import React, { useState } from 'react';
import { Layer, CanvasBackground, Language } from '../types';
import { TRANSLATIONS } from './Language';
import { SWASH_PATHS } from './VectorPaths';
import { Download, Copy, Check, FileCode, ImageIcon, Sparkles, X } from 'lucide-react';

interface ExportModalProps {
  layers: Layer[];
  background: CanvasBackground;
  lang: Language;
  onClose: () => void;
}

export default function ExportModal({
  layers,
  background,
  lang,
  onClose,
}: ExportModalProps) {
  const [format, setFormat] = useState<'svg' | 'png' | 'jpeg'>('svg');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];

  // Helper to compile SVG XML String with embedded Google Fonts CSS
  const generateSvgString = () => {
    // Unique list of fonts used
    const uniqueFonts = Array.from(
      new Set(
        layers
          .filter(l => l.type === 'text')
          .map(l => (l as any).fontFamily)
      )
    );

    const fontImportQuery = uniqueFonts
      .map(f => `family=${f.replace(/ /g, '+')}`)
      .join('&');

    const fontImportStyles = uniqueFonts.length > 0 
      ? `@import url('https://fonts.googleapis.com/css2?${fontImportQuery}&amp;display=swap');`
      : `@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&amp;family=Sacramento&amp;family=Dancing+Script&amp;family=Alex+Brush&amp;family=Pinyon+Script&amp;family=Allura&amp;family=Monsieur+La+Doulaise&amp;family=Rochester&amp;family=Parisienne&amp;family=Arizonia&amp;family=Mrs+Saint+Delafield&amp;family=Reenie+Beanie&amp;display=swap');`;

    // 1. Build Gradient and Texture definitions
    let defsContent = `
    <defs>
      <linearGradient id="canvas-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${background.color1}" />
        <stop offset="100%" stop-color="${background.color2}" />
      </linearGradient>

      <pattern id="pat-linen" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill="${background.color1}" />
        <line x1="0" y1="15" x2="30" y2="15" stroke="${background.color2}" stroke-width="1.2" opacity="0.4" />
        <line x1="15" y1="0" x2="15" y2="30" stroke="${background.color2}" stroke-width="1.2" opacity="0.4" />
        <line x1="0" y1="7" x2="30" y2="7" stroke="${background.color2}" stroke-width="0.6" opacity="0.25" />
        <line x1="7" y1="0" x2="7" y2="30" stroke="${background.color2}" stroke-width="0.6" opacity="0.25" />
      </pattern>

      <pattern id="pat-kraft" width="200" height="200" patternUnits="userSpaceOnUse">
        <rect width="200" height="200" fill="#ccb091" />
        <g opacity="0.4" stroke="#bf9d7a" stroke-width="0.8" fill="none">
          <path d="M 0,20 Q 50,30 100,15 T 200,20" />
          <path d="M 10,70 Q 60,65 120,75 T 200,68" />
          <path d="M 0,130 Q 80,140 130,120 T 200,135" />
          <path d="M 30,180 Q 90,170 150,185 T 200,175" />
        </g>
        <g opacity="0.6" stroke="#b28e67" stroke-width="0.5" fill="none">
          <path d="M 40,0 L 41,200" stroke-dasharray="1,15" />
          <path d="M 120,0 L 122,200" stroke-dasharray="2,20" />
          <path d="M 180,0 L 181,200" stroke-dasharray="1,12" />
        </g>
      </pattern>

      <pattern id="pat-chalkboard" width="300" height="300" patternUnits="userSpaceOnUse">
        <rect width="300" height="300" fill="#1b1d20" />
        <circle cx="45" cy="80" r="1.5" fill="#ffffff" opacity="0.08" />
        <circle cx="180" cy="220" r="2.5" fill="#ffffff" opacity="0.05" />
        <circle cx="260" cy="50" r="1.2" fill="#ffffff" opacity="0.07" />
        <circle cx="90" cy="200" r="2.0" fill="#ffffff" opacity="0.06" />
        <path d="M 20,40 Q 60,80 140,50 T 280,120" stroke="#ffffff" stroke-width="15" fill="none" opacity="0.02" />
        <path d="M 50,220 Q 150,180 230,240 T 290,160" stroke="#ffffff" stroke-width="25" fill="none" opacity="0.015" />
      </pattern>
    </defs>
    `;

    // Background color
    let fillStyle = background.color1;
    if (background.type === 'gradient') {
      fillStyle = 'url(#canvas-grad)';
    } else if (background.type === 'texture') {
      fillStyle = background.texturePattern === 'watercolor' ? 'url(#canvas-grad)' : `url(#pat-${background.texturePattern})`;
    }

    // Convert SVG layers to strings
    const layersStrings = layers
      .filter(l => l.opacity > 0)
      .map(layer => {
        let content = '';
        if (layer.type === 'text') {
          content = `<text x="0" y="0" fill="${layer.color}" font-size="${layer.fontSize}" font-family="'${layer.fontFamily}', cursive" letter-spacing="${layer.letterSpacing}" font-weight="${layer.bold ? 'bold' : 'normal'}" font-style="${layer.italic ? 'italic' : 'normal'}" text-anchor="middle" dominant-baseline="middle">${layer.text}</text>`;
        } else if (layer.type === 'swash') {
          const swashDef = SWASH_PATHS[layer.swashType];
          if (swashDef) {
            // we render paths by converting standard TSX rendering to raw SVG path string
            if (layer.swashType === 'heart_left') {
              content = `<path d="M 10,70 Q 35,40 50,40 C 65,40 75,55 70,70 C 65,85 45,95 40,75 C 35,55 60,35 75,35 Q 110,35 140,50 L 195,50" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'heart_right') {
              content = `<path d="M 5,50 L 60,50 Q 90,65 125,65 C 140,65 165,45 160,30 C 155,15 135,25 130,45 C 125,65 145,85 160,85 C 175,85 190,55 195,30" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'wave_left') {
              content = `<path d="M 10,30 C 50,20 10,80 80,75 C 130,70 140,50 195,50" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'wave_right') {
              content = `<path d="M 5,50 C 60,50 70,30 120,25 C 190,20 150,80 190,70" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'loop_left') {
              content = `<path d="M 15,50 C 45,90 90,10 115,50 C 135,80 160,50 195,50" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'loop_right') {
              content = `<path d="M 5,50 C 40,50 65,20 85,50 C 110,90 155,10 185,50" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'divider_wave') {
              content = `<path d="M 10,50 Q 100,20 200,50 T 390,50 M 180,50 C 190,35 210,35 220,50 C 210,65 190,65 180,50 Z" fill="${layer.color}" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'underline_swoosh') {
              content = `<path d="M 10,20 C 50,85 240,85 290,15 C 250,55 90,65 20,45" fill="${layer.color}" stroke="${layer.color}" stroke-width="${layer.strokeWidth / 2}" stroke-linecap="round" stroke-linejoin="round" />`;
            } else if (layer.swashType === 'scroll_curly') {
              content = `<path d="M 20,20 C 5,35 15,65 35,60 C 55,55 35,25 65,35 C 95,45 115,75 145,70 C 175,65 185,45 170,35 C 155,25 140,55 165,65" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
            }
          }
        } else if (layer.type === 'frame') {
          if (layer.frameType === 'laurel_wreath') {
            content = `
            <g fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}">
              <path d="M 100,180 A 80,80 0 0,1 40,60" stroke-linecap="round" />
              <path d="M 40,60 C 35,50 25,55 30,65 C 35,75 45,70 40,60 Z" fill="${layer.color}" />
              <path d="M 45,90 C 35,85 30,95 40,100 C 50,105 50,95 45,90 Z" fill="${layer.color}" />
              <path d="M 55,120 C 45,115 42,125 50,130 C 58,135 60,125 55,120 Z" fill="${layer.color}" />
              <path d="M 75,155 C 65,150 60,160 70,165 C 80,170 82,160 75,155 Z" fill="${layer.color}" />
              <path d="M 100,180 A 80,80 0 0,0 160,60" stroke-linecap="round" />
              <path d="M 160,60 C 165,50 175,55 170,65 C 165,75 155,70 160,60 Z" fill="${layer.color}" />
              <path d="M 155,90 C 165,85 170,95 160,100 C 150,105 150,95 155,90 Z" fill="${layer.color}" />
              <path d="M 145,120 C 155,115 158,125 150,130 C 142,135 140,125 145,120 Z" fill="${layer.color}" />
              <path d="M 125,155 C 135,150 140,160 130,165 C 120,170 118,160 125,155 Z" fill="${layer.color}" />
            </g>`;
          } else if (layer.frameType === 'botanical_corner') {
            content = `
            <g fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}">
              <path d="M 20,180 L 20,40 Q 20,20 40,20 L 180,20" stroke-linecap="round" />
              <path d="M 20,40 C 5,30 5,15 20,20 C 35,25 30,35 20,40 Z" fill="${layer.color}" />
              <path d="M 40,20 C 50,5 65,5 60,20 C 55,35 45,30 40,20 Z" fill="${layer.color}" />
              <path d="M 80,20 C 90,10 100,15 95,25 C 90,35 85,30 80,20 Z" fill="${layer.color}" />
              <path d="M 20,80 C 10,90 15,100 25,95 C 35,90 30,85 20,80 Z" fill="${layer.color}" />
            </g>`;
          } else if (layer.frameType === 'minimal_circle') {
            content = `<circle cx="100" cy="100" r="85" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" />`;
          } else if (layer.frameType === 'minimal_oval') {
            content = `<ellipse cx="100" cy="75" rx="85" ry="60" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" />`;
          } else if (layer.frameType === 'wedding_arch') {
            content = `
            <g fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}">
              <path d="M 30,220 L 30,100 A 70,70 0 0,1 170,100 L 170,220" stroke-linecap="round" />
              <path d="M 45,220 L 45,110 A 55,55 0 0,1 155,110 L 155,220" opacity="0.6" stroke-linecap="round" />
              <path d="M 50,70 Q 30,50 50,30 Q 70,50 50,70" fill="${layer.color}" />
              <circle cx="50" cy="50" r="4" fill="${layer.color}" />
            </g>`;
          } else if (layer.frameType === 'eucalyptus_leaves') {
            content = `
            <g fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}">
              <path d="M 10,50 Q 100,20 190,50" stroke-linecap="round" />
              <ellipse cx="50" cy="35" rx="15" ry="10" transform="rotate(-15 50 35)" fill="${layer.color}" fill-opacity="0.15" />
              <ellipse cx="50" cy="65" rx="15" ry="10" transform="rotate(15 50 65)" fill="${layer.color}" fill-opacity="0.15" />
              <ellipse cx="100" cy="30" rx="18" ry="12" transform="rotate(-5 100 30)" fill="${layer.color}" fill-opacity="0.15" />
              <ellipse cx="100" cy="70" rx="18" ry="12" transform="rotate(5 100 70)" fill="${layer.color}" fill-opacity="0.15" />
              <ellipse cx="150" cy="38" rx="14" ry="9" transform="rotate(20 150 38)" fill="${layer.color}" fill-opacity="0.15" />
              <ellipse cx="150" cy="62" rx="14" ry="9" transform="rotate(-20 150 62)" fill="${layer.color}" fill-opacity="0.15" />
            </g>`;
          } else if (layer.frameType === 'geometric_hexagon') {
            content = `<polygon points="100,15 178,60 178,140 100,185 22,140 22,60" fill="none" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" stroke-linejoin="round" />`;
          }
        } else if (layer.type === 'sparkle') {
          if (layer.sparkleType === 'sparkle_4point') {
            content = `<path d="M 50,10 Q 50,50 10,50 Q 50,50 50,90 Q 50,50 90,50 Q 50,50 50,10 Z" fill="${layer.color}" />`;
          } else if (layer.sparkleType === 'sparkle_8point') {
            content = `<g fill="${layer.color}">
              <path d="M 50,15 Q 50,50 15,50 Q 50,50 50,85 Q 50,50 85,50 Q 50,50 50,15 Z" />
              <path d="M 50,15 Q 50,50 15,50 Q 50,50 50,85 Q 50,50 85,50 Q 50,50 50,15 Z" transform="rotate(45 50 50)" opacity="0.75" />
            </g>`;
          } else if (layer.sparkleType === 'dots_cluster') {
            content = `<g fill="${layer.color}">
              <circle cx="50" cy="50" r="10" />
              <circle cx="30" cy="30" r="5" opacity="0.8" />
              <circle cx="70" cy="30" r="6" opacity="0.8" />
              <circle cx="35" cy="70" r="4" opacity="0.6" />
              <circle cx="68" cy="68" r="5.5" opacity="0.7" />
              <circle cx="50" cy="18" r="3" opacity="0.5" />
              <circle cx="50" cy="82" r="3.5" opacity="0.5" />
              <circle cx="18" cy="50" r="4" opacity="0.4" />
              <circle cx="82" cy="50" r="3" opacity="0.4" />
            </g>`;
          } else if (layer.sparkleType === 'floating_hearts') {
            content = `<g fill="${layer.color}">
              <path d="M 50,45 C 50,30 35,20 25,30 C 15,40 30,60 50,75 C 70,60 85,40 75,30 C 65,20 50,30 50,45 Z" />
              <path d="M 75,70 C 75,60 67,55 62,60 C 57,65 65,75 75,82 C 85,75 93,65 88,60 C 83,55 75,60 75,70 Z" transform="scale(0.6) translate(30,-20)" opacity="0.75" />
              <path d="M 25,20 C 25,10 17,5 12,10 C 7,15 15,25 25,32 C 35,25 43,15 38,10 C 33,5 25,10 25,20 Z" transform="scale(0.5) translate(-10,20)" opacity="0.6" />
            </g>`;
          } else if (layer.sparkleType === 'rose_flower') {
            content = `<g fill="none" stroke="${layer.color}" stroke-width="2.5">
              <path d="M 60,60 C 50,55 52,42 62,45 C 72,48 70,68 55,68 C 38,68 42,40 64,35 C 86,30 92,72 60,82 C 28,92 22,48 58,22" />
              <path d="M 60,82 Q 62,110 70,115" />
              <path d="M 61,95 Q 40,90 48,80 Q 56,85 61,95" fill="${layer.color}" fill-opacity="0.2" />
            </g>`;
          }
        }

        // Apply global transform matrix
        const coordinateX = layer.x;
        const coordinateY = layer.y;
        const rotationAngle = layer.rotation;
        const uniformScale = layer.scale;

        const offsetTranslateXml = layer.type === 'text' ? '' : 'transform="translate(-100, -50)"';

        return `
        <g transform="translate(${coordinateX}, ${coordinateY}) rotate(${rotationAngle}) scale(${uniformScale})" opacity="${layer.opacity}">
          <g ${offsetTranslateXml}>
            ${content}
          </g>
        </g>`;
      })
      .join('\n');

    // Combine everything into standard SVG XML document
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <style>
    ${fontImportStyles}
    text {
      text-anchor: middle;
      dominant-baseline: middle;
    }
  </style>
  ${defsContent}
  
  <!-- BACKGROUND -->
  <rect width="1000" height="700" fill="${fillStyle}" rx="0" />
  
  <!-- ARTWORK LAYERS -->
  ${layersStrings}
</svg>`;
  };

  const handleCopySvg = () => {
    const svgStr = generateSvgString();
    navigator.clipboard.writeText(svgStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    const fileName = `calligraphy_art_${Date.now()}`;
    const svgStr = generateSvgString();

    if (format === 'svg') {
      // Direct text assembly download
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloading(false);
    } else {
      // PNG vs JPG Canvas render pipeline
      const img = new Image();
      // Safe base64 encode SVG including Unicode
      const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64data = reader.result as string;
        img.src = base64data;
        
        img.onload = () => {
          // Setup 3x ultra-crisp print canvas (3000 x 2100)
          const canvas = document.createElement('canvas');
          canvas.width = 3000;
          canvas.height = 2100;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            // Fill background with white if JPEG is selected, since transparency renders black
            if (format === 'jpeg') {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, 3000, 2100);
            }
            
            ctx.drawImage(img, 0, 0, 3000, 2100);
            const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
            const dataUrl = canvas.toDataURL(mimeType, format === 'jpeg' ? 0.95 : undefined);
            
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${fileName}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          setDownloading(false);
        };
      };
      
      reader.readAsDataURL(svgBlob);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in animate-duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-lg bg-brand-panel border border-brand-border shadow-2xl transition-all scale-up duration-250 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-brand-accent text-brand-bg shadow-[0_0_10px_rgba(204,255,0,0.3)]">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base uppercase tracking-tight">{t.exportTitle}</h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-brand-dim font-bold">SVG, PNG, JPG 3000px Ultra HD</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-brand-dim hover:text-brand-accent transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {/* Export warning */}
          <div className="p-4 rounded border border-brand-accent/20 bg-brand-accent/5 text-brand-accent text-xs leading-relaxed font-semibold">
            {t.vectorAlert}
          </div>

          {/* Format Selector */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-brand-dim uppercase tracking-widest block">
              {t.exportFormat}
            </span>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat('svg')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  format === 'svg'
                    ? 'border-brand-accent bg-brand-accent/15 text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                    : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                }`}
              >
                <FileCode size={26} />
                <span className="text-xs font-bold uppercase tracking-tight">SVG (Vector)</span>
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-75">Plotter</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('png')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  format === 'png'
                    ? 'border-brand-accent bg-brand-accent/15 text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                    : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                }`}
              >
                <ImageIcon size={26} />
                <span className="text-xs font-bold uppercase tracking-tight">PNG HD</span>
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-75">Transparent</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('jpeg')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  format === 'jpeg'
                    ? 'border-brand-accent bg-brand-accent/15 text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                    : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                }`}
              >
                <ImageIcon size={26} />
                <span className="text-xs font-bold uppercase tracking-tight">JPEG HD</span>
                <span className="text-[9px] font-mono uppercase tracking-wider opacity-75">White Matte</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-brand-border px-6 py-4 bg-brand-bg flex items-center justify-between gap-4">
          <button
            onClick={handleCopySvg}
            className="flex items-center gap-2 px-4 py-2.5 rounded border border-brand-border text-xs font-bold text-white bg-brand-panel hover:border-brand-accent active:scale-95 transition-all uppercase tracking-wider"
          >
            {copied ? <Check size={16} className="text-brand-accent" /> : <Copy size={16} />}
            {copied ? t.copiedSvg : t.copySvgBtn}
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded text-xs font-black text-brand-bg bg-brand-accent hover:bg-white active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase tracking-tight`}
          >
            <Download size={16} />
            {downloading ? 'Rendering...' : t.downloadBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { Layer, CanvasBackground } from '../types';
import { SWASH_PATHS, FRAME_PATHS, SPARKLE_PATHS } from './VectorPaths';

interface CanvasProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayerPosition: (id: string, x: number, y: number) => void;
  background: CanvasBackground;
}

export default function Canvas({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayerPosition,
  background,
}: CanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragState, setDragState] = useState<{
    layerId: string;
    startX: number;
    startY: number;
    startLayerX: number;
    startLayerY: number;
  } | null>(null);

  // SVG dimensions
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 700;

  const handlePointerDown = (e: React.PointerEvent, layer: Layer) => {
    e.stopPropagation();
    onSelectLayer(layer.id);
    
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setDragState({
      layerId: layer.id,
      startX: e.clientX,
      startY: e.clientY,
      startLayerX: layer.x,
      startLayerY: layer.y
    });

    // Set pointer capture to track drag correctly even if cursor leaves workspace
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState || !svgRef.current) return;
    e.preventDefault();

    const rect = svgRef.current.getBoundingClientRect();
    
    // Convert screen coordinates differences to SVG coordinates scaling
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    
    const svgDx = dx * (SVG_WIDTH / rect.width);
    const svgDy = dy * (SVG_HEIGHT / rect.height);
    
    const newX = Math.round(Math.max(-200, Math.min(SVG_WIDTH + 200, dragState.startLayerX + svgDx)));
    const newY = Math.round(Math.max(-200, Math.min(SVG_HEIGHT + 200, dragState.startLayerY + svgDy)));
    
    onUpdateLayerPosition(dragState.layerId, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragState) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe catch if element is detached
      }
      setDragState(null);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If clicked on canvas background, deselect current layer
    if (e.target === svgRef.current || (e.target as HTMLElement).id === "bg-rect" || (e.target as HTMLElement).id === "grid-rect") {
      onSelectLayer(null);
    }
  };

  // Render Background
  const renderBackground = () => {
    const fillStyle = () => {
      switch (background.type) {
        case 'solid':
          return background.color1;
        case 'gradient':
          return `url(#canvas-grad)`;
        case 'texture':
          if (background.texturePattern === 'watercolor') {
            return `url(#canvas-grad)`; // watercolor is custom overlay on solid gradient
          }
          return `url(#pat-${background.texturePattern})`;
        default:
          return '#ffffff';
      }
    };

    return (
      <rect
        id="bg-rect"
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        fill={fillStyle()}
        rx="24"
      />
    );
  };

  // Keep a reference to render active selected outline
  const activeLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div className="relative w-full aspect-[10/7] rounded border-2 border-brand-border overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.6)] bg-brand-bg select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-full cursor-default select-none overflow-visible"
        onClick={handleCanvasClick}
        onPointerMove={handlePointerMove}
        style={{ touchAction: 'none' }}
      >
        <defs>
          {/* Linear gradient definition */}
          <linearGradient
            id="canvas-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            style={{ stopColor: background.color1 }}
          >
            <stop offset="0%" stopColor={background.color1} />
            <stop offset="100%" stopColor={background.color2} />
          </linearGradient>

          {/* Linen pattern definition */}
          <pattern id="pat-linen" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill={background.color1} />
            <line x1="0" y1="15" x2="30" y2="15" stroke={background.color2} strokeWidth="1.2" opacity="0.4" />
            <line x1="15" y1="0" x2="15" y2="30" stroke={background.color2} strokeWidth="1.2" opacity="0.4" />
            <line x1="0" y1="7" x2="30" y2="7" stroke={background.color2} strokeWidth="0.6" opacity="0.25" />
            <line x1="7" y1="0" x2="7" y2="30" stroke={background.color2} strokeWidth="0.6" opacity="0.25" />
          </pattern>

          {/* Kraft cardboard texture definition */}
          <pattern id="pat-kraft" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="#ccb091" />
            <g opacity="0.4" stroke="#bf9d7a" strokeWidth="0.8" fill="none">
              <path d="M 0,20 Q 50,30 100,15 T 200,20" />
              <path d="M 10,70 Q 60,65 120,75 T 200,68" />
              <path d="M 0,130 Q 80,140 130,120 T 200,135" />
              <path d="M 30,180 Q 90,170 150,185 T 200,175" />
            </g>
            <g opacity="0.6" stroke="#b28e67" strokeWidth="0.5" fill="none">
              <path d="M 40,0 L 41,200" strokeDasharray="1,15" />
              <path d="M 120,0 L 122,200" strokeDasharray="2,20" />
              <path d="M 180,0 L 181,200" strokeDasharray="1,12" />
            </g>
          </pattern>

          {/* Chalkboard pattern definition */}
          <pattern id="pat-chalkboard" width="300" height="300" patternUnits="userSpaceOnUse">
            <rect width="300" height="300" fill="#1b1d20" />
            <circle cx="45" cy="80" r="1.5" fill="#ffffff" opacity="0.08" />
            <circle cx="180" cy="220" r="2.5" fill="#ffffff" opacity="0.05" />
            <circle cx="260" cy="50" r="1.2" fill="#ffffff" opacity="0.07" />
            <circle cx="90" cy="200" r="2.0" fill="#ffffff" opacity="0.06" />
            {/* chalkboard smudge dust paths */}
            <path d="M 20,40 Q 60,80 140,50 T 280,120" stroke="#ffffff" strokeWidth="15" fill="none" opacity="0.02" filter="blur(6px)" />
            <path d="M 50,220 Q 150,180 230,240 T 290,160" stroke="#ffffff" strokeWidth="25" fill="none" opacity="0.015" filter="blur(8px)" />
          </pattern>

          {/* Watercolor canvas texture overlay (applied as an alpha mask or transparent group) */}
          <radialGradient id="watercolor-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.04" />
          </radialGradient>
        </defs>

        {/* 1. Base Background and Textures */}
        {renderBackground()}

        {/* Watercolor organic fade overlay if enabled */}
        {background.type === 'texture' && background.texturePattern === 'watercolor' && (
          <>
            <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#watercolor-grad)" rx="24" pointerEvents="none" />
            {/* Subtle watercolor splotch mimics */}
            <path d="M 120,100 T 300,150 T 500,80" fill="#ecdcc0" opacity="0.1" filter="blur(16px)" pointerEvents="none" />
            <path d="M 850,550 T 700,450 T 600,600" fill="#dfebd6" opacity="0.1" filter="blur(16px)" pointerEvents="none" />
          </>
        )}

        {/* Grid lines to aid composition (extremely faint, only visible on canvas) */}
        <g id="grid-lines" opacity="0.04" pointerEvents="none">
          {/* Rule of thirds lines */}
          <line x1={SVG_WIDTH / 3} y1="0" x2={SVG_WIDTH / 3} y2={SVG_HEIGHT} stroke="#000000" strokeWidth="2" strokeDasharray="5,5" />
          <line x1={(SVG_WIDTH / 3) * 2} y1="0" x2={(SVG_WIDTH / 3) * 2} y2={SVG_HEIGHT} stroke="#000000" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="0" y1={SVG_HEIGHT / 3} x2={SVG_WIDTH} y2={SVG_HEIGHT / 3} stroke="#000000" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="0" y1={(SVG_HEIGHT / 3) * 2} x2={SVG_WIDTH} y2={(SVG_HEIGHT / 3) * 2} stroke="#000000" strokeWidth="2" strokeDasharray="5,5" />
          {/* Center alignment guides */}
          <line x1={SVG_WIDTH / 2} y1="0" x2={SVG_WIDTH / 2} y2={SVG_HEIGHT} stroke="#000000" strokeWidth="1" />
          <line x1="0" y1={SVG_HEIGHT / 2} x2={SVG_WIDTH} y2={SVG_HEIGHT / 2} stroke="#000000" strokeWidth="1" />
        </g>

        {/* 2. Render Layers */}
        {layers
          .filter(layer => layer.opacity > 0)
          .map(layer => {
            const isSelected = layer.id === selectedLayerId;

            // Define layer contents
            let layerElement: React.ReactNode = null;

            if (layer.type === 'text') {
              // Standard SVG text node
              layerElement = (
                <text
                  x="0"
                  y="0"
                  fill={layer.color}
                  fontSize={layer.fontSize}
                  fontFamily={`"${layer.fontFamily}", cursive, sans-serif`}
                  letterSpacing={layer.letterSpacing}
                  fontWeight={layer.bold ? 'bold' : 'normal'}
                  fontStyle={layer.italic ? 'italic' : 'normal'}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ userSelect: 'none' }}
                >
                  {layer.text}
                </text>
              );
            } else if (layer.type === 'swash') {
              const def = SWASH_PATHS[layer.swashType];
              layerElement = def ? def.render(layer.color, layer.strokeWidth) : null;
            } else if (layer.type === 'frame') {
              const def = FRAME_PATHS[layer.frameType];
              layerElement = def ? def.render(layer.color, layer.strokeWidth) : null;
            } else if (layer.type === 'sparkle') {
              const def = SPARKLE_PATHS[layer.sparkleType];
              layerElement = def ? def.render(layer.color, 1) : null;
            }

            // Wrap each layer inside a coordinate-transform group with touch events
            return (
              <g
                key={layer.id}
                onPointerDown={(e) => handlePointerDown(e, layer)}
                onPointerUp={handlePointerUp}
                transform={`translate(${layer.x}, ${layer.y}) rotate(${layer.rotation}) scale(${layer.scale})`}
                opacity={layer.opacity}
                className="group select-none"
              >
                {/* 1. Underlying giant invisible target for easier grabbing on touch devices */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx={layer.type === 'text' ? layer.text.length * 15 * layer.scale + 20 : 60}
                  ry={layer.type === 'text' ? 50 : 60}
                  fill="transparent"
                  cursor="move"
                />

                {/* 2. Actual vector contents */}
                {/* Shift text container because translate centers at 0,0 */}
                <g transform={layer.type === 'text' ? 'translate(0, 0)' : 'translate(-100, -50)'}>
                  {layerElement}
                </g>

                {/* 3. Selected Outline decorator */}
                {isSelected && (
                  <g pointerEvents="none" className="animate-[pulse_1.5s_infinite_alternate]">
                    <circle cx="0" cy="0" r="8" fill="#ccff00" stroke="#000000" strokeWidth="2.5" />
                    {layer.type === 'text' ? (
                      <rect
                        x={-(layer.text.length * 12 * (layer.fontSize / 100)) - 16}
                        y={-(layer.fontSize / 2) - 10}
                        width={(layer.text.length * 24 * (layer.fontSize / 100)) + 32}
                        height={layer.fontSize + 20}
                        fill="none"
                        stroke="#ccff00"
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                        rx="4"
                      />
                    ) : (
                      <rect
                        x="-110"
                        y="-60"
                        width="220"
                        height="120"
                        fill="none"
                        stroke="#ccff00"
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                        rx="4"
                      />
                    )}
                  </g>
                )}
                
                {/* Hover indicator line */}
                {!isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r="5"
                    fill="#ccff00"
                    className="opacity-0 group-hover:opacity-75 transition-opacity duration-150"
                    pointerEvents="none"
                  />
                )}
              </g>
            );
          })}
      </svg>
      
      {/* Visual Indicator of canvas interactions */}
      <div className="absolute top-4 left-4 pointer-events-none bg-brand-bg/90 border border-brand-border backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-mono tracking-wider text-brand-accent flex items-center gap-1.5 shadow-md">
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
        1000 x 700 px
      </div>
    </div>
  );
}

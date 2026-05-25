import React from 'react';

export interface VectorDef {
  id: string;
  name: string;
  nameIt: string;
  viewBox: string;
  render: (color: string, strokeWidth: number) => React.ReactNode;
}

export const SWASH_PATHS: Record<string, VectorDef> = {
  heart_left: {
    id: 'heart_left',
    name: 'Heart Swash (Left)',
    nameIt: 'Tratto a Cuore (Sinistra)',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <path
        d="M 10,70 Q 35,40 50,40 C 65,40 75,55 70,70 C 65,85 45,95 40,75 C 35,55 60,35 75,35 Q 110,35 140,50 L 195,50"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  heart_right: {
    id: 'heart_right',
    name: 'Heart Swash (Right)',
    nameIt: 'Tratto a Cuore (Destra)',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <path
        d="M 5,50 L 60,50 Q 90,65 125,65 C 140,65 165,45 160,30 C 155,15 135,25 130,45 C 125,65 145,85 160,85 C 175,85 190,55 195,30"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  wave_left: {
    id: 'wave_left',
    name: 'Swooping Wave (Left)',
    nameIt: 'Onda Fluida (Sinistra)',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <path
        d="M 10,30 C 50,20 10,80 80,75 C 130,70 140,50 195,50"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  wave_right: {
    id: 'wave_right',
    name: 'Swooping Wave (Right)',
    nameIt: 'Onda Fluida (Destra)',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <path
        d="M 5,50 C 60,50 70,30 120,25 C 190,20 150,80 190,70"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  loop_left: {
    id: 'loop_left',
    name: 'Infinity Arc (Left)',
    nameIt: 'Arco Infinito (Sinistra)',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <path
        d="M 15,50 C 45,90 90,10 115,50 C 135,80 160,50 195,50"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  loop_right: {
    id: 'loop_right',
    name: 'Infinity Arc (Right)',
    nameIt: 'Arco Infinito (Destra)',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <path
        d="M 5,50 C 40,50 65,20 85,50 C 110,90 155,10 185,50"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  divider_wave: {
    id: 'divider_wave',
    name: 'Decorative Divider',
    nameIt: 'Separatore Decorativo',
    viewBox: '0 0 400 100',
    render: (color, sw) => (
      <path
        d="M 10,50 Q 100,20 200,50 T 390,50 M 180,50 C 190,35 210,35 220,50 C 210,65 190,65 180,50 Z"
        fill={color}
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  underline_swoosh: {
    id: 'underline_swoosh',
    name: 'Underline Swoosh',
    nameIt: 'Swoosh Sotto-riga',
    viewBox: '0 0 300 100',
    render: (color, sw) => (
      <path
        d="M 10,20 C 50,85 240,85 290,15 C 250,55 90,65 20,45"
        fill={color}
        stroke={color}
        strokeWidth={sw / 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  scroll_curly: {
    id: 'scroll_curly',
    name: 'Flourish Scroll',
    nameIt: 'Ricciolo Barocco',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <path
        d="M 20,20 C 5,35 15,65 35,60 C 55,55 35,25 65,35 C 95,45 115,75 145,70 C 175,65 185,45 170,35 C 155,25 140,55 165,65"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  }
};

export const FRAME_PATHS: Record<string, VectorDef> = {
  laurel_wreath: {
    id: 'laurel_wreath',
    name: 'Laurel Wreath',
    nameIt: 'Corona d\'Alloro',
    viewBox: '0 0 200 200',
    render: (color, sw) => (
      <g fill="none" stroke={color} strokeWidth={sw}>
        {/* Left side arc */}
        <path d="M 100,180 A 80,80 0 0,1 40,60" strokeLinecap="round" />
        {/* Left leaves */}
        <path d="M 40,60 C 35,50 25,55 30,65 C 35,75 45,70 40,60 Z" fill={color} />
        <path d="M 45,90 C 35,85 30,95 40,100 C 50,105 50,95 45,90 Z" fill={color} />
        <path d="M 55,120 C 45,115 42,125 50,130 C 58,135 60,125 55,120 Z" fill={color} />
        <path d="M 75,155 C 65,150 60,160 70,165 C 80,170 82,160 75,155 Z" fill={color} />
        {/* Right side arc */}
        <path d="M 100,180 A 80,80 0 0,0 160,60" strokeLinecap="round" />
        {/* Right leaves */}
        <path d="M 160,60 C 165,50 175,55 170,65 C 165,75 155,70 160,60 Z" fill={color} />
        <path d="M 155,90 C 165,85 170,95 160,100 C 150,105 150,95 155,90 Z" fill={color} />
        <path d="M 145,120 C 155,115 158,125 150,130 C 142,135 140,125 145,120 Z" fill={color} />
        <path d="M 125,155 C 135,150 140,160 130,165 C 120,170 118,160 125,155 Z" fill={color} />
      </g>
    )
  },
  botanical_corner: {
    id: 'botanical_corner',
    name: 'Botanical Corner',
    nameIt: 'Angolo Botanico',
    viewBox: '0 0 200 200',
    render: (color, sw) => (
      <g fill="none" stroke={color} strokeWidth={sw}>
        <path d="M 20,180 L 20,40 Q 20,20 40,20 L 180,20" strokeLinecap="round" />
        {/* Corner leaves expansion */}
        <path d="M 20,40 C 5,30 5,15 20,20 C 35,25 30,35 20,40 Z" fill={color} />
        <path d="M 40,20 C 50,5 65,5 60,20 C 55,35 45,30 40,20 Z" fill={color} />
        <path d="M 80,20 C 90,10 100,15 95,25 C 90,35 85,30 80,20 Z" fill={color} />
        <path d="M 20,80 C 10,90 15,100 25,95 C 35,90 30,85 20,80 Z" fill={color} />
      </g>
    )
  },
  minimal_circle: {
    id: 'minimal_circle',
    name: 'Minimalist Ring',
    nameIt: 'Cerchio Minimalista',
    viewBox: '0 0 200 200',
    render: (color, sw) => (
      <circle cx="100" cy="100" r="85" fill="none" stroke={color} strokeWidth={sw} />
    )
  },
  minimal_oval: {
    id: 'minimal_oval',
    name: 'Elegant Oval',
    nameIt: 'Ovale Elegante',
    viewBox: '0 0 200 150',
    render: (color, sw) => (
      <ellipse cx="100" cy="75" rx="85" ry="60" fill="none" stroke={color} strokeWidth={sw} />
    )
  },
  wedding_arch: {
    id: 'wedding_arch',
    name: 'Wedding Geometry',
    nameIt: 'Arco Geometrico',
    viewBox: '0 0 200 240',
    render: (color, sw) => (
      <g fill="none" stroke={color} strokeWidth={sw}>
        {/* Arch shape */}
        <path d="M 30,220 L 30,100 A 70,70 0 0,1 170,100 L 170,220" strokeLinecap="round" />
        <path d="M 45,220 L 45,110 A 55,55 0 0,1 155,110 L 155,220" opacity="0.6" strokeLinecap="round" />
        {/* Botanical detail on the top left of the arch */}
        <path d="M 50,70 Q 30,50 50,30 Q 70,50 50,70" fill={color} />
        <circle cx="50" cy="50" r="4" fill={color} />
      </g>
    )
  },
  eucalyptus_leaves: {
    id: 'eucalyptus_leaves',
    name: 'Eucalyptus Branch',
    nameIt: 'Ramo d\'Eucalipto',
    viewBox: '0 0 200 100',
    render: (color, sw) => (
      <g fill="none" stroke={color} strokeWidth={sw}>
        <path d="M 10,50 Q 100,20 190,50" strokeLinecap="round" />
        {/* Leaf pairs */}
        <ellipse cx="50" cy="35" rx="15" ry="10" transform="rotate(-15 50 35)" fill={color} fillOpacity="0.15" />
        <ellipse cx="50" cy="65" rx="15" ry="10" transform="rotate(15 50 65)" fill={color} fillOpacity="0.15" />
        <ellipse cx="100" cy="30" rx="18" ry="12" transform="rotate(-5 100 30)" fill={color} fillOpacity="0.15" />
        <ellipse cx="100" cy="70" rx="18" ry="12" transform="rotate(5 100 70)" fill={color} fillOpacity="0.15" />
        <ellipse cx="150" cy="38" rx="14" ry="9" transform="rotate(20 150 38)" fill={color} fillOpacity="0.15" />
        <ellipse cx="150" cy="62" rx="14" ry="9" transform="rotate(-20 150 62)" fill={color} fillOpacity="0.15" />
      </g>
    )
  },
  geometric_hexagon: {
    id: 'geometric_hexagon',
    name: 'Fine Hexagon',
    nameIt: 'Esagono Fine',
    viewBox: '0 0 200 200',
    render: (color, sw) => (
      <polygon
        points="100,15 178,60 178,140 100,185 22,140 22,60"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    )
  }
};

export const SPARKLE_PATHS: Record<string, VectorDef> = {
  sparkle_4point: {
    id: 'sparkle_4point',
    name: '4-Point Sparkle',
    nameIt: 'Scintilla a 4 Punte',
    viewBox: '0 0 100 100',
    render: (color) => (
      <path
        d="M 50,10 Q 50,50 10,50 Q 50,50 50,90 Q 50,50 90,50 Q 50,50 50,10 Z"
        fill={color}
      />
    )
  },
  sparkle_8point: {
    id: 'sparkle_8point',
    name: '8-Point Star',
    nameIt: 'Stella ad 8 Punte',
    viewBox: '0 0 100 100',
    render: (color) => (
      <g fill={color}>
        <path d="M 50,15 Q 50,50 15,50 Q 50,50 50,85 Q 50,50 85,50 Q 50,50 50,15 Z" />
        <path d="M 50,15 Q 50,50 15,50 Q 50,50 50,85 Q 50,50 85,50 Q 50,50 50,15 Z" transform="rotate(45 50 50)" opacity="0.75" />
      </g>
    )
  },
  dots_cluster: {
    id: 'dots_cluster',
    name: 'Aura Dots',
    nameIt: 'Polvere di Stelle',
    viewBox: '0 0 100 100',
    render: (color) => (
      <g fill={color}>
        <circle cx="50" cy="50" r="10" />
        <circle cx="30" cy="30" r="5" opacity="0.8" />
        <circle cx="70" cy="30" r="6" opacity="0.8" />
        <circle cx="35" cy="70" r="4" opacity="0.6" />
        <circle cx="68" cy="68" r="5.5" opacity="0.7" />
        <circle cx="50" cy="18" r="3" opacity="0.5" />
        <circle cx="50" cy="82" r="3.5" opacity="0.5" />
        <circle cx="18" cy="50" r="4" opacity="0.4" />
        <circle cx="82" cy="50" r="3" opacity="0.4" />
      </g>
    )
  },
  floating_hearts: {
    id: 'floating_hearts',
    name: 'Floating Hearts',
    nameIt: 'Cuoricini Volanti',
    viewBox: '0 0 100 100',
    render: (color) => (
      <g fill={color}>
        {/* Main heart */}
        <path d="M 50,45 C 50,30 35,20 25,30 C 15,40 30,60 50,75 C 70,60 85,40 75,30 C 65,20 50,30 50,45 Z" />
        {/* Companion heart small */}
        <path d="M 75,70 C 75,60 67,55 62,60 C 57,65 65,75 75,82 C 85,75 93,65 88,60 C 83,55 75,60 75,70 Z" transform="scale(0.6) translate(30,-20)" opacity="0.75" fill={color} />
        {/* Left companion */}
        <path d="M 25,20 C 25,10 17,5 12,10 C 7,15 15,25 25,32 C 35,25 43,15 38,10 C 33,5 25,10 25,20 Z" transform="scale(0.5) translate(-10,20)" opacity="0.6" fill={color} />
      </g>
    )
  },
  rose_flower: {
    id: 'rose_flower',
    name: 'Rose Silhouette',
    nameIt: 'Silhouetta Rosa',
    viewBox: '0 0 120 120',
    render: (color) => (
      <g fill="none" stroke={color} strokeWidth="2.5">
        {/* Spiral inside rose */}
        <path d="M 60,60 C 50,55 52,42 62,45 C 72,48 70,68 55,68 C 38,68 42,40 64,35 C 86,30 92,72 60,82 C 28,92 22,48 58,22" />
        {/* Rose stem & leaf */}
        <path d="M 60,82 Q 62,110 70,115" />
        <path d="M 61,95 Q 40,90 48,80 Q 56,85 61,95" fill={color} fillOpacity="0.2" />
      </g>
    )
  }
};

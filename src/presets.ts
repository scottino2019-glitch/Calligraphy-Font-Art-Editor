import { Layer, CanvasBackground } from './types';

export interface Preset {
  id: string;
  name: string;
  nameIt: string;
  description: string;
  descriptionIt: string;
  background: CanvasBackground;
  layers: Layer[];
}

export const PRESETS: Preset[] = [
  {
    id: 'buon_compleanno_heart',
    name: 'Elegant Birthday Cursive',
    nameIt: 'Compleanno con Cuore',
    description: 'Beautiful multi-line handwriting joined with an elegant sweeping heart swash and bottom wave tail.',
    descriptionIt: 'Scrittura multilinea unita ad un elegante tratto a cuore iniziale e ad un’onda decorativa finale.',
    background: {
      type: 'texture',
      color1: '#fcfbf7',
      color2: '#f3efdf',
      gradientAngle: 45,
      texturePattern: 'watercolor'
    },
    layers: [
      {
        id: 'bg-arch',
        type: 'frame',
        name: 'Wedding Geometry Arc',
        x: 500,
        y: 350,
        scale: 2.2,
        rotation: 0,
        color: '#e2d3bb',
        opacity: 0.65,
        frameType: 'wedding_arch',
        strokeWidth: 2
      } as any,
      {
        id: 'txt-buon',
        type: 'text',
        name: 'Text - Buon',
        x: 440,
        y: 280,
        scale: 1,
        rotation: 0,
        color: '#1a1a1a',
        opacity: 1,
        text: 'Buon',
        fontFamily: 'Great Vibes',
        fontSize: 105,
        letterSpacing: 2,
        italic: false,
        bold: false
      },
      {
        id: 'txt-compleanno',
        type: 'text',
        name: 'Text - Compleanno',
        x: 500,
        y: 450,
        scale: 1,
        rotation: 0,
        color: '#1a1a1a',
        opacity: 1,
        text: 'Compleanno',
        fontFamily: 'Great Vibes',
        fontSize: 105,
        letterSpacing: 1.5,
        italic: false,
        bold: false
      },
      {
        id: 'swash-heart-left',
        type: 'swash',
        name: 'Heart Swash Left',
        x: 180,
        y: 235,
        scale: 1.15,
        rotation: 3,
        color: '#1a1a1a',
        opacity: 1,
        swashType: 'heart_left',
        strokeWidth: 3.2
      },
      {
        id: 'swash-wave-right',
        type: 'swash',
        name: 'Wave Swash Right',
        x: 410,
        y: 445,
        scale: 1.5,
        rotation: 4,
        color: '#1a1a1a',
        opacity: 1,
        swashType: 'wave_right',
        strokeWidth: 3.2
      },
      {
        id: 'sparkle-cluster',
        type: 'sparkle',
        name: 'Star Sparkles',
        x: 750,
        y: 210,
        scale: 0.5,
        rotation: 12,
        color: '#d4af37',
        opacity: 0.8,
        sparkleType: 'sparkle_8point'
      }
    ]
  },
  {
    id: 'matrimonio_botanico',
    name: 'Botanical Wedding Board',
    nameIt: 'Partecipazione Botanica',
    description: 'Eucalyptus leaf border framing sophisticated hand lettering, perfect for invites or decor.',
    descriptionIt: 'Cornice d’alloro e rami che incorniciano un corsivo sofisticato per inviti e bomboniere.',
    background: {
      type: 'texture',
      color1: '#f6f9f6',
      color2: '#eaf0ea',
      gradientAngle: 120,
      texturePattern: 'linen'
    },
    layers: [
      {
        id: 'laurel-frame',
        type: 'frame',
        name: 'Laurel Leaves Frame',
        x: 500,
        y: 350,
        scale: 3.1,
        rotation: 0,
        color: '#4a6b53',
        opacity: 0.5,
        frameType: 'laurel_wreath',
        strokeWidth: 1.5
      },
      {
        id: 'txt-and',
        type: 'text',
        name: 'Text - &',
        x: 500,
        y: 350,
        scale: 1.1,
        rotation: 0,
        color: '#1e3024',
        opacity: 1,
        text: 'and',
        fontFamily: 'Sacramento',
        fontSize: 55,
        letterSpacing: 2,
        italic: true,
        bold: false
      },
      {
        id: 'txt-name1',
        type: 'text',
        name: 'Text - Name 1',
        x: 500,
        y: 260,
        scale: 1,
        rotation: -2,
        color: '#2b3a2f',
        opacity: 1,
        text: 'Giuseppe',
        fontFamily: 'Pinyon Script',
        fontSize: 110,
        letterSpacing: 1,
        italic: false,
        bold: false
      },
      {
        id: 'txt-name2',
        type: 'text',
        name: 'Text - Name 2',
        x: 500,
        y: 445,
        scale: 1,
        rotation: 2,
        color: '#2b3a2f',
        opacity: 1,
        text: 'Sofia',
        fontFamily: 'Pinyon Script',
        fontSize: 110,
        letterSpacing: 1,
        italic: false,
        bold: false
      },
      {
        id: 'txt-date',
        type: 'text',
        name: 'Text - Date',
        x: 500,
        y: 535,
        scale: 1,
        rotation: 0,
        color: '#6e8072',
        opacity: 0.9,
        text: '25 Maggio 2026',
        fontFamily: 'Sacramento',
        fontSize: 38,
        letterSpacing: 4,
        italic: false,
        bold: true
      },
      {
        id: 'swash-divider',
        type: 'swash',
        name: 'Elegant Under-Swoosh',
        x: 350,
        y: 280,
        scale: 1.0,
        rotation: 0,
        color: '#4a6b53',
        opacity: 0.6,
        swashType: 'underline_swoosh',
        strokeWidth: 2
      }
    ]
  },
  {
    id: 'signature_branding',
    name: 'Vintage Signature Logo',
    nameIt: 'Logo Firma Vintage',
    description: 'Chic corporate lettermark with fine gold sparkles and custom swooping underline.',
    descriptionIt: 'Logo sigillo raffinato con dettagli color oro brillante ed una sottolineatura spazzolata.',
    background: {
      type: 'solid',
      color1: '#12161a',
      color2: '#0b0c10',
      gradientAngle: 180,
      texturePattern: 'none'
    },
    layers: [
      {
        id: 'circle-ring',
        type: 'frame',
        name: 'Golden Hexagon',
        x: 500,
        y: 350,
        scale: 2.3,
        rotation: 30,
        color: '#c5a880',
        opacity: 0.35,
        frameType: 'geometric_hexagon',
        strokeWidth: 1.2
      },
      {
        id: 'sig-main',
        type: 'text',
        name: 'Text - Brand',
        x: 500,
        y: 340,
        scale: 1,
        rotation: -4,
        color: '#f4ecd8',
        opacity: 1,
        text: 'Laurel & Co.',
        fontFamily: 'Monsieur La Doulaise',
        fontSize: 130,
        letterSpacing: -1,
        italic: false,
        bold: false
      },
      {
        id: 'sig-sub',
        type: 'text',
        name: 'Text - Subtitle',
        x: 500,
        y: 435,
        scale: 1,
        rotation: 0,
        color: '#c5a880',
        opacity: 0.9,
        text: 'ARTISANAL LUXURY SHAPE',
        fontFamily: 'Sacramento',
        fontSize: 32,
        letterSpacing: 6,
        italic: false,
        bold: true
      },
      {
        id: 'sig-swoosh',
        type: 'swash',
        name: 'Coil Swoosh',
        x: 350,
        y: 355,
        scale: 1.1,
        rotation: -2,
        color: '#c5a880',
        opacity: 0.8,
        swashType: 'underline_swoosh',
        strokeWidth: 2
      },
      {
        id: 'sparkle-left',
        type: 'sparkle',
        name: 'Sparkle Gold',
        x: 720,
        y: 230,
        scale: 0.45,
        rotation: 15,
        color: '#ffd700',
        opacity: 0.85,
        sparkleType: 'sparkle_4point'
      }
    ]
  },
  {
    id: 'chalkboard_menu',
    name: 'Classy Blackboard Lettering',
    nameIt: 'A Lavagna Bistrot',
    description: 'Casual and fun chalkboard cafe style designs with hand drawn leaves and floating hearts.',
    descriptionIt: 'Stile bistrot rustico con foglie di eucalipto e tratti di lavagna bianca sfumata.',
    background: {
      type: 'texture',
      color1: '#22252a',
      color2: '#181a1e',
      gradientAngle: 90,
      texturePattern: 'chalkboard'
    },
    layers: [
      {
        id: 'eucalyptus-top',
        type: 'frame',
        name: 'Eucalyptus Branch Top',
        x: 500,
        y: 190,
        scale: 2.4,
        rotation: -5,
        color: '#ffffff',
        opacity: 0.6,
        frameType: 'eucalyptus_leaves',
        strokeWidth: 1.5
      },
      {
        id: 'txt-caffe',
        type: 'text',
        name: 'Text - Coffee',
        x: 500,
        y: 330,
        scale: 1,
        rotation: 0,
        color: '#ffffff',
        opacity: 0.95,
        text: 'Dolce Vita',
        fontFamily: 'Alex Brush',
        fontSize: 120,
        letterSpacing: 2,
        italic: false,
        bold: false
      },
      {
        id: 'txt-boulangerie',
        type: 'text',
        name: 'Text - Bakery',
        x: 500,
        y: 440,
        scale: 1,
        rotation: 0,
        color: '#ffffff',
        opacity: 0.8,
        text: 'Bespoke Patisserie',
        fontFamily: 'Sacramento',
        fontSize: 55,
        letterSpacing: 3,
        italic: false,
        bold: false
      },
      {
        id: 'swash-divider-bot',
        type: 'swash',
        name: 'Middle Scroll Divider',
        x: 300,
        y: 490,
        scale: 1.0,
        rotation: 0,
        color: '#ffffff',
        opacity: 0.7,
        swashType: 'divider_wave',
        strokeWidth: 2
      },
      {
        id: 'spark-hearts',
        type: 'sparkle',
        name: 'Chalk Hearts',
        x: 230,
        y: 290,
        scale: 0.45,
        rotation: -20,
        color: '#ffffff',
        opacity: 0.5,
        sparkleType: 'floating_hearts'
      }
    ]
  }
];

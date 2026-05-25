export type LayerType = 'text' | 'swash' | 'frame' | 'sparkle';

export interface BaseLayer {
  id: string;
  type: LayerType;
  name: string;
  x: number; // percentage of canvas width (0-100) or pixels
  y: number; // percentage of canvas height (0-100) or pixels
  scale: number;
  rotation: number; // degrees
  color: string;
  opacity: number;
}

export interface TextLayer extends BaseLayer {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number; // px
  letterSpacing: number; // px
  italic: boolean;
  bold: boolean;
}

export interface SwashLayer extends BaseLayer {
  type: 'swash';
  swashType:
    | 'heart_left'
    | 'heart_right'
    | 'wave_left'
    | 'wave_right'
    | 'loop_left'
    | 'loop_right'
    | 'divider_wave'
    | 'underline_swoosh'
    | 'scroll_curly';
  strokeWidth: number;
}

export interface FrameLayer extends BaseLayer {
  type: 'frame';
  frameType:
    | 'laurel_wreath'
    | 'botanical_corner'
    | 'minimal_circle'
    | 'minimal_oval'
    | 'wedding_arch'
    | 'eucalyptus_leaves'
    | 'geometric_hexagon';
  strokeWidth: number;
}

export interface SparkleLayer extends BaseLayer {
  type: 'sparkle';
  sparkleType: 'sparkle_4point' | 'sparkle_8point' | 'dots_cluster' | 'floating_hearts' | 'rose_flower';
}

export type Layer = TextLayer | SwashLayer | FrameLayer | SparkleLayer;

export type CanvasBackground = {
  type: 'solid' | 'gradient' | 'texture';
  color1: string;
  color2: string; // for gradient
  gradientAngle: number;
  texturePattern: 'none' | 'watercolor' | 'linen' | 'chalkboard' | 'kraft';
};

export type Language = 'it' | 'en';

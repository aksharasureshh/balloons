
export type Section = 'home' | 'gallery' | 'builder';

export type BackdropShape = 'arch' | 'double-chiara' | 'three-piece-arch' | 'square' | 'ring' | 'wall';

export interface BalloonColor {
  name: string;
  hex: string;
  type: 'matte' | 'chrome' | 'pastel';
}

export interface Cluster {
  id: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

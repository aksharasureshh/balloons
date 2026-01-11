
export type Section = 'home' | 'gallery' | 'builder' | 'faq';

export type BackdropShape = 'arch' | 'double-arch' | 'three-piece-arch' | 'square' | 'circle' | 'wall';

export interface BalloonColor {
  name: string;
  hex: string;
  type: 'matte' | 'chrome' | 'pastel';
  bargainBalloonsQuery?: string;
}

export interface Cluster {
  id: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

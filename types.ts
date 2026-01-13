
export type Section = 'home' | 'gallery' | 'builder' | 'faq' | 'admin';

export type BackdropShape = 'arch' | 'double-arch' | 'three-piece-arch' | 'square' | 'circle' | 'wall';

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
  size: number; // Percentage of container width
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
  backdropShape: BackdropShape;
  backdropColor: string;
  clusters: Cluster[];
  vinylText?: string;
  otherSpecs?: string;
  archived?: boolean;
}
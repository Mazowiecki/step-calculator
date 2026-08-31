import type { ShapeType } from '../types';

export const dimensionFields: Record<
  Exclude<ShapeType, 'none' | 'polygon'>,
  string[]
> = {
  rectangle: ['width', 'depth'],
  triangle: ['base', 'height'],
  trapezoid: ['baseA', 'baseB', 'height']
};

export const dimensionLabels: Record<string, string> = {
  width: 'Szerokość',
  depth: 'Głębokość',
  base: 'Podstawa',
  height: 'Wysokość',
  baseA: 'Podstawa A',
  baseB: 'Podstawa B'
};

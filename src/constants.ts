import type { MaterialId, OptionId, ShapeType, Thickness } from './types';

export const MATERIALS: Record<
  MaterialId,
  { label: string; pricePerM2: number; color: string }
> = {
  pine: { label: 'Sosna', pricePerM2: 120, color: '#d69b62' },
  beech: { label: 'Buk', pricePerM2: 220, color: '#bd7d4d' },
  oak: { label: 'Dąb', pricePerM2: 350, color: '#855535' }
};

export const THICKNESSES: Array<{
  value: Thickness;
  label: string;
  multiplier: number;
}> = [
  { value: 1, label: '1 mm', multiplier: 1 },
  { value: 3, label: '3 mm', multiplier: 1.35 },
  { value: 5, label: '5 mm', multiplier: 1.7 }
];

export const OPTIONS: Record<
  OptionId,
  { label: string; price: number; unit: 'fixed' | 'm2' }
> = {
  oflis: { label: 'Oflis', price: 80, unit: 'fixed' },
  bevel: { label: 'Fazowanie', price: 50, unit: 'fixed' },
  sanding: { label: 'Szlifowanie', price: 40, unit: 'm2' },
  oiling: { label: 'Olejowanie', price: 70, unit: 'm2' },
  lacquering: { label: 'Lakierowanie', price: 90, unit: 'm2' }
};

export const SHAPES: Array<{ value: ShapeType; label: string }> = [
  { value: 'none', label: 'Wybierz kształt' },
  { value: 'rectangle', label: 'Prostokąt' },
  { value: 'triangle', label: 'Trójkąt' },
  { value: 'trapezoid', label: 'Trapez' },
  { value: 'polygon', label: 'Niestandardowy' }
];

export const MIN_DIMENSION = 100;
export const MAX_DIMENSION = 2000;
export const MAX_AREA_M2 = 4;

export const DEFAULT_DIMENSIONS = {
  none: {},
  rectangle: { width: 800, depth: 300 },
  triangle: { base: 600, height: 300 },
  trapezoid: { baseA: 800, baseB: 500, height: 300 },
  polygon: {}
} as const;

export const DEFAULT_POLYGON_POINTS = [
  { x: 0, y: 0 },
  { x: 800, y: 0 },
  { x: 800, y: 300 }
];

import {
  MAX_AREA_M2,
  MAX_DIMENSION,
  MATERIALS,
  MIN_DIMENSION,
  OPTIONS,
  THICKNESSES
} from './constants';
import type { StepConfig, ShapeType } from './types';

export const areaForShape = (
  shape: ShapeType,
  d: Record<string, number>,
  points: Array<{ x: number; y: number }> = []
) => {
  if (shape === 'none') {
    return 0;
  }

  if (shape === 'rectangle') {
    return d.width * d.depth;
  }

  if (shape === 'triangle') {
    return (d.base * d.height) / 2;
  }

  if (shape === 'trapezoid') {
    return ((d.baseA + d.baseB) * d.height) / 2;
  }
  return (
    Math.abs(
      points.reduce((sum, point, i) => {
        const next = points[(i + 1) % points.length];
        return sum + point.x * next.y - next.x * point.y;
      }, 0)
    ) / 2
  );
};

export const areaM2 = (config: StepConfig) =>
  areaForShape(config.shape, config.dimensions, config.polygonPoints) /
  1_000_000;

export const priceForStep = (config: StepConfig) => {
  const area = areaM2(config);

  if (config.shape === 'none') {
    return 0;
  }

  const material = MATERIALS[config.material];
  const thickness =
    THICKNESSES.find(item => item.value === config.thickness)?.multiplier ?? 1;
  const options = config.options.reduce(
    (sum, id) =>
      sum +
      (OPTIONS[id].unit === 'm2'
        ? OPTIONS[id].price * area
        : OPTIONS[id].price),
    0
  );
  return (
    Math.round((area * material.pricePerM2 * thickness + options) * 100) / 100
  );
};

export const validateConfig = (config: StepConfig): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (config.shape === 'none') {
    errors.shape = 'Wybierz kształt';
  }

  Object.entries(config.dimensions).forEach(([key, value]) => {
    if (
      !Number.isFinite(value) ||
      value < MIN_DIMENSION ||
      value > MAX_DIMENSION
    ) {
      errors[key] = `${MIN_DIMENSION}–${MAX_DIMENSION} mm`;
    }
  });
  if (
    config.shape === 'trapezoid' &&
    config.dimensions.baseA === config.dimensions.baseB
  ) {
    errors.baseB = 'Trapez musi mieć różne podstawy';
  }
  if (
    config.shape === 'polygon' &&
    (!config.polygonPoints ||
      config.polygonPoints.length < 3 ||
      config.polygonPoints.length > 8)
  ) {
    errors.polygon = 'Podaj od 3 do 8 punktów';
  }

  if (areaM2(config) > MAX_AREA_M2) {
    errors.area = `Powierzchnia nie może przekraczać ${MAX_AREA_M2} m²`;
  }
  return errors;
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
    value
  );

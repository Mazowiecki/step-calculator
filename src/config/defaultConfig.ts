import type { Dimensions, ShapeType, StepConfig } from '../types';
import { DEFAULT_DIMENSIONS, DEFAULT_POLYGON_POINTS } from '../constants';

export const initialConfig: StepConfig = {
  material: 'oak',
  thickness: 3,
  shape: 'none',
  dimensions: { ...DEFAULT_DIMENSIONS.none },
  options: []
};

export const dimensionsForShape = (shape: ShapeType): Dimensions => {
  switch (shape) {
    case 'rectangle':
      return { ...DEFAULT_DIMENSIONS.rectangle };
    case 'triangle':
      return { ...DEFAULT_DIMENSIONS.triangle };
    case 'trapezoid':
      return { ...DEFAULT_DIMENSIONS.trapezoid };
    case 'polygon':
      return { ...DEFAULT_DIMENSIONS.polygon };
    case 'none':
      return { ...DEFAULT_DIMENSIONS.none };
  }
};

export const defaultPolygonPoints = () =>
  DEFAULT_POLYGON_POINTS.map(point => ({ ...point }));

export const createInitialConfig = (): StepConfig => ({
  ...initialConfig,
  dimensions: { ...initialConfig.dimensions },
  options: [],
  polygonPoints: undefined
});

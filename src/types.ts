export type ShapeType =
  'none' | 'rectangle' | 'triangle' | 'trapezoid' | 'polygon';
export type MaterialId = 'pine' | 'beech' | 'oak';
export type Thickness = 1 | 3 | 5;
export type OptionId = 'oflis' | 'bevel' | 'sanding' | 'oiling' | 'lacquering';

export type Dimensions = Record<string, number>;

export interface StepConfig {
  material: MaterialId;
  thickness: Thickness;
  shape: ShapeType;
  dimensions: Dimensions;
  polygonPoints?: Array<{ x: number; y: number }>;
  options: OptionId[];
}

export interface StepItem extends StepConfig {
  id: string;
  quantity: number;
}

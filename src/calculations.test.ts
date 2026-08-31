import { describe, expect, it } from 'vitest';
import { areaForShape, priceForStep, validateConfig } from './calculations';
import type { StepConfig } from './types';

const base: StepConfig = {
  material: 'oak',
  thickness: 3,
  shape: 'rectangle',
  dimensions: { width: 800, depth: 300 },
  options: []
};

describe('geometria i cena', () => {
  it('liczy pola podstawowych kształtów', () => {
    expect(areaForShape('rectangle', { width: 800, depth: 300 })).toBe(240000);
    expect(areaForShape('triangle', { base: 600, height: 300 })).toBe(90000);
    expect(
      areaForShape('trapezoid', { baseA: 800, baseB: 500, height: 300 })
    ).toBe(195000);
  });

  it('odrzuca wymiary poza zakresem i równy trapez', () => {
    expect(
      validateConfig({ ...base, dimensions: { width: 20, depth: 300 } }).width
    ).toBeTruthy();
    expect(
      validateConfig({
        ...base,
        shape: 'trapezoid',
        dimensions: { baseA: 500, baseB: 500, height: 300 }
      }).baseB
    ).toBeTruthy();
  });

  it('uwzględnia opcje dodatkowe w cenie', () => {
    const plain = priceForStep(base);
    const finished = priceForStep({ ...base, options: ['bevel', 'oiling'] });
    expect(finished).toBeGreaterThan(plain);
  });
});

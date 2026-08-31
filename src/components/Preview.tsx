import { Box } from '@mui/material';
import { MATERIALS, SHAPES } from '../constants';
import type { StepConfig } from '../types';

const rawPoints = (config: StepConfig) => {
  const d = config.dimensions;
  if (config.shape === 'rectangle') {
    return [
      { x: 0, y: 0 },
      { x: d.width, y: 0 },
      { x: d.width, y: d.depth },
      { x: 0, y: d.depth }
    ];
  }

  if (config.shape === 'triangle') {
    return [
      { x: 0, y: 0 },
      { x: d.base, y: 0 },
      { x: d.base / 2, y: d.height }
    ];
  }

  if (config.shape === 'trapezoid') {
    return [
      { x: (d.baseA - d.baseB) / 2, y: 0 },
      { x: (d.baseA + d.baseB) / 2, y: 0 },
      { x: d.baseA, y: d.height },
      { x: 0, y: d.height }
    ];
  }

  return config.polygonPoints ?? [];
};

type Point = { x: number; y: number };

const edgeLength = (a: Point, b: Point) => {
  return Math.round(Math.hypot(b.x - a.x, b.y - a.y));
};

const DimensionLine = ({
  a,
  b,
  label,
  center
}: {
  a: Point;
  b: Point;
  label: string;
  center: Point;
}) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  let nx = -dy / length;
  let ny = dx / length;
  const midpoint = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

  // Move the dimension line away from the polygon's center.
  if ((midpoint.x - center.x) * nx + (midpoint.y - center.y) * ny < 0) {
    nx *= -1;
    ny *= -1;
  }

  const offset = 20;
  const start = { x: a.x + nx * offset, y: a.y + ny * offset };
  const end = { x: b.x + nx * offset, y: b.y + ny * offset };
  const textX = (start.x + end.x) / 2 + nx * 8;
  const textY = (start.y + end.y) / 2 + ny * 8;
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
  let textAngle = angle;
  if (angle > 90 || angle < -90) {
    textAngle = angle + 180;
  }

  return (
    <g className='dimension-line'>
      <line x1={a.x} y1={a.y} x2={start.x} y2={start.y} />
      <line x1={b.x} y1={b.y} x2={end.x} y2={end.y} />
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        markerStart='url(#arrow)'
        markerEnd='url(#arrow)'
      />
      <text
        x={textX}
        y={textY}
        transform={`rotate(${textAngle} ${textX} ${textY})`}
        textAnchor='middle'
      >
        {label}
      </text>
    </g>
  );
};

export const Preview = ({ config }: { config: StepConfig }) => {
  const raw = rawPoints(config);
  const scale = Math.min(
    360 / Math.max(...raw.map(point => point.x), 1),
    190 / Math.max(...raw.map(point => point.y), 1)
  );
  const points = raw.map(point => ({
    x: 70 + point.x * scale,
    y: 285 - point.y * scale
  }));
  const polygonPoints = points.map(point => `${point.x},${point.y}`).join(' ');
  const center = points.reduce(
    (sum, point) => ({
      x: sum.x + point.x / points.length,
      y: sum.y + point.y / points.length
    }),
    { x: 0, y: 0 }
  );
  return (
    <Box className='preview'>
      <svg viewBox='0 0 500 360' role='img' aria-label='Podgląd kształtu'>
        <defs>
          <marker
            id='arrow'
            markerWidth='8'
            markerHeight='8'
            refX='4'
            refY='4'
            orient='auto'
          >
            <path d='M0,0 L8,4 L0,8 z' fill='#a06237' />
          </marker>
        </defs>
        {config.shape === 'none' ? (
          <text x='250' y='180' textAnchor='middle'>
            Wybierz kształt
          </text>
        ) : (
          <>
            <polygon
              points={polygonPoints}
              fill={MATERIALS[config.material].color}
              fillOpacity='.28'
              stroke='#5d3f2c'
              strokeWidth='3'
            />
            {points.map((point, index) => {
              const next = points[(index + 1) % points.length];

              return (
                <DimensionLine
                  key={index}
                  a={point}
                  b={next}
                  center={center}
                  label={`${edgeLength(raw[index], raw[(index + 1) % raw.length])} mm`}
                />
              );
            })}
          </>
        )}
        <text x='250' y='28' textAnchor='middle'>
          {SHAPES.find(shape => shape.value === config.shape)?.label}
        </text>
        <text x='250' y='50' textAnchor='middle' className='svg-info'>
          {MATERIALS[config.material].label} · {config.thickness} mm
        </text>
      </svg>
    </Box>
  );
};

import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { validateConfig } from '../calculations';
import { useStepCalculator } from '../context/StepCalculatorContext';

export const PolygonFields = () => {
  const { currentItemConfig, setCurrentItemConfig } = useStepCalculator();
  const errors = validateConfig(currentItemConfig);
  const points = currentItemConfig.polygonPoints ?? [];

  const updatePoint = (index: number, axis: 'x' | 'y', value: string) => {
    const polygonPoints = points.map((point, pointIndex) => {
      if (pointIndex === index) {
        return { ...point, [axis]: Math.round(Number(value)) };
      }

      return point;
    });

    setCurrentItemConfig({ ...currentItemConfig, polygonPoints });
  };

  const addPoint = () => {
    setCurrentItemConfig({
      ...currentItemConfig,
      polygonPoints: [...points, { x: 400, y: 200 }]
    });
  };

  return (
    <Stack spacing={1}>
      <Typography variant='body2' color='text.secondary'>
        Punkty wielokąta (3–8, współrzędne w mm)
      </Typography>

      {points.map((point, index) => (
        <Stack direction='row' spacing={1} key={index}>
          <TextField
            size='small'
            label={`P${index + 1} X`}
            type='number'
            value={point.x}
            onChange={event => updatePoint(index, 'x', event.target.value)}
          />

          <TextField
            size='small'
            label={`P${index + 1} Y`}
            type='number'
            value={point.y}
            onChange={event => updatePoint(index, 'y', event.target.value)}
          />
        </Stack>
      ))}

      {points.length < 8 && <Button onClick={addPoint}>+ Dodaj punkt</Button>}

      {errors.polygon && <Alert severity='error'>{errors.polygon}</Alert>}
    </Stack>
  );
};

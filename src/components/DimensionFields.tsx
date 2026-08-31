import { Box, TextField } from '@mui/material';
import { MAX_DIMENSION, MIN_DIMENSION } from '../constants';
import { dimensionFields, dimensionLabels } from '../config/formConfig';
import { validateConfig } from '../calculations';
import { useStepCalculator } from '../context/StepCalculatorContext';
import { PolygonFields } from './PolygonFields';

export const DimensionFields = () => {
  const { currentItemConfig, setCurrentItemConfig } = useStepCalculator();
  const errors = validateConfig(currentItemConfig);

  const updateDimension = (key: string, value: string) => {
    setCurrentItemConfig({
      ...currentItemConfig,
      dimensions: {
        ...currentItemConfig.dimensions,
        [key]: Math.round(Number(value))
      }
    });
  };

  if (currentItemConfig.shape === 'polygon') {
    return <PolygonFields />;
  }

  if (currentItemConfig.shape === 'none') {
    return null;
  }

  return (
    <Box className='fields-grid'>
      {dimensionFields[currentItemConfig.shape].map(field => (
        <TextField
          key={field}
          label={`${dimensionLabels[field]} (mm)`}
          type='number'
          value={currentItemConfig.dimensions[field] ?? ''}
          onChange={event => updateDimension(field, event.target.value)}
          error={Boolean(errors[field])}
          helperText={errors[field] ?? `${MIN_DIMENSION}–${MAX_DIMENSION} mm`}
          inputProps={{ min: MIN_DIMENSION, max: MAX_DIMENSION, step: 1 }}
        />
      ))}
    </Box>
  );
};

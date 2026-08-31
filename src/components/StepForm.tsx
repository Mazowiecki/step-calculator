import { Alert, Button, Divider, Stack, Typography } from '@mui/material';
import { validateConfig } from '../calculations';
import { useStepCalculator } from '../context/StepCalculatorContext';
import { DimensionFields } from './DimensionFields';
import { FinishOptions } from './FinishOptions';
import { StepSelectors } from './StepSelectors';

export const StepForm = () => {
  const { currentItemConfig, editingId, saveStep } = useStepCalculator();
  const errors = validateConfig(currentItemConfig);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Stack spacing={2.5}>
      <Typography variant='h2'>Konfiguracja stopnia</Typography>
      <StepSelectors />

      <DimensionFields />

      <Divider />

      <Typography variant='h3'>Wykończenie</Typography>
      <FinishOptions />
      {errors.shape && <Alert severity='info'>{errors.shape}</Alert>}

      {errors.area && <Alert severity='error'>{errors.area}</Alert>}
      <Button
        variant='contained'
        size='large'
        onClick={saveStep}
        disabled={hasErrors}
      >
        {editingId ? 'Zapisz zmiany' : 'Dodaj stopień'}
      </Button>
    </Stack>
  );
};

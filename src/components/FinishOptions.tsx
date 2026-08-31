import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { OPTIONS } from '../constants';
import { useStepCalculator } from '../context/StepCalculatorContext';
import type { OptionId } from '../types';

export const FinishOptions = () => {
  const { currentItemConfig, toggleOption } = useStepCalculator();

  return (
    <>
      {Object.entries(OPTIONS).map(([id, option]) => (
        <FormControlLabel
          key={id}
          control={
            <Checkbox
              checked={currentItemConfig.options.includes(id as OptionId)}
              onChange={() => toggleOption(id as OptionId)}
            />
          }
          label={
            <Typography>
              {option.label} (+{option.price}{' '}
              {option.unit === 'm2' ? 'zł/m²' : 'zł'})
            </Typography>
          }
        />
      ))}
    </>
  );
};

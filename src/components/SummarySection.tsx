import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { formatPrice, priceForStep } from '../calculations';
import { useStepCalculator } from '../context/StepCalculatorContext';
import { JsonDialog } from './JsonDialog';
import { StepList } from './StepList';

export const SummarySection = () => {
  const { items } = useStepCalculator();
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const total = items.reduce(
    (sum, item) => sum + priceForStep(item) * item.quantity,
    0
  );

  return (
    <section className='summary'>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <div>
          <Typography variant='h2'>Twoje stopnie</Typography>
          <Typography color='text.secondary'>
            {items.length
              ? 'Pozycje zostaną zsumowane w zapytaniu ofertowym.'
              : 'Dodaj pierwszy stopień do zestawienia.'}
          </Typography>
        </div>
        <Typography variant='h2'>
          Razem: <span className='price'>{formatPrice(total)}</span>
        </Typography>
      </Stack>
      <StepList />
      {items.length > 0 && (
        <Button variant='outlined' onClick={() => setIsJsonOpen(true)}>
          Pokaż JSON zapytania
        </Button>
      )}
      <JsonDialog open={isJsonOpen} onClose={() => setIsJsonOpen(false)} />
    </section>
  );
};

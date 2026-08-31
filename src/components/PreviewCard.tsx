import { Card, CardContent, Stack, Typography } from '@mui/material';
import { areaM2, formatPrice, priceForStep } from '../calculations';
import { useStepCalculator } from '../context/StepCalculatorContext';
import { Preview } from './Preview';

export const PreviewCard = () => {
  const { currentItemConfig } = useStepCalculator();
  const area = areaM2(currentItemConfig);
  const price = priceForStep(currentItemConfig);

  return (
    <Card>
      <CardContent>
        <Typography variant='h2'>Podgląd</Typography>
        <Preview config={currentItemConfig} />
        <Stack direction='row' justifyContent='space-between'>
          <div>
            <Typography variant='body2' color='text.secondary'>
              Powierzchnia
            </Typography>
            <Typography variant='h3'>{area.toFixed(3)} m²</Typography>
          </div>
          <div className='align-right'>
            <Typography variant='body2' color='text.secondary'>
              Szacunkowa cena
            </Typography>
            <Typography variant='h3' className='price'>
              {formatPrice(price)}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

import { Typography } from '@mui/material';

export const AppHeader = () => (
  <header>
    <Typography variant='overline'>CNC / DREWNO</Typography>
    <Typography variant='h1'>Kalkulator stopni</Typography>
    <Typography className='subtitle'>
      Zaprojektuj stopień zabiegowy, zobacz jego geometrię i przygotuj
      zestawienie do wyceny.
    </Typography>
  </header>
);

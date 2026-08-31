import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { priceForStep } from '../calculations';
import { useStepCalculator } from '../context/StepCalculatorContext';

export const JsonDialog = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { items } = useStepCalculator();
  const total = items.reduce(
    (sum, item) => sum + priceForStep(item) * item.quantity,
    0
  );
  const data = {
    items,
    total: Number(total.toFixed(2)),
    currency: 'PLN',
    vatIncluded: true
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Dane zapytania ofertowego</DialogTitle>
      <DialogContent>
        <pre className='json'>{JSON.stringify(data, null, 2)}</pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  );
};

import {
  Button,
  Card,
  Chip,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { dimensionLabels } from '../config/formConfig';
import { MATERIALS, OPTIONS, SHAPES } from '../constants';
import { formatPrice, priceForStep } from '../calculations';
import { useStepCalculator } from '../context/StepCalculatorContext';
import type { StepItem } from '../types';

export const StepList = () => {
  const { items, editingId, editStep, removeStep, updateQuantity } =
    useStepCalculator();

  return (
    <>
      {items.map(item => (
        <Card
          className={`item ${editingId === item.id ? 'item--editing' : ''}`}
          key={item.id}
        >
          <ItemSummary item={item} isEditing={editingId === item.id} />
          <Stack direction='row' alignItems='center' spacing={1}>
            <TextField
              size='small'
              label='Ilość'
              type='number'
              value={item.quantity}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
              inputProps={{ min: 1 }}
              sx={{ width: 90 }}
            />
            <Typography fontWeight={700}>
              {formatPrice(priceForStep(item) * item.quantity)}
            </Typography>
            <Button onClick={() => editStep(item)}>Edytuj</Button>
            <Button color='error' onClick={() => removeStep(item.id)}>
              Usuń
            </Button>
          </Stack>
        </Card>
      ))}
    </>
  );
};

const ItemSummary = ({
  item,
  isEditing
}: {
  item: StepItem;
  isEditing: boolean;
}) => {
  const shapeLabel = SHAPES.find(shape => shape.value === item.shape)?.label;
  const dimensions = Object.entries(item.dimensions)
    .map(([key, value]) => `${dimensionLabels[key] ?? key}: ${value} mm`)
    .join(' · ');

  return (
    <Stack spacing={0.75}>
      {isEditing && (
        <Typography variant='overline' color='primary'>
          Edytujesz ten stopień
        </Typography>
      )}
      <Typography fontWeight={700}>
        {MATERIALS[item.material].label} · {shapeLabel} · {item.thickness} mm
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {dimensions}
      </Typography>
      <Stack direction='row' flexWrap='wrap' gap={0.75}>
        {Object.entries(OPTIONS).map(([id, option]) => {
          const selected = item.options.includes(
            id as StepItem['options'][number]
          );
          return (
            <Chip
              key={id}
              size='small'
              variant={selected ? 'filled' : 'outlined'}
              color={selected ? 'primary' : 'default'}
              label={`${selected ? '✓' : '—'} ${option.label}`}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

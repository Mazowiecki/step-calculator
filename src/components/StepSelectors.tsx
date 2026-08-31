import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MATERIALS, SHAPES, THICKNESSES } from '../constants';
import { useStepCalculator } from '../context/StepCalculatorContext';
import type { ShapeType, StepConfig } from '../types';

export const StepSelectors = () => {
  const { currentItemConfig, setCurrentItemConfig, changeShape } =
    useStepCalculator();

  const updateMaterial = (material: StepConfig['material']) => {
    setCurrentItemConfig({ ...currentItemConfig, material });
  };

  const updateThickness = (thickness: StepConfig['thickness']) => {
    setCurrentItemConfig({ ...currentItemConfig, thickness });
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Materiał</InputLabel>

        <Select
          value={currentItemConfig.material}
          label='Materiał'
          onChange={event =>
            updateMaterial(event.target.value as StepConfig['material'])
          }
        >
          {Object.entries(MATERIALS).map(([id, material]) => (
            <MenuItem value={id} key={id}>
              {material.label} — {material.pricePerM2} zł/m²
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Grubość</InputLabel>

        <Select
          value={currentItemConfig.thickness}
          label='Grubość'
          onChange={event =>
            updateThickness(
              Number(event.target.value) as StepConfig['thickness']
            )
          }
        >
          {THICKNESSES.map(item => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Kształt</InputLabel>

        <Select
          value={currentItemConfig.shape}
          label='Kształt'
          onChange={event => changeShape(event.target.value as ShapeType)}
        >
          {SHAPES.map(shape => (
            <MenuItem value={shape.value} key={shape.value}>
              {shape.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

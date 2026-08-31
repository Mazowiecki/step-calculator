import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import {
  defaultPolygonPoints,
  createInitialConfig,
  dimensionsForShape,
  initialConfig
} from '../config/defaultConfig';
import { validateConfig } from '../calculations';
import type { OptionId, ShapeType, StepConfig, StepItem } from '../types';

interface CalculatorContextValue {
  currentItemConfig: StepConfig;
  items: StepItem[];
  editingId: string | null;
  setCurrentItemConfig: (currentItemConfig: StepConfig) => void;
  changeShape: (shape: ShapeType) => void;
  toggleOption: (option: OptionId) => void;
  saveStep: () => void;
  editStep: (item: StepItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeStep: (id: string) => void;
}

const StepCalculatorContext = createContext<CalculatorContextValue | null>(
  null
);

export const StepCalculatorProvider = ({ children }: PropsWithChildren) => {
  const [currentItemConfig, setCurrentItemConfig] =
    useState<StepConfig>(initialConfig);
  const [items, setItems] = useState<StepItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const changeShape = (shape: ShapeType) => {
    const polygonPoints =
      shape === 'polygon' ? defaultPolygonPoints() : undefined;

    setCurrentItemConfig({
      ...currentItemConfig,
      shape,
      dimensions: dimensionsForShape(shape),
      polygonPoints
    });
  };

  const toggleOption = (option: OptionId) => {
    const options = currentItemConfig.options.includes(option)
      ? currentItemConfig.options.filter(item => item !== option)
      : [...currentItemConfig.options, option];

    setCurrentItemConfig({ ...currentItemConfig, options });
  };

  const saveStep = () => {
    const errors = validateConfig(currentItemConfig);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (editingId) {
      setItems(
        items.map(item =>
          item.id === editingId
            ? { ...currentItemConfig, id: editingId, quantity: item.quantity }
            : item
        )
      );
      setEditingId(null);
      setCurrentItemConfig(createInitialConfig());

      return;
    }

    const existing = items.find(
      item =>
        JSON.stringify({ ...item, id: undefined, quantity: undefined }) ===
        JSON.stringify({
          ...currentItemConfig,
          id: undefined,
          quantity: undefined
        })
    );

    if (existing) {
      setItems(
        items.map(item =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        { ...currentItemConfig, id: crypto.randomUUID(), quantity: 1 }
      ]);
    }

    setCurrentItemConfig(createInitialConfig());
  };

  const editStep = (item: StepItem) => {
    setCurrentItemConfig(item);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeStep = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const value = useMemo(
    () => ({
      currentItemConfig,
      items,
      editingId,
      setCurrentItemConfig,
      changeShape,
      toggleOption,
      saveStep,
      editStep,
      updateQuantity,
      removeStep
    }),
    [currentItemConfig, items, editingId]
  );

  return (
    <StepCalculatorContext.Provider value={value}>
      {children}
    </StepCalculatorContext.Provider>
  );
};

export const useStepCalculator = () => {
  const context = useContext(StepCalculatorContext);

  if (!context) {
    throw new Error(
      'useStepCalculator musi być użyty wewnątrz StepCalculatorProvider'
    );
  }

  return context;
};

import { Box, FormControl } from 'native-base';
import { StepInput, ButtonControl } from '@/components/features/recipe/form/RecipeCreateInput';
import { Step } from '@/types/interface';

interface RecipeStepsControlProps {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}

const RecipeStepsControl: React.FC<RecipeStepsControlProps> = ({
  steps,
  setSteps,
  color,
  colorPlaceholder,
  borderColor
}) => {
  const handleStepChange = (text: string, id: number) => {
    const updatedSteps = steps.map((step) =>
      step.id === id ? { ...step, text: text } : step
    );
    setSteps(updatedSteps);
  };

  return (
    <Box width="100%">
      <FormControl mt="2">
        {steps.map((step, index) => (
          <StepInput
            key={index}
            step={step}
            index={index}
            onChange={(text) => handleStepChange(text, step.id)}
            onPickImage={(imageUri) => {
              const updatedSteps = steps.map((s) =>
                s.id === step.id ? { ...s, image: imageUri } : s
              );
              setSteps(updatedSteps);
            }}
            color={color}
            colorPlaceholder={colorPlaceholder}
            borderColor={borderColor}
          />
        ))}
        <ButtonControl
          color={color}
          colorPlaceholder={colorPlaceholder}
          borderColor="transparent"
          addItem={() => setSteps([...steps, { id: steps.length + 1, text: '', image: "" }])}
          removeItem={() => setSteps(steps.slice(0, -1))}
        />
      </FormControl>
    </Box>
  );
};

export default RecipeStepsControl;

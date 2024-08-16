import { Box, FormControl } from 'native-base';
import { IngredientInput, ButtonControl } from '@/components/features/recipe/form/RecipeCreateInput';
import { Ingredient } from '@/types/interface';

interface RecipeIngredientsControlProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}
  
const RecipeIngredientsControl: React.FC<RecipeIngredientsControlProps> = ({
  ingredients,
  setIngredients,
  color,
  colorPlaceholder,
  borderColor
}) => {
  const handleInputChange = (text: string, id: number, isQuantity: boolean = false) => {
    const updatedIngredients = ingredients.map((item) =>
      item.id === id ? { ...item, ...(isQuantity ? { quantity: text } : { text: text }) } : item
    );
    setIngredients(updatedIngredients);
  };

  return (
    <Box width="100%">
      <FormControl mt="2">
        {ingredients.map((ingredient, index) => (
          <IngredientInput
            key={index}
            ingredient={ingredient}
            onChange={(text) => handleInputChange(text, ingredient.id)}
            onQuantityChange={(text) => handleInputChange(text, ingredient.id, true)}
            color={color}
            colorPlaceholder={colorPlaceholder}
            borderColor={borderColor}
          />
        ))}
        <ButtonControl          
          color={color}
          colorPlaceholder={colorPlaceholder}
          borderColor="transparent"
          addItem={() => setIngredients([...ingredients, { id: ingredients.length + 1, text: '', quantity: '' }])}
          removeItem={() => setIngredients(ingredients.slice(0, -1))}
        />
      </FormControl>
    </Box>
  );
};

export default RecipeIngredientsControl;

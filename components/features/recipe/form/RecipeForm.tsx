import { VStack } from "native-base";
import { useRecipeForm } from "@/hooks/useRecipeForm";
import { Recipe } from "@/types/interface";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useThemeTextColor, useThemeBtnColor } from "@/hooks/useThemeColor";

import RecipeName from "@/components/features/recipe/form/RecipeName";
import RecipeImage from "@/components/features/recipe/form/RecipeImage";
import RecipeActionsheet from "@/components/features/recipe/form/RecipeActionsheet";
import RecipeIngredientsControl from "@/components/features/recipe/form/RecipeIngredientsControl";
import RecipeStepsControl from "@/components/features/recipe/form/RecipeStepsControl";
import RecipeMemoControl from "@/components/features/recipe/form/RecipeMemoControl";
import RecipeSaveButton from "@/components/features/recipe/form/RecipeSaveButton";

type Props = {
  recipe?: Recipe;
  isCreate?: boolean;
};

export default function RecipeForm({ recipe, isCreate }: Props) {

  const { textPrimaryColor, placeholderColor, borderColor, linkColor } = useThemeTextColor();
  const { btnBackground } = useThemeBtnColor();

  const {
    recipeName,
    setRecipeName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    recipeMemo,
    setRecipeMemo,
    mainImage,
    setMainImage,
    isImageLoading,
    isOpen,
    onOpen,
    onClose,
    handleSaveRecipe,
    pickImage,
  } = useRecipeForm({ recipe });

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      scrollEnabled={true}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <VStack space={4} alignItems="center" mb="10">
        <RecipeName
          value={recipeName}
          onChange={setRecipeName}
          placeholder="レシピ名を入力"
          color={textPrimaryColor}
          colorPlaceholder={placeholderColor}
          inputHeight="60"
        />

        <RecipeImage
          image={mainImage}
          isLoading={isImageLoading}
          onOpen={onOpen}
          color={textPrimaryColor}
          colorPlaceholder={placeholderColor}
          onPickImage={(source) => setMainImage(source)}
        />

        <RecipeActionsheet
          isOpen={isOpen}
          onClose={onClose}
          image={mainImage}
          onPickImage={pickImage}
        />

        <RecipeIngredientsControl
          ingredients={ingredients}
          setIngredients={setIngredients}
          color={textPrimaryColor}
          colorPlaceholder={placeholderColor}
          borderColor={borderColor}
        />

        <RecipeStepsControl
          steps={steps}
          setSteps={setSteps}
          color={textPrimaryColor}
          colorPlaceholder={placeholderColor}
          borderColor={borderColor}
        />

        <RecipeMemoControl
          memo={recipeMemo}
          onChange={setRecipeMemo}
          color={textPrimaryColor}
          colorPlaceholder={placeholderColor}
          borderColor={borderColor}
        />

        <RecipeSaveButton
          isCreate={isCreate}
          onPress={handleSaveRecipe}
          bgColor={btnBackground}
          borderColor={linkColor}
          color={textPrimaryColor}
        />
      </VStack>
    </KeyboardAwareScrollView>
  );
}

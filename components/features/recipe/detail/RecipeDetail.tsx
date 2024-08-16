import { Recipe } from "@/types/interface";
import { Box, HStack, VStack } from "native-base";
import { ThemedText } from "@/components/common/text/ThemedText";
import { ThemedIconText } from "@/components/common/text/ThemedIconText";
import ImageCard from "@/components/common/card/ImageCard";

import RecipeImageCard from "@/components/features/recipe/detail/RecipeImageCard";
import RecipeMemo from "@/components/features/recipe/detail/RecipeMemo";
import RecipeTodo from "@/components/features/recipe/detail/RecipeTodo";
import RecipeIngredientsList from "@/components/features/recipe/detail/RecipeIngredientsList";
import {
  useThemeTextColor,
  useThemeBtnColor,
  useThemeIconColor,
} from "@/hooks/useThemeColor";

type Props = {
  recipe: Recipe;
  userName: string;
};

export default function RecipeDetail({ recipe, userName }: Props) {
  const { textPrimaryColor, textSecondaryColor, borderColor, linkColor } = useThemeTextColor();
  const { btnTextColor, btnBorder } = useThemeBtnColor();
  const { iconPrimaryColor } = useThemeIconColor();

  return (
    <VStack mx={3} space={5}>
      <ThemedText
        color={textPrimaryColor}
        type="subtitle"
        text={recipe.name}
      />
      <ImageCard imageUri={recipe.image} />
      <Box>
        <RecipeIngredientsList
          titleColor={textSecondaryColor}
          textColor={textPrimaryColor}
          borderColor={borderColor}
          ingredients={recipe.ingredients}
        />
        <RecipeTodo
          iconColor={iconPrimaryColor}
          btnTextColor={btnTextColor}
          btnBorderColor={btnBorder}
          linkColor={linkColor}
        />
      </Box>
      <RecipeMemo
        memo={recipe.memo}
        titleColor={textSecondaryColor}
        textColor={textPrimaryColor}
        borderColor={borderColor}
      />
      <HStack alignItems="center" space={1}>
        <ThemedText
          color={textSecondaryColor}
          type="default"
          text="created by： "
        />
        <ThemedIconText
          color={textSecondaryColor}
          type="default"
          text={userName}
        />
      </HStack>
    </VStack>
  );
}

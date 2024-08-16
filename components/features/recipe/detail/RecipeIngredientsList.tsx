import { FlatList, Text, HStack } from "native-base";
import { Ingredient } from "@/types/interface";
import { ThemedText } from "@/components/common/text/ThemedText";

type IngredientsListProps = {
  titleColor: string;
  textColor: string;
  borderColor: string;
  ingredients: Ingredient[];
};

function RecipeIngredientsList({ ingredients, titleColor, borderColor, textColor }: IngredientsListProps) {

  return (
    <>
      <ThemedText color={titleColor} text={"材料"} type="defaultSemiBold" />
      <FlatList
        data={ingredients}
        keyExtractor={(item: Ingredient) => item.id.toString()}
        renderItem={({ item }: { item: Ingredient }) => (
          <HStack
            justifyContent="space-between"
            alignItems="center"
            borderBottomWidth={1}
            borderBottomColor={borderColor}
            py={2}
          >
            <Text fontSize="md" color={textColor}>
              {item.text}
            </Text>
            <Text mr="4" fontSize="md" color={textColor}>
              {item.quantity}
            </Text>
          </HStack>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={false}
      />
    </>
  );
}

export default RecipeIngredientsList;

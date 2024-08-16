import React, { useState, useEffect } from "react";
import { Box, Pressable, HStack, VStack, Text, FlatList } from "native-base";
import { Recipe } from "@/types/interface";
import { useStackNavigation } from "@/hooks/useStackNavigation";
import { useThemeTextColor } from "@/hooks/useThemeColor";

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [listData, setListData] = useState<Recipe[]>(recipes);
  const { navigation } = useStackNavigation();
  const { textPrimaryColor, borderColor } = useThemeTextColor();

  useEffect(() => {
    setListData(recipes);
  }, [recipes]);

  const renderItem = ({ item }: { item: Recipe }) => (
    <Pressable
      onPress={() => navigation.navigate("RecipeDetail", { id: item.id })}
      borderBottomWidth={1}
      borderBottomColor={borderColor}
      borderRadius="5px"
      mb="10px"
    >
      <Box pl="4" pr="5" py="2">
        <HStack alignItems="center" justifyContent="space-between" space={2}>
          <VStack>
            <Text fontSize="md" color={textPrimaryColor} bold>
              {item.name}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
    />
  );
};

export default RecipeList;

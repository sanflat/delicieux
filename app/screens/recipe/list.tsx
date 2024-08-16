import React, { useState, useEffect, useCallback } from "react";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import CustomFab from "@/components/common/button/CustomFab";
import RecipeListHeader from "@/components/common/header/RecipeListHeader";
import { ScrollView } from "native-base";
import { Recipe } from "@/types/interface";
import { useStackNavigation } from "@/hooks/useStackNavigation";
import Loading from "@/components/common/status/Loading";
import Error from "@/components/common/status/ErrorAlert";
import useFetchRecipeList from "@/hooks/useFetchRecipeList";
import RecipeListView from "@/components/features/recipe/detail/RecipeListView";
import useAuth from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";

export default function RecipeListScreen() {
  const { user } = useAuth();
  const { navigation } = useStackNavigation();
  const { recipes, loading, error } = useFetchRecipeList(user?.id || "");
  const [ displayedData, setDisplayedData ] = useState<Recipe[]>([]);
  const [ search, setSearch ] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const filteredData = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setDisplayedData(filteredData);
  }, [debouncedSearch, recipes]);

  const updateSearch = useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, []);

  if (error) {
    return <Error />;
  }

  if (loading || !recipes) {
    return <Loading />;
  }

  return (
    <DisplayView
      header={<RecipeListHeader search={search} updateSearch={updateSearch} />}
    >
      <ScrollView>
        <MainArea>
          <RecipeListView recipes={displayedData} />
        </MainArea>
      </ScrollView>

      <CustomFab
        icon="plus"
        onPress={() => navigation.navigate("RecipeCreate")}
        iconType="MaterialCommunityIcons"
      />
    </DisplayView>
  );
}

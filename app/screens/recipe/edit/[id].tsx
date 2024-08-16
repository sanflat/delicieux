import React, { useEffect, useState } from "react";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import Loading from "@/components/common/status/Loading";
import Error from "@/components/common/status/ErrorAlert";

import RecipeForm from "@/components/features/recipe/form/RecipeForm";
import DetailHeader from "@/components/common/header/DetailHeader";
import { useRoute } from "@react-navigation/native";
import useFetchRecipe from "@/hooks/useFetchRecipe";

export default function RecipeEditScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { recipe, loading, error, userName } = useFetchRecipe(id);

  if (error) {
    return <Error />;
  }

  if (loading || !recipe) {
    return <Loading />;
  }
  return (
    <DisplayView header={<DetailHeader />}>
      <MainArea>
          <RecipeForm recipe={recipe} />
      </MainArea>
    </DisplayView>
  );
}

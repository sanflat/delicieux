import { useState, useEffect } from "react";
import { Recipe } from "@/types/interface";
import { fetchUserRecipes } from "@/services/recipeService";

const useFetchRecipeList = (userId: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecipeList = async () => {
      setLoading(true);
      setError(null);

      try {
        const recipes = await fetchUserRecipes(userId);
        if (recipes) {
          setRecipes(recipes);
        } else {
          // レシピデータが空でもエラーではない
          setRecipes([]);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("データの取得中にエラーが発生しました。")
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecipeList();
    }
  }, [userId]);

  return { recipes, loading, error };
};

export default useFetchRecipeList;

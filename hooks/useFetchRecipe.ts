import { useState, useEffect } from "react";
import { Recipe } from "@/types/interface";
import { fetchRecipeByRecipeId } from "@/services/recipeService";
import { fetchUserByUserId } from "@/services/userService";

const useFetchRecipe = (recipeId: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const recipeData = await fetchRecipeByRecipeId(recipeId);

        if (recipeData) {
          setRecipe(recipeData);
          if (recipeData.userId) {
            const userData = await fetchUserByUserId(recipeData.userId);
            if (userData) {
              setUserName(userData.userName);
            } else {
              console.log("ユーザーが見つかりませんでした。");
            }
          }
        } else {
          setError(new Error("レシピが見つかりませんでした。"));
          setRecipe(null);
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

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  return { recipe, loading, error, userName };
};

export default useFetchRecipe;
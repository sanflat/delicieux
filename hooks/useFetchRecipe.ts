import { useState, useEffect } from "react";
import { Recipe, User } from "@/types/interface";
import { fetchRecipeByRecipeId } from "@/services/recipeService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

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
            const userRef = doc(db, "users", recipeData.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data() as User;
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

    // 依存配列にrecipeIdを含めることで、IDが変更された際に再取得を行う
  }, [recipeId]);

  return { recipe, loading, error, userName };
};

export default useFetchRecipe;

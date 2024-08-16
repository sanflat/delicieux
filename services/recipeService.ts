import { db } from '../firebaseConfig';
import { collection, doc, deleteDoc, getDoc, addDoc, getDocs, query, where } from 'firebase/firestore';
import { User, Recipe, Ingredient, Step, RecipeWithUserName } from '@/types/interface';

/**
 * 特定のレシピIDを使用してFirestoreからレシピを取得します。
 * @param {string} recipeId レシピのドキュメントID
 * @return {Promise<Recipe | null>} レシピのデータを返します。見つからない場合はnullを返します。
 */
export const fetchRecipeByRecipeId = async (recipeId: string ): Promise<Recipe | null> => {
  try {
    const recipeRef = doc(db, 'recipes', recipeId);
    const recipeSnap = await getDoc(recipeRef); 

    if (recipeSnap.exists()) {
      const recipeData = { id: recipeSnap.id, ...recipeSnap.data() } as Recipe;
      return recipeData;
    } else {
      console.log("レシピが見つかりませんでした");
      return null;
    }
  } catch (error) {
    console.error("レシピ取得エラー:", error);
    throw error;
  }
}

/**
 * レシピデータの登録
 * @param userId 
 * @param name 
 * @param ingredients 
 * @param steps 
 * @param memo 
 * @param image 
 * @returns 
 */
export async function saveRecipe(
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string,
  image: string | null
): Promise<string> {
  const recipeDocRef = await addDoc(collection(db, 'recipes'), {
    userId,
    name,
    ingredients,
    steps: [],
    memo,
    image: image,
    createdAt: new Date().toISOString(),
  });

  return recipeDocRef.id;
}

/**
 * 指定されたレシピをFirestoreから削除します。
 * @param {string} recipeId 削除するレシピのドキュメントID
 */
export const deleteRecipe = async (recipeId: string): Promise<void> => {
  await deleteDoc(doc(db, "recipes", recipeId));
};

/**
 * 特定のユーザーのレシピを非同期で取得します。
 * ユーザーがnullである場合は何もしません。
 *
 * @param {string} userId ログインしているユーザーのID
 * @return {Promise<Recipe[] | null>} 取得したレシピの配列またはユーザーがnullの場合はnullを返します。
 */
export const fetchUserRecipes = async (userId: string | null): Promise<Recipe[] | null> => {
  if (!userId) return null; // ユーザー情報がなければ処理を中断

  try {
    // ユーザーのIDを使ってそのユーザーのレシピを取得するクエリを作成
    const userRecipesQuery = query(collection(db, 'recipes'), where('userId', '==', userId));
    const userRecipesSnapshot = await getDocs(userRecipesQuery);
    
    // レシピデータを取得し、ユーザー名を追加して新しい配列を作成
    return await Promise.all(userRecipesSnapshot.docs.map(async (docSnap) => {
      const recipeData = docSnap.data() as Recipe;
      const userDoc = await getDoc(doc(db, 'users', recipeData.userId));
      const userName = userDoc.exists() ? userDoc.data()?.userName || 'Unknown' : 'Unknown';
      return { ...recipeData, id: docSnap.id, userName }; // レシピデータにユーザー名を加えて返す
    }));
  } catch (error) {
    console.error('ユーザーレシピの取得中にエラーが発生しました: ', error);
    return null;
  }
};

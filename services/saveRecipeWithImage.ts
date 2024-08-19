import { updateRecipe, updateRecipeMainImage, updateRecipeSteps } from './firestoreService';
import { uploadImage, uploadStepImages } from './storageService';
import { Ingredient, Step } from '@/types/interface';
import { saveRecipe } from "@/services/recipeService";

/**
 * 新規レシピの保存と、外部のStorageに画像のアップロードを行うスタブ
 * @param {string} userId 保存するレシピのユーザーID
 * @param {string} name 保存するレシピ名
 * @param {Ingredient[]} ingredients レシピの材料
 * @param {Step[]} steps レシピの手順  
 * @param {string} memo レシピのメモ
 * @param {string} image レシピの完成イメージ 
 */
export async function saveRecipeWithImage(
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string,
  image: string
): Promise<string> {
  try {
    // まずレシピを保存し、レシピIDを取得
    const recipeId = await saveRecipe(userId, name, ingredients, steps, memo, null);

    if (image) {
      // 画像をアップロードし、URLを取得
      let imageUrl = await uploadImage(image, recipeId);
      // Firestoreのレシピドキュメントを更新
      await updateRecipeMainImage(recipeId, imageUrl);
    }

    // ステップ画像をアップロードし、ステップの更新
    const updatedSteps = await uploadStepImages(steps, recipeId);
    await updateRecipeSteps(recipeId, updatedSteps);

    return recipeId;
  } catch (error) {
    console.error('画像付きレシピの保存エラー', error);
    throw error;
  }
}

/**
 * 既存のレシピ更新と、外部のStorageに画像のアップロードを行うスタブ
 * @param {string} recipeId 更新するレシピのドキュメントID
 * @param {string} userId 保存するレシピのユーザーID
 * @param {string} name 保存するレシピ名
 * @param {Ingredient[]} ingredients レシピの材料
 * @param {Step[]} steps レシピの手順  
 * @param {string} memo レシピのメモ
 * @param {string} image レシピの完成イメージ 
 */
export async function updateRecipeWithImage(
  recipeId: string,
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string,
  image: string | null
): Promise<void> {
  try {
    console.log("recipeId1" + recipeId);

    // まずレシピを更新
    await updateRecipe(recipeId, userId, name, ingredients, steps, memo);

    let imageUri = null;
    if (image) {
      // 画像をアップロードし、URLを取得
      imageUri = await uploadImage(image, recipeId);
      // Firestoreのレシピドキュメントを更新
      await updateRecipeMainImage(recipeId, imageUri);
    }

    // ステップ画像をアップロードし、ステップの更新
    const updatedSteps = await uploadStepImages(steps, recipeId);
    await updateRecipeSteps(recipeId, updatedSteps);
  } catch (error) {
    console.error('画像を含むレシピの更新中にエラーが発生しました:', error);
    throw error;
  }
}

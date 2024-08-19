
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Step } from '@/types/interface';

/**
 * 指定されたURIから画像をアップロードし、そのダウンロードURLを返す非同期関数（スタブ）
 * @param {string} uri 画像のURI
 * @param {string} recipeId レシピID
 * @returns {Promise<string>} 画像のダウンロードURL
 */
export async function uploadImage(uri: string, recipeId: string): Promise<string> {
  console.log('画像をアップロードしました（スタブ）: URI:', uri);
  // デモンストレーション用にダウンロードURLを返す
  return `https://example.com/recipes/${recipeId}/main.jpg`;
}

/**
 * 手順情報のリストをループし、手順画像をStorageにアップロードする（スタブ）
 */
export async function uploadStepImages(steps: Step[], recipeId: string): Promise<Step[]> {
  return Promise.all(
    steps.map(async (step, index) => {
      if (step.image) {
        const imageUrl = await uploadImage(step.image, `recipes/${recipeId}/steps/step${index + 1}.jpg`);
        return { ...step, image: imageUrl };
      }
      return step;
    })
  );
}
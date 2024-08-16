import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Step } from '@/types/interface';

/**
 * 指定されたURIから画像をアップロードし、そのダウンロードURLを返す非同期関数
 */
export async function uploadImage(uri: string, recipeId: string): Promise<string> {
  // URIから画像データをフェッチする
  const response = await fetch(uri);
  // 取得したデータをBlob形式に変換する
  const blob = await response.blob();
  // ストレージへの参照を作成する（pathには保存先のパスを指定）
  const storageRef = ref(storage, `recipes/${recipeId}/main.jpg`);
  // BlobデータをFirebase Storageにアップロードする
  await uploadBytes(storageRef, blob);
  // アップロードしたファイルのダウンロードURLを取得する
  return getDownloadURL(storageRef);
}

/**
 * 手順情報のリストをループし、手順画像をStorageにアップロードする
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
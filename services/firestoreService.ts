import { useCallback } from 'react';
import { db } from '../firebaseConfig';
import { collection, deleteDoc, addDoc, doc, updateDoc, setDoc, getDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { Ingredient, Step } from '@/types/interface';

export const handleToggleCheckbox = (id:string, isDone:boolean) => useCallback(async () => {
  try {
    const taskId = await getDocumentIdByTaskId(id);
    if (taskId) {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        done: !isDone
      });
      console.log("タスクの完了ステータスがトグルされました。", !isDone);
    } else {
      console.error("有効なタスクIDが見つかりませんでした。");
    }
  } catch (error) {
    console.error("タスクの完了ステータスのトグル中にエラーが発生しました：", error);
  }
}, [id, isDone]);

/**
 * 特定のIDフィールド値に基づいてタスクのドキュメントIDを取得します。
 * @param {string} id フィールド値としてのタスクID
 * @return {Promise<string|null>} ドキュメントIDまたは該当なしの場合はnull
 */
export const getDocumentIdByTaskId = async (id: string): Promise<string | null> => {
  const q = query(collection(db, "tasks"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    // 最初のドキュメントのIDを返す
    return querySnapshot.docs[0].id;
  } else {
    console.error("No document matches the provided task ID.");
    return null;
  }
};

export const deleteTaskInFirestore = async (taskId: string) => {
  try {
    const docRef = doc(db, "tasks", taskId);
    await deleteDoc(docRef);
    console.log("Document successfully deleted");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

/**
 * 特定のタスクの subject を更新します。
 * @param {string} taskId - 更新するタスクのID
 * @param {string} newSubject - 新しい subject の値
 */
export const updateTaskSubjectInFirestore = async (taskId:string, newSubject:any) => {
  console.log("taskId:" + taskId)
  const taskRef = doc(db, 'tasks', taskId);
  try {
    console.log("try:" + taskRef)
    await updateDoc(taskRef, {
      subject: newSubject
    });
  } catch (error) {
    console.error("Error updating task subject:", error);
  }
};

export async function updateRecipe(
  id: string,
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string
): Promise<void> {
  const recipeDocRef = doc(db, 'recipes', id);
  await updateDoc(recipeDocRef, {
    userId,
    name,
    ingredients,
    steps,
    memo,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateRecipeMainImage(recipeId: string, imageUrl: string): Promise<void> {
  const recipeDocRef = doc(db, 'recipes', recipeId);
  await updateDoc(recipeDocRef, {
    image: imageUrl,
  });
}

export async function updateRecipeSteps(recipeId: string, steps: Step[]): Promise<void> {
  const recipeDocRef = doc(db, 'recipes', recipeId);
  await updateDoc(recipeDocRef, {
    steps,
  });
}

export async function saveUserGroup(groupId: string, userIds: string[]): Promise<void> {
  const groupDocRef = doc(db, 'userGroups', groupId);
  await setDoc(groupDocRef, {
    userIds
  });
}

export async function getUserGroup(id: string): Promise<string[]> {
  const groupDocRef = doc(db, 'groups', id);
  const groupDoc = await getDoc(groupDocRef);
  if (groupDoc.exists()) {
    return groupDoc.data().userIds;
  } else {
    throw new Error('No such group!');
  }
}

export async function getUserGroupId(userId: string): Promise<string | null> {
  const userDocRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.groupId || null;
  } else {
    console.error("No such user document!");
    return null;
  }
}

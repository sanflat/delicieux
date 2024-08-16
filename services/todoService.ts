import { db } from '../firebaseConfig';
import { collection, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, doc, query, orderBy, where, arrayUnion } from 'firebase/firestore';
import { ToDo } from '@/types/interface';

/**
 * 新しいタスクを Firestore に追加します。
 */
export const addTodo = async( text: string, userIds:string[], done:boolean ) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        text,
        userIds,
        done,
        createdAt: new Date().toISOString(),
      });
      return docRef.id; // 新しく追加されたドキュメントの ID を返します
    } catch (error) {
      console.error("Error adding todo to Firestore:", error);
    }
};

/**
 * タスクのシェア情報を更新します。
 */
export const updateTodoShare = async (currentUserId: string, shareItemIds: string[], selectedUserIds: string[]) => {
  // 現在のユーザーIDが無効（空または未定義）の場合は処理を中断
  if (!currentUserId) {
    console.error("Invalid current user ID.");
    return;
  }

  try {
    const updates = shareItemIds.map(async (itemId) => {
      const todoDocRef = doc(db, "todos", itemId);
      
      // selectedUserIdsが空かどうかを確認して、適切なユーザーIDを配列に設定
      const userIdsToUpdate = selectedUserIds.length > 0 
                               ? [currentUserId, ...selectedUserIds] // 現在のユーザーIDと選択されたユーザーIDを結合
                               : [currentUserId]; // 選択されたユーザーがいなければ、現在のユーザーIDのみ

      // ドキュメントの更新
      return await updateDoc(todoDocRef, {
        userIds: arrayUnion(...userIdsToUpdate) // 更新するユーザーIDをドキュメントに追加
      });
    });

    // すべての更新操作が完了するのを待つ
    await Promise.all(updates);
    console.log("Todos successfully shared.");
  } catch (error) {
    console.error("Error sharing todos:", error);
    throw error; // エラーを再投げして呼び出し元に知らせる
  }
};


export const resetTodoShare = async (currentUserId: string, shareItemIds: string[]) => {
  // 現在のユーザーIDが無効（空または未定義）の場合は処理を中断
  if (!currentUserId) {
    console.error("Invalid current user ID.");
    return;
  }

  try {
    const updates = shareItemIds.map(async (itemId) => {
      const todoDocRef = doc(db, "todos", itemId);
      
      // ドキュメントの更新
      return await setDoc(todoDocRef, {
        userIds: [currentUserId]
      }, { merge: true }); // 他のフィールドを保持しつつ、userIdsのみを更新
    });

    // すべての更新操作が完了するのを待つ
    await Promise.all(updates);
    console.log("Todos successfully reset to the current user.");
  } catch (error) {
    console.error("Error resetting todos:", error);
    throw error; // エラーを再投げして呼び出し元に知らせる
  }
};


/**
 * タスクのテキストを更新します。
 */
export const updateTodoText = async( text: string, id:string ) => {
  const todoDocRef = doc(db, 'todos', id);
  try {
    await updateDoc(todoDocRef, {
      text: text
    });

  } catch (error) {

  }
};

/**
 * タスクの完了状態を更新します。
 */
export const updateTodoDone = async( done: boolean, id:string ) => {
  const todoDocRef = doc(db, 'todos', id);
  try {
    await updateDoc(todoDocRef, {
      done: done
    });

  } catch (error) {

  }
};

/**
 * タスクの削除します
 */
export const deleteTodo = async (id: string) => {
  try {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    console.log("Document successfully deleted");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

/**
 * 指定したユーザーのタスクデータをリアルタイムに取得し、変更があるたびにコールバックを実行します。
 * @param userId 取得するタスクのユーザーID
 * @param callback タスクデータが更新されたときに実行されるコールバック関数
 * @returns 購読解除関数
 */
export function subscribeToTasks(userId: string, callback: (todos: Array<any>) => void) {
  const todosQuery = query(collection(db, "todos"), where("userIds", "array-contains", userId), orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(todosQuery, snapshot => {
    const todos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(todos);
  });

  return unsubscribe;
}
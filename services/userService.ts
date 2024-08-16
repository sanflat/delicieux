import { User } from '@/types/interface';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, query, where, documentId } from 'firebase/firestore';

// userドキュメントの作成
export const createUserDocument = async (userId: string, email: string | null, userName: string | null) => {
    try {
      await setDoc(doc(db, "users", userId), {
        userId,
        email,
        userName,
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }
};

/**
 * Firestoreのユーザードキュメントを更新します（存在する場合のみ）。
 * emailまたはuserNameがnullまたは空の場合、それらのフィールドは更新しません。
 * @param {string} userId ユーザーID
 * @param {string} email 新しいメールアドレス
 * @param {string} userName 新しいユーザー名
 */
export const updateUserDocument = async (userId: string, email: string, userName: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const updates: Partial<{ email: string; userName: string }> = {};
      if (email) updates.email = email;
      if (userName) updates.userName = userName;

      console.log(userName);
      if (Object.keys(updates).length > 0) {
        await updateDoc(userRef, updates);
        console.log("User document updated successfully.");
      } else {
        console.log("No updates to apply.");
      }
    } else {
      console.log("User document does not exist and will not be created.");
    }
  } catch (error) {
    console.error("Error updating user document:", error);
  }
};

/**
 * 特定のユーザーIDを使用してFirestoreからメールアドレスとユーザー名を取得します。
 * @param {string} userId ユーザーのドキュメントID
 * @return {Promise<User | null>} ユーザーのデータを返します。見つからない場合はnullを返します。
 */
export const fetchUserByUserId = async (userId: string ): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef); 
    if (userSnap.exists()) {
      const userData = { id: userSnap.id, ...userSnap.data() } as User;
      return userData;
    } else {
      console.log("ユーザーが見つかりませんでした");
      return null;
    }
  } catch (error) {
    console.error("ユーザー取得エラー:", error);
    throw error;
  }
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as User));

    // usersDataが空の場合、空の配列を返す
    return usersData.length > 0 ? usersData : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    // エラーが発生した場合は空の配列を返す
    return [];
  }
};

export const fetchUserNamesByIds = async (userIds: string[]): Promise<string[]> => {
  // userIdsが空の場合は、空の配列をすぐに返す
  if (userIds.length === 0) {
    return [];
  }

  const usersRef = collection(db, "users");
  // Firebaseの仕様で "in" オペレータは最大10個の要素を扱えるため、この点も考慮する
  const q = query(usersRef, where(documentId(), "in", userIds.slice(0, 10)));
  const querySnapshot = await getDocs(q);
  const names = querySnapshot.docs.map(doc => doc.data().userName || "");
  return names;
};
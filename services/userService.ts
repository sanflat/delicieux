import { User } from '@/types/interface';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, query, where, documentId } from 'firebase/firestore';

// userドキュメントの作成
export const createUserDocument = async (userId: string, email: string | null, userName: string | null) => {
  console.log('ユーザードキュメントを作成しました（スタブ）:', userId, email, userName);
};

/**
 * Firestoreのユーザードキュメントを更新します（存在する場合のみ）。
 * emailまたはuserNameがnullまたは空の場合、それらのフィールドは更新しません。
 * @param {string} userId ユーザーID
 * @param {string} email 新しいメールアドレス
 * @param {string} userName 新しいユーザー名
 */
export const updateUserDocument = async (userId: string, email: string, userName: string) => {
  console.log('ユーザードキュメントを更新しました（スタブ）:', userId, email, userName);
};

/**
 * 特定のユーザーIDを使用してスタブデータからユーザー情報を取得します。
 * @param {string} userId ユーザーのドキュメントID
 * @return {Promise<User | null>} ユーザーのデータを返します。見つからない場合はnullを返します。
 */
export const fetchUserByUserId = async (userId: string ): Promise<User | null> => {
  // スタブデータのユーザー
  const fireBaseUserStub: User = {
    id: "stbUserId",
    email: "yohei-kano@delicieux.com",
    userName: "Yohei Kano",
    password: "passeord"
  };

  return new Promise<User | null>((resolve) => {
    setTimeout(() => {
      console.log('ユーザーデータが見つかりました: ', fireBaseUserStub.userName);
      resolve(fireBaseUserStub);
    }, 500); // 0.5秒後にレスポンスを模擬
  });
}

export const fetchUsers = async (): Promise<User[]> => {
  console.log('全ユーザーデータを取得しました（スタブ）');
  const stubUsers: User[] = [{
    id: "stbUserId1",
    email: "user1@example.com",
    userName: "User One",
    password: "password1"
  }, {
    id: "stbUserId2",
    email: "user2@example.com",
    userName: "User Two",
    password: "password2"
  }];
  return stubUsers;
};

export const fetchUserNamesByIds = async (userIds: string[]): Promise<string[]> => {
  console.log('ユーザー名を取得しました（スタブ）:', userIds);
  const stubNames = userIds.map(id => `User Name for ${id}`);
  return stubNames;
};
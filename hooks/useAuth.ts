import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
  updateEmail,
  updatePassword
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { User } from "@/types/interface"
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { createUserDocument, updateUserDocument } from "@/services/userService";

WebBrowser.maybeCompleteAuthSession();

type StackProps = {
  Tabs: undefined;
  SignIn: undefined;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigation = useNavigation<StackNavigationProp<StackProps>>();

  const googleClientId = Constants.expoConfig?.extra?.googleClientId ?? "";

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            userName: user?.userName ? user.userName : '',
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        }
      });
    }
  }, [response]);

  const signUp = async (email: string, password: string, userName: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email,
        userName: userName,
      });
      await createUserDocument(userCredential.user.uid, userCredential.user.email, userName);
      navigation.navigate("Tabs");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email,
        userName: user?.userName ? user.userName : '',
      });
      navigation.navigate("Tabs");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      navigation.navigate("SignIn");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const signInPasswordReset = async (resetEmail: string): Promise<void> => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccessMessage("パスワードリセット用のリンクを送信しました。メールをご確認ください。");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

/**
 * Firebase Authenticationのメールアドレスとパスワードを更新し、Firestoreのユーザードキュメントも更新する
 * @param {string} userId ユーザーID
 * @param {string} newEmail 新しいメールアドレス
 * @param {string} newPassword 新しいパスワード
 * @param {string} userName ユーザー名
 */
const updateUserData = async (userId: string, newEmail: string, newPassword: string, userName: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      // Firebase Authenticationのメールアドレスを更新（新しいメールアドレスが提供された場合）
      if (newEmail && user.email !== newEmail) {
        await updateEmail(user, newEmail);
        console.log("Email updated successfully.");
      }

      // Firebase Authenticationのパスワードを更新（新しいパスワードが提供された場合）
      if (newPassword) {
        await updatePassword(user, newPassword);
        console.log("Password updated successfully.");
      }

      // Firestoreのユーザードキュメントを更新
      await updateUserDocument(userId, newEmail, userName);
      console.log("User document updated successfully.");
      setUser({
        id: userId,
        email: newEmail,
        userName: userName,
      });

    } catch (error) {
      console.error("Error updating user data:", error);
    }
  } else {
    console.log("No authenticated user found.");
  }
};

  const signInWithGoogle = () => {
    promptAsync();
  };

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut: signOutUser,
    signInPasswordReset,
    signInWithGoogle,
    error,
    successMessage,
    clearSuccessMessage,
    googleRequest: request,
    updateUserData,
  };
};

export default useAuth;

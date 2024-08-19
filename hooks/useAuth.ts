import { useState, useEffect } from "react";
import { User } from "@/types/interface";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

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

  useEffect(() => {
    const fireBaseUserStb = {
      id: "stbUserId",
      email: "yohei-kano@delicieux.com",
      userName: "Yohei Kano",
      password: "password"
    };
    setUser(fireBaseUserStb);
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userName: string): Promise<void> => {
    setUser({ id: "newUserId", email, userName, password });
    navigation.navigate("Tabs");
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setUser({ id: "userId", email, userName: "Logged In User", password });
    navigation.navigate("Tabs");
  };

  const signOutUser = async (): Promise<void> => {
    setUser(null);
    navigation.navigate("SignIn");
  };

  const signInPasswordReset = async (resetEmail: string): Promise<void> => {
    setSuccessMessage("パスワードリセット用のリンクを送信しました。メールをご確認ください。");
  };

  const updateUserData = async (userId: string, newEmail: string, newPassword: string, userName: string) => {
    setUser({ id: userId, email: newEmail, userName, password: newPassword });
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut: signOutUser,
    signInPasswordReset,
    error,
    successMessage,
    updateUserData,
  };
};

export default useAuth;

import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VStack, FormControl, Input, Button, useToast } from "native-base";
import useAuth from "@/hooks/useAuth";
import { fetchUserByUserId } from "@/services/userService";
import { useThemeDisplayColor, useThemeBtnColor } from "@/hooks/useThemeColor";
import { Keyboard } from 'react-native';
import { User } from "@/types/interface";

export default function UserEditForm() {
  const { updateUserData, user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    displayTextPrimaryColor,
    displayPlaceholderColor,
  } = useThemeDisplayColor();

  const { btnTextColor, btnBackgroundColor } = useThemeBtnColor();

  useEffect(() => {
    const fetchUser = async (id: string) => {
      setIsLoading(true);
      try {
        const userData = await fetchUserByUserId(id);
        if(userData?.id){
          setUserData(userData);
        } else {
          setUserData(null);
          toast.show({
            description: "User data が見つかりませんでした.",
            // status: "success",
            duration: 3000,
          });
        }
      } catch (error) {
        toast.show({
          description: "User dataの取得中にエラーが発生しました.",
          // status: "success",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if(user?.id){
      fetchUser(user.id);
    }
  }, [user?.id]);

  const handleUpdate = async () => {
    Keyboard.dismiss(); // キーボードを閉じる
    setIsLoading(true);
    try {
      if(user?.id){
        await updateUserData(user?.id, email, password, userName);
        toast.show({
          description: "User data updated successfully.",
          // status: "success",
          duration: 3000,
        });
      }else{
        throw Error;
      }
    } catch (error) {
      toast.show({
        description: "Failed to update user data.",
        // status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      scrollEnabled={true}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <VStack space={4} alignItems="center" mb="10">
        <FormControl>
          <FormControl.Label>メール:{userData?.email}</FormControl.Label>
          <Input
            value={email}
            onChangeText={setEmail}
            color={displayTextPrimaryColor}
            placeholderTextColor={displayPlaceholderColor}
            placeholder="Enter your new email"
            autoCapitalize="none"
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>ユーザー名:{userData?.userName}</FormControl.Label>
          <Input
            value={userName}
            onChangeText={setUserName}
            color={displayTextPrimaryColor}
            placeholderTextColor={displayPlaceholderColor}
            placeholder="Enter your new username"
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>パスワード</FormControl.Label>
          <Input
            placeholder="Password"
            value={password}
            secureTextEntry
            color={displayTextPrimaryColor}
            placeholderTextColor={displayPlaceholderColor}
            onChangeText={setPassword}
          />
        </FormControl>
        <Button
          mt="5"
          bgColor={btnBackgroundColor}
          color={btnTextColor}
          isLoading={isLoading}
          onPress={handleUpdate}
        >
          Update Account
        </Button>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

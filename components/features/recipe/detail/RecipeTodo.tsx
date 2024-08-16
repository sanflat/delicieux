import React, { useCallback, useState } from "react";
import { addTodo } from "@/services/todoService";
import {
  useToast,
  HStack,
  Input,
  Icon,
  Text,
  IconButton,
  VStack,
} from "native-base";
import {
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { nanoid } from "nanoid";
import useAuth from "@/hooks/useAuth";
import Ripple from "react-native-material-ripple";

type Props = {
  iconColor: string;
  btnTextColor: string;
  btnBorderColor: string;
  linkColor: string;
}

const RecipeTodo = ({
  iconColor,
  btnTextColor,
  btnBorderColor,
  linkColor
}:Props) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toast = useToast();

  const handleSaveTodo = useCallback(async () => {
    if (!user?.id) {
      return;
    }
    const userId = user.id;
    setUserIds((prevIds) => {
      return [...prevIds, userId];
    });
    const newTodo = {
      text: text,
      userIds: userIds,
      done: false,
    };

    try {
      await addTodo(
        newTodo.text,
        newTodo.userIds,
        newTodo.done
      );
      setIsVisible(false);
      toast.show({
        description: "追加しました。",
        colorScheme: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("ToDoの保存に失敗しました:", error);
      toast.show({
        description: "ToDoの保存に失敗しました。",
        colorScheme: "error",
        duration: 3000,
      });
    }
  }, [user, text]);

  return (
    <>
      {isVisible ? (
        <VStack alignItems="center">
          <Input
            placeholder="Todo"
            width="85%"
            px="0"
            fontSize="sm"
            onChangeText={setText}
            InputLeftElement={
              <Icon
                ml="3"
                mr="3"
                size="md"
                color={iconColor}
                as={
                  <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" />
                }
              />
            }
          />
          <HStack alignItems="center" space={5}>
            <IconButton
              marginTop={2}
              size="md"
              variant="outline"
              color={btnTextColor}
              borderColor={btnBorderColor}
              icon={<Icon color={iconColor} as={AntDesign} name="plus" />}
              onPress={handleSaveTodo}
            />
            <IconButton
              marginTop={2}
              size="md"
              variant="outline"
              color={btnTextColor}
              borderColor={btnBorderColor}
              icon={
                <Icon color={iconColor} as={MaterialCommunityIcons} name="close" />
              }
              onPress={toggleVisibility}
            />
          </HStack>
        </VStack>
      ) : (
        <HStack alignItems="center" space={2}>
          <Icon
            background="transparent"
            as={MaterialCommunityIcons}
            name="checkbox-marked-circle-plus-outline"
            color={iconColor}
            size="lg"
          />
          <Ripple
            rippleColor={iconColor}
            rippleCentered={true}
            onPress={toggleVisibility}
          >
            <Text color={linkColor} fontSize="md">
              ToDo登録フォーム
            </Text>
          </Ripple>
        </HStack>
      )}
    </>
  );
};

export default RecipeTodo;

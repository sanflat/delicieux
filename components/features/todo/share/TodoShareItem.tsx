import React, { memo, useState, useEffect } from "react";
import {
  Pressable,
  Box,
  HStack,
  useColorModeValue,
  Icon,
  Input,
  Text,
  VStack,
} from "native-base";
import CustomCheckbox from "../list/CustomCheckbox";
import AnimatedTaskLabel from "../list/AnimatedTaskLabel";
import UserDisplay from "../SharedUser";
import useAuth from "@/hooks/useAuth";
import { fetchUserNamesByIds } from "@/services/userService";
import { ToDo } from "@/types/interface";
import { useThemeTextColor } from "@/hooks/useThemeColor";

interface TodoShareItemProps {
  data: ToDo;
  onPressLabel: (itemId: string) => void;
}

const TodoShareItem = memo(({ data, onPressLabel }: TodoShareItemProps) => {
  const [userNames, setUserNames] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && data.userIds && data.userIds.length > 0) {
      const filteredUserIds = data.userIds.filter(id => id !== user.id);  // userがnullでないことを確認
      fetchUserNamesByIds(filteredUserIds).then(setUserNames);
    }
  }, [data.userIds, user?.id]);  // user?.id を使って、userがnullの場合にはundefinedが返るようにする

  const dataAdd = () => {
    setDone(!done);
    onPressLabel(data.id);
  };

  const { textPrimaryColor, textBackground } = useThemeTextColor();

  return (
    <HStack alignItems="center" w="full" bg={textBackground}>
      <Box mr={2}>
        <CustomCheckbox checked={done} onPress={dataAdd} />
      </Box>
      <VStack space={1}>
        <AnimatedTaskLabel
          textColor={textPrimaryColor}
          inactiveTextColor={textPrimaryColor}
          strikethrough={false}
        >
          {data.text}
        </AnimatedTaskLabel>
        <UserDisplay userNames={userNames} />
      </VStack>
    </HStack>
  );
});

export default TodoShareItem;

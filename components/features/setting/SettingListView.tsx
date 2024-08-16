import React, { useState, useEffect } from "react";
import { Box, Pressable, HStack, Icon, Text, FlatList } from "native-base";
import { Setting } from "@/types/interface";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useStackNavigation } from "@/hooks/useStackNavigation";
import { useThemeTextColor } from "@/hooks/useThemeColor";

interface SettingListProps {
  settings: Setting[];
}

const SettingListView: React.FC<SettingListProps> = ({ settings }) => {
  const [listData, setListData] = useState<Setting[]>(settings);
  const { navigation } = useStackNavigation();
  const { textPrimaryColor, borderColor } = useThemeTextColor();

  useEffect(() => {
    setListData(settings);
  }, [settings]);

  const renderItem = ({ item }: { item: Setting }) => (
    <Pressable
      onPress={() => {
        if (item.id) {
          navigation.navigate("SettingDetail", { id: item.id });
        }
        if (item.func) {
          item.func();
        }
      }}
      borderBottomWidth={1}
      borderBottomColor={borderColor}
      borderRadius="5px"
      mb="10px"
    >
      <Box
        pl="4"
        pr="5"
        py="2"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack space={3} alignItems="center">
          <Icon as={MaterialCommunityIcons} name={item.icon} size="md" color={textPrimaryColor} />
          <Text fontSize="md" fontWeight="500" color={textPrimaryColor}>
            {item.title}
          </Text>
        </HStack>
        <Icon as={MaterialCommunityIcons} name="chevron-right" />
      </Box>
    </Pressable>
  );

  return (
    <FlatList data={listData} renderItem={renderItem} scrollEnabled={false} />
  );
};

export default SettingListView;

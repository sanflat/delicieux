import React, { useState, useRef } from "react";
import { FlatList as RNFlatList, ScrollView } from "react-native";
import { Image, Text, Box, VStack, Icon, Center } from "native-base";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Step } from "@/types/interface";
import { ThemedText } from "@/components/common/text/ThemedText";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

type StepsListProps = {
  textColor: string;
  iconColor: string;
  borderColor: string;
  steps?: Step[];
};

function RecipeStepsList({
  textColor,
  iconColor,
  borderColor,
  steps = [],
}: StepsListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<RNFlatList>(null); // React NativeのFlatListの型を使用

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(xOffset / windowWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: Step }) => (
    <Box width={windowWidth} py={3}>
      <Center shadow={5}>
        <Box
          width="90%"
          borderTopRadius={10}
          borderTopWidth={1}
          borderLeftWidth={1}
          borderRightWidth={1}
          borderBottomWidth={0}
          borderColor={borderColor}
          borderBottomColor="transparent"
        >
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              alt={`Step ${item.id}`}
              width="100%"
              height="350px"
              resizeMode="cover"
              borderTopRadius={10}
              borderBottomRadius={2}
              shadow={10}
            />
          ) : (
            <VStack alignItems="center" height="350px" pt={150}>
              <Icon color="black" as={AntDesign} name="camera" size="xl" />
              <ThemedText
                color={textColor}
                type="defaultSemiBold"
                text="No Image"
              />
            </VStack>
          )}
        </Box>
        <Box
          width="90%"
          borderTopColor="transparent"
          borderTopWidth={0}
          borderLeftWidth={1}
          borderRightWidth={1}
          borderBottomWidth={1}
          borderColor={borderColor}
          borderBottomRadius={10}
          p={10}
        >
          <ScrollView persistentScrollbar={true}>
            <Text fontSize="sm" color={textColor} bold>
              {item.text}
            </Text>
          </ScrollView>
        </Box>
        <Text fontSize="xs" color={textColor} pt={3} bold>
          手順 {currentIndex + 1} / {steps.length}
        </Text>
      </Center>
    </Box>
  );

  return (
    <Box>
      <RNFlatList
        ref={flatListRef}
        data={steps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        pagingEnabled={true}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </Box>
  );
}

export default RecipeStepsList;

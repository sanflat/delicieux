import React, { useState, useRef, useCallback } from "react";
import {
  Icon,
  Text,
  Button,
  useColorMode,
  Box,
  VStack,
  IconButton,
} from "native-base";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import StepsList from "./RecipeStepsList";
import Ripple from "react-native-material-ripple";
import { Step } from "@/types/interface";
import { useThemeTextColor, useThemeBtnColor, useThemeIconColor } from "@/hooks/useThemeColor";

type Props = {
  steps: Step[];
};

type StackProps = {
  RecipeSteps: {
    steps: Step[];
  };
};

const RecipeStepsBottomSheet = ({ steps }: Props) => {
  const { btnTextColor, btnBackground, btnBorder } = useThemeBtnColor();
  const { textPrimaryColor, borderColor, textBackground } = useThemeTextColor();
  const { iconPrimaryColor } = useThemeIconColor();

  const { colorMode, toggleColorMode } = useColorMode();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["92%"];
  const [index, setIndex] = useState(-1);

  const handleOpenPress = useCallback(() => {
    setIndex(0);
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    setIndex(-1);
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => handleClosePress()}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [handleClosePress]
  );

  return (
    <>
      <Box alignItems="center">
        <Button
          my={4}
          bgColor={btnBackground}
          textAlign="center"
          width="70%"
          leftIcon={
            <Icon
              color={iconPrimaryColor}
              as={<Ionicons name="restaurant" />}
              size="md"
            />
          }
          size="lg"
          onPress={handleOpenPress}
        >
          <Text 
            color={btnTextColor} 
          >
            調理を開始する
          </Text>
        </Button>
      </Box>

      <BottomSheet
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 40,
          backgroundColor: textBackground,
        }}
      >
        <BottomSheetView>
          <VStack
            px={8}
            pt={5}
            pb={10}
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Ripple
              rippleColor={iconPrimaryColor}
              rippleCentered={true}
              onPress={toggleColorMode}
            >
              <IconButton
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    name={
                      colorMode === "light"
                        ? "moon-waning-crescent"
                        : "white-balance-sunny"
                    }
                    size="lg"
                    color={iconPrimaryColor}
                  />
                }
              />
            </Ripple>

            <Ripple
              rippleColor={iconPrimaryColor}
              rippleCentered={true}
              onPress={handleClosePress}
            >
              <IconButton
                borderRadius="xl"
                icon={
                  <Icon
                    as={AntDesign}
                    name="close"
                    size="lg"
                    color={iconPrimaryColor}
                  />
                }
              />
            </Ripple>
          </VStack>
          <StepsList
            textColor={textPrimaryColor}
            iconColor={iconPrimaryColor}
            borderColor={borderColor}
            steps={steps}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default RecipeStepsBottomSheet;

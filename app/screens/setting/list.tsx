import React from "react";
import {
  ScrollView,
  Box,
  HStack,
  useColorMode,
  Heading,
  Text,
  Avatar,
  Button,
} from "native-base";
import * as Linking from 'expo-linking';
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import DefaultHeader from "@/components/common/header/DefaultHeader";
import SettingListView from "@/components/features/setting/SettingListView";
import ThemeToggle from "@/components/common/theme/ThemeToggle";
import { Setting } from "@/types/interface";
import useAuth from "@/hooks/useAuth";
import { useThemeTextColor, useThemeIconColor, useThemeBtnColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/common/text/ThemedText";
import RippleButton from "@/components/common/button/RippleButton";

export default function SettingListScreen() {
  const { signOut } = useAuth();
  const { textPrimaryColor, borderColor } = useThemeTextColor();
  const { colorMode, toggleColorMode } = useColorMode();
  const { iconPrimaryColor } = useThemeIconColor();
  const { btnBackground } = useThemeBtnColor();

  const settingsOptions: Setting[] = [
    { title: "Account", icon: "account-edit", id: "account-setting" },
    { title: "Logout", icon: "logout", func: () => signOut() },
  ];

  const openHomePage = () => {
    Linking.openURL('https://yohei-kano.com');
  }

  return (
    <DisplayView header={<DefaultHeader />}>
      <ScrollView>
        <MainArea>
          <SettingListView settings={settingsOptions} />
          <Box
            pl="4"
            pr="5"
            py="2"
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={3} alignItems="center">
              <RippleButton
                icon={
                  colorMode === "light"
                    ? "white-balance-sunny"
                    : "moon-waning-crescent"
                }
                onPress={toggleColorMode}
                iconColor={iconPrimaryColor}
                iconType="MaterialCommunityIcons"
              />
              <ThemedText
                type="defaultSemiBold"
                text={colorMode === "light" ? "Light mode" : "Dark mode"}
                color={textPrimaryColor}
              />
            </HStack>
            <ThemeToggle />
          </Box>
          <Box alignItems="center" mt={9}>
            <Avatar
              source={require("../../../assets/my.jpg")}
              size="xl"
              borderRadius={100}
              mb={6}
              borderColor="secondary.500"
              borderWidth={3}
            />
            <Heading mb={4} size="xl">
              Yohei Kano 👋
            </Heading>
            <Text fontSize="md" w="full">
              Hello! I'm a software engineer based in Japan. If you would like
              to learn more about my expertise and projects, please visit my
              homepage.
            </Text>
            <Button bgColor={btnBackground} onPress={openHomePage} borderRadius="10px" h="50px" borderWidth={1} borderColor={borderColor} mt={3}>
              <Text color={textPrimaryColor} fontWeight="bold">
                View Homepage
              </Text>
            </Button>
          </Box>
        </MainArea>
      </ScrollView>
    </DisplayView>
  );
}

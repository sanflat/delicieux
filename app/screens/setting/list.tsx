import React from "react";
import { ScrollView, Box, HStack, useColorMode } from "native-base";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import DefaultHeader from "@/components/common/header/DefaultHeader";
import SettingListView from "@/components/features/setting/SettingListView";
import ThemeToggle from "@/components/common/theme/ThemeToggle";
import { Setting } from "@/types/interface";
import useAuth from "@/hooks/useAuth";
import { useThemeTextColor, useThemeIconColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/common/text/ThemedText";
import RippleButton from "@/components/common/button/RippleButton";

export default function SettingListScreen() {
  const { signOut } = useAuth();
  const { textPrimaryColor } = useThemeTextColor();
  const { colorMode, toggleColorMode } = useColorMode();
  const { iconPrimaryColor } = useThemeIconColor();

  const settingsOptions: Setting[] = [
    { title: "アカウント設定", icon: "account-edit", id: "account-setting" },
    { title: "ログアウト", icon: "logout", func: () => signOut() },
  ];

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
                text={
                  colorMode === "light"
                    ? "Light mode"
                    : "Dark mode"
                }
                color={textPrimaryColor}
              />
            </HStack>
            <ThemeToggle />
          </Box>
        </MainArea>
      </ScrollView>
    </DisplayView>
  );
}

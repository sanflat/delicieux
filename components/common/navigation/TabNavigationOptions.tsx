import { useThemeNavigationColor } from "@/hooks/useThemeColor";
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from './TabBarIcon';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { type ComponentProps } from 'react';

type IoniconsProps = ComponentProps<typeof Ionicons>;
type MaterialCommunityIconsProps = ComponentProps<typeof MaterialCommunityIcons>;

type IconType = 'Ionicons' | 'MaterialCommunityIcons';
type IconName = IoniconsProps['name'] | MaterialCommunityIconsProps['name'];

export const useTabNavigationOptions = () => {
  const {
    navActiveIconColor,
    navInActiveIconColor,
    navBackground
  } = useThemeNavigationColor();

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarLabel: () => null,
    tabBarStyle: {
      backgroundColor: navBackground,
      borderTopColor: "transparent"
    },
    tabBarActiveTintColor: navActiveIconColor,
    tabBarInactiveTintColor: navInActiveIconColor,
  };

  const tabBarOptions = (iconName: IconName, iconType: IconType): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color, focused }) => {
      const adjustedIconName = focused ? iconName : `${iconName}-outline`;
      return <TabBarIcon type={iconType} name={adjustedIconName as IconName} color={color} />;
    },
  });

  return { screenOptions, tabBarOptions };
};

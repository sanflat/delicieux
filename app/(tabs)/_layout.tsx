import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTabNavigationOptions } from "@/components/common/navigation/TabNavigationOptions";

import RecipeListScreen from "@/app/screens/recipe/list";
import RecipeCreateScreen from "@/app/screens/recipe/create";
import RecipeDetailScreen from "@/app/screens/recipe/[id]";
import RecipeEditScreen from "@/app/screens/recipe/edit/[id]";
import TodoListScreen from "@/app/screens/todo/list";
import TodoShareScreen from "@/app/screens/todo/share";
import SettingListScreen from "@/app/screens/setting/list";
import SettingDetailScreen from "../screens/setting/[id]";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RecipeStack() {
  return (
    <Stack.Navigator>
      {/* レシピの一覧画面 */}
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* レシピの詳細画面 */}
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* レシピの登録画面 */}
      <Stack.Screen
        name="RecipeCreate"
        component={RecipeCreateScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* レシピの更新画面 */}
      <Stack.Screen
        name="RecipeEdit"
        component={RecipeEditScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator>
      {/* 設定の一覧画面 */}
      <Stack.Screen
        name="SettingList"
        component={SettingListScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* 設定の詳細画面 */}
      <Stack.Screen
        name="SettingDetail"
        component={SettingDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function TodoStack() {
  return (
    <Stack.Navigator>
      {/* 設定の一覧画面 */}
      <Stack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* 設定の詳細画面 */}
      <Stack.Screen
        name="TodoShare"
        component={TodoShareScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function TabsLayout() {
  const { screenOptions, tabBarOptions } = useTabNavigationOptions();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={RecipeStack}
        options={tabBarOptions("restaurant", "Ionicons")}
      />
      <Tab.Screen
        name="Todo"
        component={TodoStack}
        options={tabBarOptions("check-circle", "MaterialCommunityIcons")}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={tabBarOptions("settings", "Ionicons")}
      />
    </Tab.Navigator>
  );
}

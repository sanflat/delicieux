import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from "@/hooks/useAuth";
import "react-native-reanimated";
import theme from "@/themes/colors";

import SignInScreen from "@/app/screens/auth/sign-in";
import SignUpScreen from "@/app/screens/auth/sign-up";
import TabsLayout from "@/app/(tabs)/_layout";

const Stack = createStackNavigator();

export default function AppLayout() {
  const { user, loading } = useAuth();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        if (!loading) {
          await SplashScreen.hideAsync();
          setAppReady(true);
        }
      } catch (error) {
        console.error("An error occurred while preparing the app:", error);
      }
    }

    prepareApp();
  }, [loading]);

  if (loading || !appReady) {
    return null;  // Optionally, a loading screen or error message can be displayed here
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName={user ? "Tabs" : "SignIn"}
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Tabs" component={TabsLayout} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

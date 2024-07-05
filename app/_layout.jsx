import React from "react";
import { Text } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  ClerkLoaded,
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import LoginScreen from "@/components/LoginScreen";
export default function RootLayout() {
  // useFonts({
  //   outfit: require("../assets/fonts/Outfit-Regular.ttf"),
  //   "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  //   "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  // });
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        <SignedIn>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SignedIn>
        <SignedOut>
          <Text style={{ fontSize: 40 }}>Vadapav</Text>
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

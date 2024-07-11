import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import React from "react";

export default function LoginScreen() {
  WebBrowser.maybeCompleteAuthSession();

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.logo}>
        <Text style={{ color: Colors.PRIMARY }}>Biz</Text>
        Hub
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 600,
            objectFit: "contain",
            // borderColor: "#000",
            // borderWidth: 6,
            // borderRadius: 20,
          }}
          source={require("../assets/images/BizHubApp.png")}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            fontFamily: "outfit-bold",
          }}
        >
          Your Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
            Community Business Directory
          </Text>{" "}
          App
        </Text>
        <Text
          style={{
            color: Colors.GRAY,
            fontSize: 16,
            textAlign: "center",
            fontFamily: "outfit-medium",
            marginVertical: 40,
          }}
        >
          Discover Local Businesses You Love and Share Your Own with the
          Community
        </Text>
        <TouchableOpacity style={styles.startbtn} onPress={onPress}>
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
              fontFamily: "outfit",
            }}
          >
            Let's Get Started!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 50,
  },
  logo: {
    textAlign: "center",
    fontSize: 55,
    fontFamily: "outfit-bold",
  },
  subContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: -140,
  },
  startbtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 100,
    marginHorizontal: 50,
  },
});

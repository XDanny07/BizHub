import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function UserIntro() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Image
        style={{ width: 100, height: 100, borderRadius: 99 }}
        source={{ uri: user.imageUrl }}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        {user?.fullName}
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}

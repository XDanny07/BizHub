import { View, Text } from "react-native";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";
import React from "react";

export default function Profile() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 35 }}>Profile</Text>
      <UserIntro />
      <MenuList />
    </View>
  );
}

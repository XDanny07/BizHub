import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
export default function Intro({ business }) {
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          width: "100%",
          padding: 22,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign
            style={{ backgroundColor: "#fff", padding: 5, borderRadius: 100 }}
            name="back"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <AntDesign
          style={{ padding: 5, borderRadius: 100 }}
          name="hearto"
          size={28}
          color="white"
        />
      </View>
      <Image
        style={{ width: "100%", height: 340 }}
        source={{ uri: business.imageURL }}
      />
      <View
        style={{
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text style={{ fontSize: 26, fontFamily: "outfit-bold" }}>
          {business.name}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
          {business.address}
        </Text>
      </View>
    </View>
  );
}

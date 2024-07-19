import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const route = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
      onPress={() => route.push("/businessdetail/" + business.id)}
    >
      <Image
        style={{ width: 120, height: 120, borderRadius: 15 }}
        source={{ uri: business.imageURL }}
      />
      <View style={{ flex: 1, gap: 7 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          {business.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 15, color: Colors.GRAY }}
        >
          {business.address.substring(0, 55) + "..."}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image
            source={require("../../assets/images/star.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text style={{ fontFamily: "outfit" }}>{business.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

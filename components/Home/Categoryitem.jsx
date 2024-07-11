import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Categoryitem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity
      onPress={() => onCategoryPress(category)}
      style={{ display: "flex", alignItems: "center" }}
    >
      <View
        style={{
          padding: 15,
          borderRadius: 99,
          marginHorizontal: 10,
          backgroundColor: Colors.ICON_BG,
        }}
      >
        <Image
          source={{ uri: category.imageURL }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: "outfit-medium",
          textTransform: "capitalize",
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

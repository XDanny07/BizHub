import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Popularitem({ Business }) {
  const route = useRouter();
  //   console.log(Business.item.imageURL);
  return (
    <TouchableOpacity
      onPress={() => route.push("/businessdetail/" + Business?.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: Business.imageURL }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7, gap: 5 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
          {Business.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 13, color: Colors.GRAY }}
        >
          {Business.address.substring(0, 26) + "..."}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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
            <Text style={{ fontFamily: "outfit" }}>{Business.rating}</Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              color: "#fff",
              borderRadius: 5,
              padding: 2,
              fontSize: 10,
              backgroundColor: Colors.PRIMARY,
            }}
          >
            {Business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

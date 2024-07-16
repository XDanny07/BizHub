import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/telephone.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/map.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Website",
      icon: require("../../assets/images/internet.png"),
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: business?.website,
    },
  ];
  const onPressHandle = (item) => {
    if (item.name == "Share") {
      Share.share({
        message: `${business?.name}\nAddress : ${business?.address}\nGet More Details On The BizHub App.`,
      });
      return;
    }
    Linking.openURL(item.url);
  };
  return (
    <View style={{ backgroundColor: "#fff", padding: 20 }}>
      <FlatList
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={actionButtonMenu}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity key={index} onPress={() => onPressHandle(item)}>
              <Image style={{ width: 50, height: 50 }} source={item.icon} />
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit-medium",
                  marginTop: 3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

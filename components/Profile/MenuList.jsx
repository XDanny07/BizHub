import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const { signOut } = useAuth();
  const route = useRouter();
  const Mlist = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/franchise.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/my-business.png"),
      path: "business/my-business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share.png"),
      path: "share",
    },
    {
      id: 2,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  const onMenuClick = (path) => {
    if (path === "logout") {
      signOut();
      return;
    }
    if (path === "share") {
      Share.share({ message: "Download The BizHub App \nDownload URL : " });
      return;
    }
    route.push(path);
  };

  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={Mlist}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item.path)}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
              shadowRadius: 5,
            }}
          >
            <Image style={{ width: 50, height: 50 }} source={item.icon} />
            <Text
              style={{ fontFamily: "outfit-medium", fontSize: 16, flex: 1 }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

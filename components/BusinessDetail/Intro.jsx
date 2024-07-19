import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const { user } = useUser();
  const onDelete = () => {
    Alert.alert(
      "Do you want to Delete?",
      "Do you really want to delete this Business ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => DeleteBusiness(),
        },
      ]
    );
  };

  const DeleteBusiness = async () => {
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Business Deleted!", ToastAndroid.LONG);
  };

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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: 20,
          marginTop: -20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
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
        {user?.primaryEmailAddress?.emailAddress === business?.userEmail && (
          <TouchableOpacity onPress={() => onDelete()}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

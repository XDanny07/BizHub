import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Category from "@/components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
  const [businesslist, setbusinesslist] = useState([]);

  const getBusinessByCategory = async (category) => {
    const q = query(
      collection(db, "BusinessList"),

      where("category", "==", category)
    );
    const querysnapshot = await getDocs(q);
    let list = [];
    querysnapshot.forEach((doc) => {
      list.push({ id: doc?.id, ...doc.data() });
    });
    setbusinesslist(list);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fff",
          padding: 10,
          marginTop: 15,
          marginVertical: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
        <TextInput
          style={{
            fontSize: 16,
            fontFamily: "outfit",
          }}
          placeholder="Search..."
        ></TextInput>
      </View>
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />
      <ExploreBusinessList businesslist={businesslist} />
    </View>
  );
}

import { View, Text, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import Popularitem from "./PopularItem";
export default function Popularbiz() {
  const [popularlist, setpopularlist] = useState([]);

  useEffect(() => {
    getpopularlist();
  }, []);
  const getpopularlist = async () => {
    const q = query(collection(db, "BusinessList"));
    const querysnapshot = await getDocs(q);
    let list = [];
    querysnapshot.forEach((doc) => {
      list.push({ id: doc?.id, ...doc.data() });
    });
    setpopularlist(list);
  };
  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          marginBottom: 10,
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
          Popular Business
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>
      <FlatList
        data={popularlist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Popularitem key={index} Business={item} />
        )}
      />
    </View>
  );
}

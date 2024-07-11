import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Colors } from "@/constants/Colors";
import Categoryitem from "../../components/Home/Categoryitem";

export default function Category() {
  const [categorylist, setcategorylist] = useState([]);

  useEffect(() => {
    getcategorylist();
  }, []);

  const getcategorylist = async () => {
    const q = query(collection(db, "Category"));
    const querysnapshot = await getDocs(q);
    let list = [];
    querysnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setcategorylist(list);
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
          Category
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>
      {categorylist.length > 0 ? (
        <FlatList
          data={categorylist}
          style={{ marginLeft: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Categoryitem
              onCategoryPress={(category) => console.log(category)}
              key={index}
              category={item}
            />
          )}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 40,
            marginTop: 25,
            textAlign: "center",
          }}
        >
          Loading...
        </Text>
      )}
    </View>
  );
  W;
}

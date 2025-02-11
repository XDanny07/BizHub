import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Colors } from "@/constants/Colors";
import Categoryitem from "./CategoryItem";
import { useRouter } from "expo-router";
export default function Category({ explore, onCategorySelect }) {
  const [categorylist, setcategorylist] = useState([]);
  const router = useRouter();
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

  const onCategoryPressHandler = (category) => {
    if (!explore) {
      router.push("/businesslist/" + category);
    } else {
      onCategorySelect(category);
    }
  };

  return (
    <View>
      {!explore && (
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
      )}
      {categorylist.length > 0 ? (
        <FlatList
          data={categorylist}
          style={{
            marginLeft: !explore ? 20 : 0,
            marginTop: !explore ? 0 : 10,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Categoryitem
              onCategoryPress={() => onCategoryPressHandler(item.name)}
              key={index}
              category={item}
            />
          )}
        />
      ) : (
        <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
      )}
    </View>
  );
  W;
}

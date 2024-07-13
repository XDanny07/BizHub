import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Colors } from "@/constants/Colors";

export default function Slider() {
  const [sliderList, setsliderList] = useState([]);
  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querysnapshot = await getDocs(q);
    let list = [];
    querysnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setsliderList(list);
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        #Special For You
      </Text>
      <View style={{ paddingLeft: 20 }}>
        {sliderList.length > 0 ? (
          <FlatList
            data={sliderList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Image
                key={index}
                source={{ uri: item.imageURL }}
                style={{
                  width: 300,
                  height: 150,
                  borderRadius: 15,
                  marginRight: 15,
                }}
              />
            )}
          />
        ) : (
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        )}
      </View>
    </View>
  );
}

import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { db } from "../../config/FirebaseConfig";
import { query, getDocs, where, collection } from "firebase/firestore";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigate = useNavigation();
  const { category } = useLocalSearchParams();
  const [businesslist, setbusinesslist] = useState([]);
  const [loading, setloading] = useState();
  useEffect(() => {
    navigate.setOptions({
      headerTitle: category,
    });
    getBusinesslist();
  }, []);

  const getBusinesslist = async () => {
    setloading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querysnapshot = await getDocs(q);
    let list = [];
    querysnapshot.forEach((item) => {
      list.push({ id: item?.id, ...item.data() });
    });
    setbusinesslist(list);
    setloading(false);
  };
  return (
    <View>
      {businesslist.length > 0 && !loading ? (
        <FlatList
          data={businesslist}
          onRefresh={getBusinesslist}
          refreshing={loading}
          renderItem={({ item, index }) => {
            return <BusinessListCard key={index} business={item} />;
          }}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            textAlign: "center",
            marginTop: "50%",
            color: Colors.GRAY,
          }}
        >
          No Businesses Found
        </Text>
      )}
    </View>
  );
}

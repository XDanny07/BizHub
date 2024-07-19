import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";
export default function MyBusiness() {
  const [businesslist, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    GetUserBusiness();
  }, []);

  const GetUserBusiness = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querysnapshot = await getDocs(q);
    let list = [];
    querysnapshot.forEach((doc) => {
      list.push({ id: doc?.id, ...doc.data() });
    });
    setBusinessList(list);
    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        MyBusiness
      </Text>
      <FlatList
        data={businesslist}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard key={index} business={item} />
        )}
      />
    </View>
  );
}

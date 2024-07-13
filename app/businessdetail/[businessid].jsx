import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";

export default function BusinessDetail() {
  const navigate = useNavigation();
  const { businessid } = useLocalSearchParams();
  const [businessdetail, setbusinessdetail] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
    getBusinessById();
  }, []);

  const getBusinessById = async () => {
    const q = doc(collection(db, "BusinessList"), businessid);
    const querysnapshot = await getDoc(q);
    if (querysnapshot.exists()) {
      setbusinessdetail(querysnapshot.data());
    } else {
      console.log("Document doesn't exists");
    }
    setloading(false);
  };
  return (
    <ScrollView>
      <View>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: "70%" }}
            color={Colors.PRIMARY}
            size={"large"}
          />
        ) : (
          <View>
            <Intro business={businessdetail} />
            <ActionButton business={businessdetail} />
            <About business={businessdetail} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

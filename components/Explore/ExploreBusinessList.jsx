import { View, Text, FlatList, ScrollView } from "react-native";
import ExploreBusinessCard from "./ExploreBusinessCard";
import React from "react";

export default function ExploreBusinessList({ businesslist }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        data={businesslist}
        scrollEnabled
        renderItem={({ item, index }) => (
          <View key={index}>
            <ExploreBusinessCard business={item} />
          </View>
        )}
      />
    </ScrollView>
  );
}

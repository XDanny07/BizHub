import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import Popularbiz from "../../components/Home/PopularBiz";
export default function Home() {
  return (
    <ScrollView>
      <Header />
      <Slider />
      <Category />
      <Popularbiz />
    </ScrollView>
  );
}

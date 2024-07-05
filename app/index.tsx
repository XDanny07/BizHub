import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return <Redirect href={"/home"} />;
}

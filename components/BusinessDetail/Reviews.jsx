import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setrating] = useState(3);
  const [userinput, setuserinput] = useState("");
  const { user } = useUser();
  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userinput,
        username: user?.fullName,
        userimg: user?.imageUrl,
      }),
    });
    ToastAndroid.show("Comment Added!", ToastAndroid.BOTTOM);
  };
  return (
    <View style={{ padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>
      <View>
        <Rating
          onFinishRating={(rating) => setrating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          numberOfLines={4}
          placeholder="Add a comment"
          onChangeText={(value) => setuserinput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          disabled={userinput.length <= 0}
          onPress={onSubmit}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#fff", textAlign: "center" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {business?.reviews?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 99 }}
              source={{ uri: item.userimg }}
            />
            <View style={{ display: "flex", gap: 2 }}>
              <Text style={{ fontFamily: "outfit-medium" }}>
                {item.username}
              </Text>
              <Rating
                imageSize={18}
                ratingCount={item.rating}
                readonly={true}
                startingValue={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

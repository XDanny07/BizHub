import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { query, collection, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [categorylist, setCategoryList] = useState([]);
  const [formdata, setFormData] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const GetCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const querysnapshot = await getDocs(q);
    let list = [];
    querysnapshot.forEach((doc) =>
      list.push({
        label: doc.data().name,
        value: doc.data().name,
      })
    );
    setCategoryList(list);
  };

  const handleClick = (nkey, nval) => {
    setFormData({ ...formdata, [nkey]: nval });
  };

  const onAddNewBusiness = async () => {
    const filename = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imgRef = ref(storage, "bizhub/" + filename);
    uploadBytes(imgRef, blob).then((snap) => {
      console.log("uplaoded");
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>
      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onImagePick()}>
        {!image ? (
          <Image
            style={{
              width: 100,
              height: 100,
              padding: 2,
              backgroundColor: Colors.GRAY,
              borderRadius: 24,
            }}
            source={require("../../assets/images/add-photo.png")}
          />
        ) : (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
            source={{ uri: image }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          onChange={(val) => handleClick("Name", val)}
          placeholder="Name"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        ></TextInput>
        <TextInput
          onChange={(val) => handleClick("Address", val)}
          placeholder="Address"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        ></TextInput>
        <TextInput
          onChange={(val) => handleClick("Contact", val)}
          placeholder="Contact"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        ></TextInput>
        <TextInput
          onChange={(val) => handleClick("Email", val)}
          placeholder="Email"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        ></TextInput>
        <TextInput
          onChange={(val) => handleClick("About", val)}
          placeholder="About"
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
            textAlignVertical: "top",
          }}
        ></TextInput>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,

            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={categorylist}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => onAddNewBusiness()}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-medium",
            color: "#fff",
          }}
        >
          Add New Business
        </Text>
      </TouchableOpacity>
    </View>
  );
}

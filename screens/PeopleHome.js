import { useEffect, useState } from "react";
import { fetchUserData } from "../app/userSlice";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Button } from "@rneui/themed";

import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, signOut } from "../app/authManager";

// import TheirCardScreen from "./TheirCardScreen";
export const colorCalculate = () => {
  const colorHex = (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
  return "#" + colorHex;
};

const PeopleHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentAuthUser = getAuthUser();
  const [imgPath, setImgPath] = useState("../assets/cardAvatar1.png");
  const { userData, userStatus, userError } = useSelector(
    (state) => state.user
  );

  const imgPaths = [
    "../assets/cardAvatar0.png",
    "../assets/cardAvatar1.png",
    "../assets/cardAvatar2.png",
  ];

  // const colorCalculate = () => {
  //   const colorHex = ((Math.random() * 0xfffff * 1000000).toString(16)).slice(0, 6);
  //   return '#' + colorHex;
  // }

  // const pathCalculate = (index) => {
  //   console.log("yolo-----------------2222");
  //   console.log(`../assets/cardAvatar${index.toString()}.png`);
  //   return `../assets/cardAvatar${index.toString()}.png`;
  // }

  const theirCardViewHandler = (card) => {
    navigation.navigate("TheirCardScreen", { card: card });
  };

  useEffect(() => {
    dispatch(fetchUserData());
    // if (!currentAuthUser) {
    //   navigation.navigate("Login");
    // }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("QRScan")}>
        Scan QR Code
      </Button>
      <Text style={{ margin: 14 }}>
        Welcome {currentAuthUser && currentAuthUser.displayName}!
      </Text>

      <Text style={styles.title}>
        {/* Your contacts: {currentAuthUser && userData.theirCards} */}
        Your contacts:
      </Text>
      {currentAuthUser &&
        userData.their_cards_data_list.map((card, index) => (
          <TouchableOpacity
            onPress={() => theirCardViewHandler(card)}
            key={card.id}
            style={[
              styles.cardContainer,
              { backgroundColor: colorCalculate() },
            ]}
          >
            <View>
              <Image
                style={styles.cardAvatar}
                source={require("../assets/cardAvatar0.png")}
              ></Image>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.headerText}>
                {card.firstName} {card.lastName}
              </Text>
              <Text>{card.email}</Text>
              <Text>{card.company}</Text>
            </View>
          </TouchableOpacity>
        ))}
      <Button
        onPress={async () => {
          try {
            await signOut();
            navigation.navigate("Login"); // Navigate to the "Login" screen
          } catch (error) {
            Alert.alert("Sign Out Error", error.message, [{ text: "OK" }]);
          }
        }}
      >
        Sign out!
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
  },
  headerText: {
    fontSize: 18,
  },
  cardContainer: {
    flex: 0.1,
    justifyContent: "space-around",
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#F7C6C8",
    padding: "5%",
    borderRadius: 15,
    margin: 14,
  },
  cardText: {
    alignItems: "flex-start",
  },
  cardAvatar: {
    width: 50,
    height: 50,
  },
});
export default PeopleHome;

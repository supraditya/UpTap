import { useEffect } from "react";
import { fetchUserData } from "../app/userSlice";

import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "@rneui/themed";

import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, signOut } from "../app/authManager";

const PeopleHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentAuthUser = getAuthUser();
  const { userData, userStatus, userError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("QRScan")}>
        Scan QR Code
      </Button>
      <Text style={{ margin: 14 }}>
        You're signed in, {currentAuthUser && currentAuthUser.email}!
      </Text>

      {currentAuthUser &&
        userData.their_cards_data_list.map((card) => (
          <Text key={card.id}>{card.firstName}</Text>
        ))}
      <Button
        onPress={async () => {
          try {
            await signOut();
            navigation.navigate("Login", { screen: "Login" });
          } catch (error) {
            Alert.alert("Sign In Error", error.message, [{ text: "OK" }]);
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
});
export default PeopleHome;

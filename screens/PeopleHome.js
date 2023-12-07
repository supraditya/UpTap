import { useEffect } from "react";
import { fetchData } from "../app/profileSlice";
import { fetchUserData } from "../app/userSlice";


import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "@rneui/themed";

import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, signOut } from "../app/authManager";


const PeopleHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentAuthUser = getAuthUser();
  const { data, status, error } = useSelector((state) => state.profile);
  const { userData, userStatus, userError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("QRScan")}>Scan QR Code</Button>
      <Text style={{ margin: 14, }}>You're signed in, {currentAuthUser && currentAuthUser.email}!</Text>

      <Text style={styles.headerText}>Your contacts: {currentAuthUser && userData.theirCards}</Text>
      <Button
        onPress={async () => {
          try {
            await signOut();
            navigation.navigate("Login", { screen: 'Login' });
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

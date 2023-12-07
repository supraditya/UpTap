import { useEffect } from "react";
import { fetchData } from "../app/profileSlice";
import { fetchCardData } from "../app/cardsSlice";


import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "@rneui/themed";

import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, signOut } from "../app/authManager";


const PeopleHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentAuthUser = getAuthUser();
  const { data, status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchData());
    // dispatch(fetchCardData())
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("QRScan")}>Scan QR Code</Button>
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

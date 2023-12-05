import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/profileSlice";

import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-native-qrcode-svg";

import { getAuthUser, signOut } from "../app/authManager";

const PeopleScreen = () => {
  // Redux content
  const dispatch = useDispatch();
  const currentAuthUser = getAuthUser();
  const { data, status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Expo barcode scanner content (Permission and scanning)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {data.qr_link && <QRCode value={data.qr_link} size={150} />}
      </View>
      <Text style={{ fontSize: 30 }}>
        {data.firstName} {data.lastName}
      </Text>
      <View>
        <View>
          <Text>
            You're signed in, {currentAuthUser && currentAuthUser.email}!
          </Text>

          <Button
            onPress={async () => {
              try {
                await signOut();
                navigation.navigate("Login");
              } catch (error) {
                Alert.alert("Sign In Error", error.message, [{ text: "OK" }]);
              }
            }}
          >
            Now sign out!
          </Button>
        </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          // onBarCodeScanned={handleBarCodeScanned}
          style={styles.cameraContainer}
        />
        {scanned && (
          <Button
            title="Tap to Scan Again"
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  cameraContainer: {
    height: 250, // Adjust the height as needed
    width: 250, // Take the full width of the parent container

  },
});

export default PeopleScreen;

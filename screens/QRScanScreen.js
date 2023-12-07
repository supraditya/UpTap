import { useState, useEffect } from "react";

import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";

import { db } from "../app/firebase";
import { doc, getDoc } from "firebase/firestore";

const QRScanScreen = ({ navigation }) => {
  const { data, status, error } = useSelector((state) => state.profile);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data: card_id }) => {
    setScanned(true);

    if (card_id.includes("//")) {
      alert("Invalid card ID. Try again with a valid QR from the UpTap App!");
      return;
    }
    //data contains doc id of a card from the cards collection on firebase
    const docRef = doc(db, "cards", card_id);

    const docSnapshot = await getDoc(docRef);
    console.log(docSnapshot);
    if (docSnapshot.exists()) {
      alert(`Card identified: ${docSnapshot.data()}`);
      navigation.navigate("PeopleHome");
    } else {
      // docSnap.data() will be undefined in this case
      alert("Invalid card ID. Try again with a valid QR from the UpTap App!");
      setScanned(false);
      return;
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>QR Scan Screen</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // onBarCodeScanned={handleBarCodeScanned}
        style={styles.cameraContainer}
      />
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
  cameraContainer: {
    height: 250, // Adjust the height as needed
    width: 250, // Take the full width of the parent container
  },
});
export default QRScanScreen;

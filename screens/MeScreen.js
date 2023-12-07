import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import CardDetail from "../components/CardDetail";


const MeScreen = () => {
  const { data, status, error } = useSelector((state) => state.profile);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {data.qr_link && <QRCode value={data.qr_link} size={150} />}
      </View>
      <Text style={{ fontSize: 30 }}>
        {/* {data.firstName} {data.lastName} */}
      </Text>
      <CardDetail />
      <Text>Me Screen</Text>
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
export default MeScreen;

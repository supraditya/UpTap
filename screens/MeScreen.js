import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";


import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";

import { getAuthUser } from "../app/authManager";


const MeScreen = () => {
  const currentAuthUser = getAuthUser();

  const { userData, userStatus, userError } = useSelector(
    (state) => state.user
  );
  return (
    <View style={styles.container}>
      {currentAuthUser &&
        userData.my_cards_data_list.map((card) => {
          return <TouchableOpacity key={card.id}>
            <QRCode value={card.id} size={150} />
            <Text>{card.firstName}</Text>
          </TouchableOpacity>;
        })}
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

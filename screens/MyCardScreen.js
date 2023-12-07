import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";

const MyCardScreen = ({ route, navigation }) => {
  const card = route.params.card;
  return (
    <View style={styles.container}>
      <QRCode value={card.id} size={150} />
      <Text>{card.nameOfCard}</Text>
      <Text>{card.firstName}</Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CardEditScreen',
            {
              cardID: card.id
            }
          )}
        >
          <Text>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
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
  button: {
    backgroundColor: "blue",
    color: "white",
  }
});
export default MyCardScreen;

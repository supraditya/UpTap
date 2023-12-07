import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import { colorCalculate } from "./PeopleHome";

const MyCardScreen = ({ route, navigation }) => {
  const card = route.params.card;
  // console.log(card)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <QRCode value={card.id} size={150} />
        {Object.entries(card).map(([keyName, value], index) => {
          if (
            keyName !== "firstName" &&
            keyName !== "lastName" &&
            keyName !== "id" &&
            keyName !== "company"
          ) {
            return (
              <Text style={styles.cardTextStyle} key={index}>
                {keyName}: {value}
              </Text>
            );
          }
        })}
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CardEditScreen", {
            card: card,
          })
        }
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CardEditScreen", {
            card: {},
          })
        }
      >
        <Text style={styles.editButtonText}>Create Card</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "blue",
    color: "white",
  },
  theirCard: {
    backgroundColor: colorCalculate(),
    flex: 0.5,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  cardTextStyle: {
    marginVertical: 5,
    fontSize: 20,
  },
  cardTextHeaderStyle: {
    fontSize: 36,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorCalculate(),
    padding: "5%",
    height: "60%",
    width: "90%",
    borderRadius: 18,
  },
  editButtonText: {
    fontSize: 24,
    marginTop: 15,
  },
  backButton: {
    width: '85%',
    // fontSize: 24,
  },
  backButtonText: {
    fontSize: 24,
  }
});

export default MyCardScreen;

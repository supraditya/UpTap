import { useEffect, useState } from "react";
import { fetchUserData } from "../app/userSlice";
import { colorCalculate } from "./PeopleHome";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const TheirCardScreen = ({ route, navigation }) => {
  const card = route.params.card;
  return (
    <View style={styles.container}>
      <View style={styles.theirCard}>
        <Text style={styles.cardTextHeaderStyle}>
          {card.firstName} {card.lastName}
        </Text>
        <Text style={styles.cardTextStyle}>Works at {card.company}</Text>
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
  theirCard:{
    backgroundColor: colorCalculate(),
    flex: 0.5,
    borderRadius: 18,
    justifyContent:'center',
    alignItems:'center',
    width: '90%'
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
  cardTextStyle: {
    fontSize: 20,
  },
  cardTextHeaderStyle: {
    fontSize: 36,
  },
});
export default TheirCardScreen;

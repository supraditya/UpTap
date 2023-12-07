import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";


import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";

import { getAuthUser } from "../app/authManager";
import { colorCalculate } from "./PeopleHome";


const MeHome = ({ navigation }) => {
  const currentAuthUser = getAuthUser();

  const { userData, userStatus, userError } = useSelector(
    (state) => state.user
  );

  const meCardPressHandler = (card) => {
    navigation.navigate("MyCardScreen", { card: card })
  }


  return (
    <View style={styles.container}>
      <View style={styles.myCard}>
        {currentAuthUser &&
          userData.my_cards_data_list.map((card) => {
            return (
              <View>
                <TouchableOpacity onPress={() => meCardPressHandler(card)} key={card.id}>
                  <View>
                    {/* <Text style={{ fontSize: 32 }}>{card.nameOfCard}</Text> */}
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
                </TouchableOpacity>
              </View>
            )
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
  bodyContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
  },
  myCard: {
    backgroundColor: colorCalculate(),
    flex: 0.5,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  cardTextStyle: {
    fontSize: 20,
  },
  cardTextHeaderStyle: {
    fontSize: 36,
  }
});

export default MeHome;

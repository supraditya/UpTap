import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { getAuthUser } from "../app/firebase";
import { colorCalculate } from "./PeopleHome";

const MeHome = ({ navigation }) => {
  const currentAuthUser = getAuthUser();

  const { userData, userStatus, userError } = useSelector(
    (state) => state.user
  );

  const meCardPressHandler = (card) => {
    navigation.navigate("MyCardScreen", { card: card });
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() =>
          navigation.navigate("CardEditScreen", {
            card: {},
          })
        }
      >
        <Text style={styles.editButtonText}>Create Card</Text>
      </Button>
      {currentAuthUser &&
        userData.my_cards_data_list.map((card, index) => {
          return (
            <TouchableOpacity
              onPress={() => meCardPressHandler(card)}
              key={index}
              style={{ ...styles.myCard, backgroundColor: colorCalculate() }}
            >
              <Text style={styles.cardTextHeaderStyle}>
                My {card.nameOfCard} Card
              </Text>
            </TouchableOpacity>
          );
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
  button: {
    backgroundColor: "blue",
    color: "white",
  },
  myCard: {
    // backgroundColor: colorCalculate(),
    flex: 0.2,
    borderRadius: 18,
    marginVertical: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  cardTextStyle: {
    fontSize: 20,
  },
  cardTextHeaderStyle: {
    fontSize: 36,
  },
});

export default MeHome;

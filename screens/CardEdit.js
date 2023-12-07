import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import CardDetail from '../components/CardDetail';
import { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, collection, query } from "firebase/firestore";
import {
  addUserMyCards,
  fetchUserData,
} from "../app/userSlice";
import { db } from "../app/firebase";
import { getAuthUser } from "../app/authManager";

function CardEditScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const currentAuthUser = getAuthUser();

  const card = route.params.card;
  let { firstName, lastName, email, nameOfCard } = card;
  const { userData, userStatus, userError } = useSelector(
    (state) => state.user
  );
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [emailInput, setEmailInput] = useState(email);
  const [cardNameInput, setCardNameInput] = useState(nameOfCard);
  const updateCard = async (updatedCard) => {
    dispatch(addUserMyCards(updatedCard));
    await setDoc(doc(db, 'users', currentAuthUser.uid), updatedCard);
    navigation.navigate('MyCardScreen',
      { card: updatedCard }
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyCardScreen',
              { card: card }
            )}
          >
            <Text style={styles.headerText}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>
            Edit Card
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => {
              updateCard({
                firstName: firstNameInput,
                lastName: lastNameInput,
                email: emailInput,
                nameOfCard: cardNameInput,
              })
            }}
          >
            <Text style={[styles.headerText, styles.highlight]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.body}>

        <View style={styles.entryWithLabel}>
          <View>
            <View style={{ flex: 0.4 }}></View>
            <Text>First Name: </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder='First Name'
              value={firstNameInput}
              onChangeText={text => setFirstNameInput(text)}
            />
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View>
            <View style={{ flex: 0.4 }}></View>
            <Text>Last Name: </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder='Last Name'
              value={lastNameInput}
              onChangeText={text => setLastNameInput(text)}
            />
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View>
            <View style={{ flex: 0.4 }}></View>
            <Text>Card Name </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder='Card Name'
              value={cardNameInput}
              onChangeText={text => setCompanyInput(text)}
            />
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View>
            <View style={{ flex: 0.4 }}></View>
            <Text>Email </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder='Email'
              value={emailInput}
              onChangeText={text => setCompanyInput(text)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 0.85,
    backgroundColor: 'white',
    width: '100%',
    padding: '5%',
  },
  entryWithLabel: {
    padding: '2%'
  },
  header: {
    flex: 0.15,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    padding: '5%'
  },
  headerLeft: {
    flex: 0.3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerRight: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20
  },
});

export default CardEditScreen;
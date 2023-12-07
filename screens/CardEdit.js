import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { useSelector } from 'react-redux';
import CardDetail from '../components/CardDetail';
import { useState } from 'react';

function CardEditScreen({ navigation, route }) {
  const card = route.params.card;
  console.log(card)
  let { firstName, lastName, email, nameOfCard } = card;

  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [emailInput, setEmailInput] = useState(email);
  const [cardNameInput, setCardNameInput] = useState(nameOfCard);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyCardScreen',
              { card: card }
            )}
          >
            <Text style={[styles.headerText, styles.highlight]}>
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
              // save this card then navigate back
              navigation.navigate('MyCardScreen',
                { card: card }
              )
            }}
          >
            <Text style={[styles.headerText, styles.highlight]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* **** BODY **** */}

      <ScrollView style={styles.body}>

        {/* *** BASIC INFO *** */}
        <View style={styles.entryWithLabel}>
          <View>
            <Text style={styles.listItemText}>Basic Info</Text>
          </View>
        </View>

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

    alignItems: 'center'
  },
  entryWithLabel: {

    padding: '1%'
  }

});

export default CardEditScreen;
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { useSelector } from 'react-redux';
import CardDetail from '../components/CardDetail';
import { useState } from 'react';

function CardEditScreen({ navigation, route }) {

  let { cardID } = route.params;
  let card = useSelector(state => {
    return state.cards.find(elem => elem.id === cards.id)
  });

  let { firstName, lastName, email, nameOfCard } = cards;

  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [emailInput, setEmailInput] = useState(email);
  const [cardNameInput, setCardNameInput] = useState(nameOfCard);


  console.log(card);

  return (

    <View style={styles.container}>

      {/* **** HEADER **** */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyCardScreen',
              {
                cardID: card.id
              }
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

              // save this contact

              // then navigate back
              navigation.navigate('MeScreen',
                {
                  contactID: contactID
                }

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
          <View style={styles.entryWithLabelLeft}>
            <Text style={styles.listItemText}>Basic Info</Text>
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <View style={{ flex: 0.4 }}></View>
            <Text>First Name: </Text>
          </View>
          <View style={[styles.entryWithLabelRight]}>
            <TextInput
              style={styles.textInput}
              placeholder='First Name'
              value={firstNameInput}
              onChangeText={text => setFirstNameInput(text)}
            />
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <View style={{ flex: 0.4 }}></View>
            <Text>Last Name: </Text>
          </View>
          <View style={[styles.entryWithLabelRight]}>
            <TextInput
              style={styles.textInput}
              placeholder='Last Name'
              value={lastNameInput}
              onChangeText={text => setLastNameInput(text)}
            />
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <View style={{ flex: 0.4 }}></View>
            <Text>Company: </Text>
          </View>
          <View style={styles.entryWithLabelRight}>
            <TextInput
              style={styles.textInput}
              placeholder='Company'
              value={companyInput}
              onChangeText={text => setCompanyInput(text)}
            />
          </View>
        </View>

        <View style={styles.hr} />

        {/* *** PHONE NUMBERS *** */}
        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <Icon
              name='phone'
              type='material'
              size={20}
            />
            <Text style={styles.listItemText}>&nbsp; Phone</Text>
          </View>
        </View>

        {phoneList.map((pnum, idx) => {
          console.log('mapping', pnum, idx);
          return (
            <View style={[styles.entryWithLabel]} key={pnum.label}>
              <View style={styles.entryWithLabelLeft}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('trying to delete');
                    const newPhoneList = phoneList.filter(p => p.label !== pnum.label);
                    console.log('after filter:', newPhoneList);
                    setPhoneList(newPhoneList);
                  }}
                >
                  <Icon
                    name='remove-circle'
                    type='material'
                    size={20}
                    color='red'
                  />
                </TouchableOpacity>
                <Text>&nbsp; {pnum.label} &gt;</Text>
              </View>
              <View style={styles.entryWithLabelRight}>
                <TextInput
                  style={styles.textInput}
                  placeholder='888-555-1212'
                  value={pnum.number}
                  onChangeText={text => {
                    setPhoneList(phoneList.map(
                      p => pnum.label === p.label ? { ...p, number: text } : p
                    ));
                  }}
                />
              </View>
            </View>
          );
        })}
        <View style={[styles.entryWithLabel]}>
          <View style={styles.entryWithLabelLeft}>
            <Icon
              name='add-circle'
              type='material'
              size={20}
              color='green'
            />
          </View>
        </View>

        {email.map((em, idx) => {
          return (
            <View style={[styles.entryWithLabel]} key={em.label}>
              <View style={styles.entryWithLabelLeft}>
                <Icon
                  name='remove-circle'
                  type='material'
                  size={20}
                  color='red'
                />
                <Text>&nbsp; {em.label} &gt;</Text>
              </View>
              <View style={styles.entryWithLabelRight}>
                <TextInput
                  style={styles.textInput}
                  placeholder='person@email.com'
                  value={emailList[idx].emailaddr}
                  onChangeText={text => {
                    setEmailList(emailList.map(
                      e => em.label === e.label ? { ...e, emailaddr: text } : e
                    ));
                  }}
                />
              </View>
            </View>
          );
        })}
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
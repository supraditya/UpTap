import React, { useEffect } from "react";
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/profileSlice";

import { Button } from '@rneui/themed';
import { getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Secrets';
import { getAuthUser, signOut } from '../app/authManager';
import { subscribeToUserUpdates } from '../data/Actions';


function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.profile);
  const users = useSelector(state => state.users);
  const currentAuthUser = getAuthUser();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>
        You're signed in, {currentAuthUser && currentAuthUser.email}!
      </Text>

      <Button
        onPress={async () => {
          try {
            await signOut();
            navigation.navigate('Login');
          } catch (error) {
            Alert.alert("Sign In Error", error.message, [{ text: "OK" }])
          }
        }}
      >
        Now sign out!
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },

  listContainer: {
    flex: 0.5,
    witdh: '100%',
  }
});

export default HomeScreen;

import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import { Icon } from "@rneui/themed";

// import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PeopleScreen from "./PeopleScreen";
import MeScreen from "./MeScreen";

const Tab = createBottomTabNavigator();

const PostLoginWrapper = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="People"
        options={{
          tabBarIcon: ({ color }) => <Icon name="groups" color={color} />,
        }}
        component={PeopleScreen}
      />
      <Tab.Screen
        name="Me"
        options={{
          tabBarIcon: ({ color }) => <Icon name="contacts" color={color} />,
        }}
        component={MeScreen}
      />
    </Tab.Navigator>
  );
};

export default PostLoginWrapper;

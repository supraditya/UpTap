import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PostLoginWrapper from "./screens/PostLoginWrapper";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications


// Redux Toolkit imports
import store from "./app/store";
import { Provider } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
// import QRScanScreen from "./screens/QRScanScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='PostLogin' component={PostLoginWrapper}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

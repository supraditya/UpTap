import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";

// Redux Toolkit imports
import store from "./app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <HomeScreen></HomeScreen>
        <StatusBar style="auto" />
      </View>
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

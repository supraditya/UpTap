import { View, Text, StyleSheet } from "react-native"

const Links = () => {
  return (
    <View>
      <Text style={styles.link}>link 1</Text>
      <Text style={styles.link}>link 2</Text>
      <Text style={styles.link}>link 3</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  link: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
  }
})
export default Links
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from "react-native";

export default function App() {
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.header}>
          <Image source={require("./assets/heatseeker_logo.png")} />
        </View>
        <Image
          style={styles.raffleImage}
          source={require("./assets/raffle_sample.jpg")}
        />
        <Text style={styles.raffleTitle}>
          Yeezy 350 Boost Black Non-Reflective $200
        </Text>
        <Text style={styles.raffleOption}>
          A Ma Maniere - Starts Tomorrow 8pm
        </Text>
        <Text style={styles.raffleOption}>
          Social Status - Starts Today 7pm
        </Text>
        <Image
          style={styles.raffleImage}
          source={require("./assets/raffle_sample2.jpg")}
        />
        <Text style={styles.raffleTitle}>Nike Air Fear of God Sail - $350</Text>
        <Text style={styles.raffleOption}>A Ma Maniere - Starts Today 8pm</Text>
        <Text style={styles.raffleOption}>
          Wish ATL - Starts Wednesday 8/2 7pm
        </Text>
      </View>
    </ScrollView>
  );
}

let dimensions = Dimensions.get("window");
console.log("dimensions", dimensions);

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    borderColor: "blue",
    // borderWidth: 2,
    flexDirection: "column",
    marginBottom: 75,
    top: 40
  },
  header: {
    borderColor: "green",
    // borderWidth: 2,
    textAlign: "center"
  },
  raffleImage: {
    borderColor: "red",
    // borderWidth: 2,
    height: dimensions.width,
    marginTop: 20,
    width: "100%"
  },
  raffleTitle: {
    borderColor: "yellow",
    // borderWidth: 2,
    fontSize: 16,
    textAlign: "center"
  },
  raffleOption: {
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
    width: "85%"
  }
});

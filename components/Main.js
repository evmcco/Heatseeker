import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from "react-native";

import RaffleCard from "./RaffleCard";

class Main extends Component {
  state = {
    sneakerRaffles: []
  };

  async componentDidMount() {
    //lifecycle method
    const sneakerRaffles = await this.loadData();
    this.setState({
      sneakerRaffles
    });
  }

  loadData = async () => {
    const url = "http://10.150.40.93:3000/sneakers/all";
    const response = await fetch(url, {
      method: "get"
    });
    const data = response.json();
    return data;
  };

  render() {
    const dimensions = Dimensions.get("window");

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
      }
    });

    return (
      <ScrollView style={styles.body}>
        <View style={styles.main}>
          <View style={styles.header}>
            <Image source={require("../assets/heatseeker_logo.png")} />
          </View>
          {this.state.sneakerRaffles.map(sneaker => {
            return (
              <RaffleCard key={sneaker.sneaker_id} raffleEntry={sneaker} />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

export default Main;

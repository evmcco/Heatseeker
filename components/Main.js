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
    sneakerRaffles: [],
    userLocationLat: 0,
    userLocationLon: 0
  };

  async componentDidMount() {
    //lifecycle method
    const sneakerRaffles = await this.loadData();
    await navigator.geolocation.getCurrentPosition(this.logGeoData);
    this.setState({
      sneakerRaffles
    });
  }

  logGeoData = pos => {
    this.setState({
      userLocationLat: pos.coords.latitude,
      userLocationLon: pos.coords.longitude
    });
  };

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
          {!!this.state.userLocationLat
            ? this.state.sneakerRaffles.map(sneaker => {
                return (
                  <RaffleCard
                    key={sneaker.sneaker_id}
                    raffleEntry={sneaker}
                    userLocLat={this.state.userLocationLat}
                    userLocLon={this.state.userLocationLon}
                  />
                );
              })
            : null}
        </View>
      </ScrollView>
    );
  }
}

export default Main;

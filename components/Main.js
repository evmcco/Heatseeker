import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import RaffleCard from "./RaffleCard";
import Login from "./Login";

class Main extends Component {
  state = {
    sneakerRaffles: [],
    name: null,
    user_id: null,
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

  getNotificationToken = async () => {
    const { status, permission } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    if (status === "granted") {
      return await Notifications.getExpoPushTokenAsync();
    }
  };

  setLoginResponseToState = async (name, sub) => {
    this.setState({
      name,
      user_id: sub
    });
    console.log("Post login state:", this.state.name, this.state.sub);
  };

  render() {
    const styles = StyleSheet.create({
      deviceInfo: {
        backgroundColor: "rgb(220,220,222)"
      },
      body: {
        backgroundColor: "rgb(220,220,222)",
        top: 50
      },
      main: {
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "blue",
        // borderWidth: 2,
        flexDirection: "column",
        marginBottom: 150
        // top: 5
      },
      header: {
        alignItems: "center",
        backgroundColor: "rgb(220,220,222)",
        borderColor: "green",
        // borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        top: 40,
        width: "100%"
      },
      headerText: {
        color: "#E52D00",
        fontWeight: "bold",
        fontSize: 40,
        textAlign: "center"
      },
      icon: {
        width: "20%"
      }
    });

    return (
      <View style={styles.deviceInfo}>
        <View style={styles.header}>
          <Login setLoginResponseToState={this.setLoginResponseToState} />
          <Text style={styles.headerText}>Heatseeker</Text>
          <Text style={styles.icon} />
        </View>
        <ScrollView style={styles.body}>
          <View style={styles.main}>
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
      </View>
    );
  }
}

export default Main;

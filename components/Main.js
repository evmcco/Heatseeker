import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView
} from "react-native";
import { AuthSession, Notifications } from "expo";
import * as Permissions from "expo-permissions";
import RaffleCard from "./RaffleCard";
import jwtDecode from "jwt-decode";

const auth0ClientId = "fTnv2FOpy7TV16I00U5KF3On5slIbYBy";
const auth0Domain = "https://heatseeker.auth0.com";

function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

class Main extends Component {
  state = {
    sneakerRaffles: [],
    name: null,
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

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid profile", // retrieve the user's profile
      nonce: "nonce" // ideally, this will be a random value
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log("Authentication response", response);

    if (response.type === "success") {
      this.handleResponse(response.params);
    }
  };

  handleResponse = response => {
    if (response.error) {
      Alert(
        "Authentication error",
        response.error_description || "something went wrong"
      );
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    const { name } = decoded;
    this.setState({ name });
  };

  render() {
    const dimensions = Dimensions.get("window");
    const { name } = this.state;

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
      login: {
        width: "20%"
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
          <View style={styles.login}>
            {name ? (
              <>
                <Button
                  title="Logout"
                  onPress={() => this.setState({ name: null })}
                />
              </>
            ) : (
              <Button title="Login" onPress={this.login} />
            )}
          </View>
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

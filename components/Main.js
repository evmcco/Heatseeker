import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Notifications, Font } from "expo";
import * as Permissions from "expo-permissions";
import RaffleCard from "./RaffleCard";
import Login from "./Login";

class Main extends Component {
  state = {
    sneakerRaffles: [],
    name: null,
    user_id: null,
    userLocationLat: 0,
    userLocationLon: 0,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "josefin-sans": require("../assets/fonts/JosefinSans-SemiBoldItalic.ttf"),
      montserrat: require("../assets/fonts/Montserrat-Regular.ttf")
    });
    const sneakerRaffles = await this.loadSneakerData();
    await navigator.geolocation.getCurrentPosition(this.logGeoData);
    this.setState({
      sneakerRaffles,
      fontLoaded: true
    });
  }

  async componentDidUpdate() {
    if (!!this.state.user_id) {
      await this.getNotificationToken();
    }
  }

  logGeoData = pos => {
    this.setState({
      userLocationLat: pos.coords.latitude,
      userLocationLon: pos.coords.longitude
    });
  };

  loadSneakerData = async () => {
    const url = "http://10.150.40.93:3000/sneakers/all";
    const response = await fetch(url, {
      method: "get"
    });
    const data = response.json();
    return data;
  };

  getNotificationToken = async () => {
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    let pushToken = await Notifications.getExpoPushTokenAsync();
    const apiUrl = `https://heatseeker.auth0.com/api/v2/users/${
      this.state.user_id
    }`;
    const auth0Token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16Y3pOakk1UXpnME1VRkROVGsyTWpJM1F6VTBORVpHTlRJNU1rVXpRa0l4UXpsQ1JUbEJOdyJ9.eyJpc3MiOiJodHRwczovL2hlYXRzZWVrZXIuYXV0aDAuY29tLyIsInN1YiI6IlVLTlE2U0ZFU3dUeG1uRTIwTnBqdXp3RVBTTlh2M0dQQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2hlYXRzZWVrZXIuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1NjQ2ODYwMTEsImV4cCI6MTU2NTI5MDgxMSwiYXpwIjoiVUtOUTZTRkVTd1R4bW5FMjBOcGp1endFUFNOWHYzR1AiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.n7vqoR8NzYJnaaItgpnnz4iZ_6zTBPnLIosjctY_w_xmfyBFkeEnVJMAWSCafi_cv6f5QdsOPwJdCTZ3f2_1mtmn7NvOFgG7ZFpUZ_T50aH4kTPN4OXzgkfcE8kQIv1qBm-9kz21Pfi-qpKzai41ksab16eKJhv6YvnJ9YhFMX4JSLAk6k0_gdEMQsw5IMaZwjrFeOBil0kNm1Qe8oHFs_s-NMywKjaPNjaFtjJy4U_HXb4gUxdl-eRgFbJOhudVooud_VPkSS-8fp5QW3IQLCAtIIt2H82OhURcFMe0zpDgqn92G79bwUjWAi3npIB46QH9aV1PxH2Xane7WXmijQ";
    console.log("api url:", apiUrl);
    console.log("push token", pushToken);
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth0Token}`
      },
      method: "PATCH",
      body: JSON.stringify({
        user_metadata: { Expo_Push_Notif_Token: pushToken }
      })
    });
    console.log("notification token patch call response:", response);
  };

  setLoginResponseToState = async (name, user_id) => {
    this.setState({
      name,
      user_id
    });
    console.log("Post login state:", this.state.name, this.state.user_id);
  };

  render() {
    const styles = StyleSheet.create({
      deviceInfo: {
        backgroundColor: "rgb(240,240,242)"
        // backgroundColor: "#E52D00"
      },
      body: {
        backgroundColor: "rgb(240,240,242)",
        // backgroundColor: "#E52D00",
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
        backgroundColor: "rgb(240,240,242)",
        // backgroundColor: "#E52D00",
        borderColor: "green",
        // borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        top: 50,
        width: "100%"
      },
      headerText: {
        color: "#E52D00",
        // color: "rgb(240,240,242)",
        fontFamily: "josefin-sans",
        fontSize: 45,
        textAlign: "center"
      },
      icon: {
        width: "20%"
      }
    });

    return (
      <>
        {!!this.state.fontLoaded ? (
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
        ) : null}
      </>
    );
  }
}

export default Main;

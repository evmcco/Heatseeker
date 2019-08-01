import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Font } from "expo";
import RaffleListing from "./RaffleListing";

class RaffleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffleEntry: this.props.raffleEntry,
      fontLoaded: false
    };
  }

  findDistanceBetweenCoords = (a, b) => {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
  };

  sortRafflesByDistance = () => {
    let newRaffleEntry = { ...this.state.raffleEntry };
    newRaffleEntry.raffles.sort(
      (a, b) =>
        this.findDistanceBetweenCoords(
          [a.address_lat, a.address_lon],
          [this.props.userLocLat, this.props.userLocLon]
        ) -
        this.findDistanceBetweenCoords(
          [b.address_lat, b.address_lon],
          [this.props.userLocLat, this.props.userLocLon]
        )
    );
    this.setState({
      raffleEntry: newRaffleEntry
    });
  };

  async componentDidMount() {
    this.sortRafflesByDistance();
    await Font.loadAsync({
      montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
      "montserrat-semi-bold": require("../assets/fonts/Montserrat-SemiBold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const dimensions = Dimensions.get("window");

    const styles = StyleSheet.create({
      raffleCard: {
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "grey",
        // borderWidth: 2,
        flexDirection: "column",
        paddingVertical: 12
      },
      raffleImage: {
        borderColor: "red",
        // borderWidth: 2,
        // height: dimensions.height / 4,
        height: dimensions.width,
        resizeMode: "contain",
        width: dimensions.width
      },
      raffleTitle: {
        borderColor: "yellow",
        // borderWidth: 2,
        fontFamily: "montserrat-semi-bold",
        fontSize: 24,
        textAlign: "center"
      },
      rafflePrice: {
        fontFamily: "montserrat-semi-bold",
        fontSize: 18
      }
    });

    return (
      <>
        {!!this.state.fontLoaded ? (
          <View style={styles.raffleCard}>
            <Text style={styles.raffleTitle}>
              {this.state.raffleEntry.sneaker_name}
            </Text>
            <Text style={styles.rafflePrice}>
              ${this.state.raffleEntry.price}
            </Text>
            <Image
              style={styles.raffleImage}
              source={{ uri: this.state.raffleEntry.image_url }}
            />
            {this.state.raffleEntry.raffles.map((raffle, index) => {
              return (
                <RaffleListing key={raffle.raffle_id} listingData={raffle} />
              );
            })}
          </View>
        ) : null}
      </>
    );
  }
}

export default RaffleCard;

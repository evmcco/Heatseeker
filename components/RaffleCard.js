import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import RaffleListing from "./RaffleListing";

class RaffleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffleEntry: this.props.raffleEntry
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

  componentDidMount() {
    this.sortRafflesByDistance();
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
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
      },
      rafflePrice: {
        fontSize: 18
      }
    });

    return (
      <View style={styles.raffleCard}>
        <Text style={styles.raffleTitle}>
          {this.state.raffleEntry.sneaker_name}
        </Text>
        <Text style={styles.rafflePrice}>${this.state.raffleEntry.price}</Text>
        <Image
          style={styles.raffleImage}
          source={{ uri: this.state.raffleEntry.image_url }}
        />
        {this.state.raffleEntry.raffles.map((raffle, index) => {
          return <RaffleListing key={raffle.raffle_id} listingData={raffle} />;
        })}
      </View>
    );
  }
}

export default RaffleCard;

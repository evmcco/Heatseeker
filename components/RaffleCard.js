import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

class RaffleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffleEntry: this.props.raffleEntry
    };
  }

  render() {
    const dimensions = Dimensions.get("window");

    const styles = StyleSheet.create({
      raffleCard: {
        alignItems: "center",
        borderColor: "blue",
        // borderWidth: 2,
        flexDirection: "column"
      },
      raffleImage: {
        borderColor: "red",
        // borderWidth: 2,
        height: dimensions.height / 4,
        //might need to use height: dimensions.width here (rectangular vs square images)
        marginTop: 20,
        width: dimensions.width
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

    return (
      <View style={styles.raffleCard}>
        <Image
          style={styles.raffleImage}
          source={{ uri: this.state.raffleEntry.image_url }}
        />
        <Text style={styles.raffleTitle}>
          {this.state.raffleEntry.sneaker_name}
        </Text>
        {this.state.raffleEntry.raffles.map((raffle, index) => {
          return (
            <Text key={raffle.raffle_id} style={styles.raffleOption}>
              {raffle.store_name} - Starts {raffle.start_time}
            </Text>
          );
        })}
      </View>
    );
  }
}

export default RaffleCard;

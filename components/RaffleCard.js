import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import RaffleListing from "./RaffleListing";

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
      }
    });

    return (
      <View style={styles.raffleCard}>
        <Text style={styles.raffleTitle}>
          {this.state.raffleEntry.sneaker_name}
        </Text>
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

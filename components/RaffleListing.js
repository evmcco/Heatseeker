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
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

class RaffleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: this.props.listingData,
      expanded: false
    };
  }

  expandCard = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const dimensions = Dimensions.get("window");

    const styles = StyleSheet.create({
      raffleOption: {
        borderColor: "grey",
        borderWidth: 1,
        flexDirection: "row",
        fontSize: 20,
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 4,
        paddingHorizontal: 12,
        paddingVertical: 4,
        width: dimensions.width * 0.85
      }
    });

    return (
      <View key={this.state.listingData.raffle_id} style={styles.raffleOption}>
        {this.state.expanded == false ? (
          <>
            <Text key={this.state.listingData.raffle_id}>
              {this.state.listingData.store_name} - Starts{" "}
              {this.state.listingData.start_time_clean}
            </Text>
            <TouchableOpacity onPress={this.expandCard}>
              <FontAwesomeIcon icon={faChevronDown} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text key={this.state.listingData.raffle_id}>
              {this.state.listingData.store_name} - Starts{" "}
              {this.state.listingData.start_time_clean}
            </Text>
            <TouchableOpacity onPress={this.expandCard}>
              <FontAwesomeIcon icon={faChevronUp} />
            </TouchableOpacity>
            <Text>Ends - {this.state.listingData.end_time_clean}</Text>
            <Text>{this.state.listingData.address}</Text>
            <Text>{this.state.listingData.description}</Text>
          </>
        )}
      </View>
    );
  }
}

export default RaffleListing;

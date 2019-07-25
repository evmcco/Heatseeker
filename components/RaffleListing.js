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
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 4,
        paddingHorizontal: 12,
        paddingVertical: 4,
        width: dimensions.width * 0.85
      },
      text: {
        fontSize: 16,
        lineHeight: 22
      }
    });

    return (
      <View key={this.state.listingData.raffle_id} style={styles.raffleOption}>
        {this.state.expanded == false ? (
          <>
            <Text style={styles.text} key={this.state.listingData.raffle_id}>
              {this.state.listingData.store_name} -&nbsp;
              {this.state.listingData.time_until}
            </Text>
            <TouchableOpacity onPress={this.expandCard}>
              <FontAwesomeIcon size={22} icon={faChevronDown} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.text} key={this.state.listingData.raffle_id}>
              {this.state.listingData.store_name} -&nbsp;
              {this.state.listingData.time_until}
            </Text>
            <TouchableOpacity onPress={this.expandCard}>
              <FontAwesomeIcon size={22} icon={faChevronUp} />
            </TouchableOpacity>
            <Text style={styles.text}>
              Starts - {this.state.listingData.start_time_clean}&#13;
            </Text>
            <Text style={styles.text}>
              Ends - {this.state.listingData.end_time_clean}
            </Text>
            <Text style={styles.text}>{this.state.listingData.address}</Text>
            <Text style={styles.text}>
              {this.state.listingData.description}
            </Text>
          </>
        )}
      </View>
    );
  }
}

export default RaffleListing;

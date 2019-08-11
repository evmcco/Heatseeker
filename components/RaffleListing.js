import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking
} from "react-native";
import { Font } from "expo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faMapMarkedAlt,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

class RaffleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingData: this.props.listingData,
      expanded: false,
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      montserrat: require("../assets/fonts/Montserrat-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  expandCard = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  openMapsLink = () => {
    let storeName = this.state.listingData.store_name;
    let urlStoreName = storeName.replace(/ /g, "+");
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${urlStoreName}`;
    Linking.openURL(mapsUrl).catch(err =>
      console.error("An error occurred", err)
    );
  };

  openInstaLink = () => {
    let instaUrl = this.state.listingData.post_url;
    Linking.openURL(instaUrl).catch(err =>
      console.error("An error has occurred", err)
    );
  };

  render() {
    const dimensions = Dimensions.get("window");

    const styles = StyleSheet.create({
      raffleOption: {
        borderColor: "grey",
        borderWidth: 1,
        fontFamily: "montserrat",
        marginVertical: 4,
        paddingHorizontal: 12,
        paddingVertical: 4,
        width: dimensions.width * 0.85
      },
      raffleTouch: {
        flexDirection: "row",
        flexWrap: "wrap",
        fontFamily: "montserrat",
        justifyContent: "space-between",
        width: dimensions.width * 0.8
      },
      firstRow: {
        alignItems: "center",
        flexDirection: "row",
        // flexWrap: "wrap",
        fontFamily: "montserrat",
        justifyContent: "space-between",
        width: "100%"
      },
      firstRowText: {
        flex: 9,
        fontFamily: "montserrat",
        fontSize: 15,
        lineHeight: 22
      },
      firstRowInfoIcon: {
        flex: 1,
        marginRight: 4
      },
      text: {
        fontFamily: "montserrat",
        fontSize: 15,
        lineHeight: 22,
        width: "100%"
      },
      actions: {
        fontFamily: "montserrat",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
        width: "100%"
      }
    });

    return (
      <>
        {this.state.fontLoaded ? (
          <View
            key={this.state.listingData.raffle_id}
            style={styles.raffleOption}
          >
            {this.state.expanded == false ? (
              <TouchableOpacity
                style={styles.raffleTouch}
                onPress={this.expandCard}
              >
                <View
                  style={styles.firstRow}
                  key={this.state.listingData.raffle_id}
                >
                  <Text style={styles.firstRowText}>
                    {this.state.listingData.store_name} -&nbsp;
                    {this.state.listingData.time_until}
                  </Text>
                  <FontAwesomeIcon
                    size={16}
                    icon={faInfoCircle}
                    style={styles.firstRowInfoIcon}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.raffleTouch}>
                <TouchableOpacity
                  style={styles.raffleTouch}
                  onPress={this.expandCard}
                >
                  <View
                    style={styles.firstRow}
                    key={this.state.listingData.raffle_id}
                  >
                    <Text style={styles.firstRowText}>
                      {this.state.listingData.store_name} -&nbsp;
                      {this.state.listingData.time_until}
                    </Text>
                    <FontAwesomeIcon
                      size={16}
                      icon={faInfoCircle}
                      style={styles.firstRowInfoIcon}
                    />
                  </View>
                </TouchableOpacity>
                <Text style={styles.text}>
                  Starts - {this.state.listingData.start_time_clean}&#13;
                </Text>
                <Text style={styles.text}>
                  Ends - {this.state.listingData.end_time_clean}
                </Text>
                <Text style={styles.text}>
                  {this.state.listingData.description}
                </Text>
                <View style={styles.actions}>
                  {!!this.state.listingData.post_url ? (
                    <TouchableOpacity onPress={this.openInstaLink}>
                      <FontAwesomeIcon size={22} icon={faInstagram} />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity onPress={this.openMapsLink}>
                    <FontAwesomeIcon
                      size={22}
                      icon={faMapMarkedAlt}
                      style={{ marginLeft: 8, paddingHorizontal: 6 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : null}
      </>
    );
  }
}

export default RaffleListing;

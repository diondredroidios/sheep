import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { OpenWeather } from "./OpenWeather";

const capitalize = require("capitalize");

class ForecastListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.forecastItem}>
        <View style={styles.leftColumn}>
          {/* day */}
          <Text style={styles.largeText}>{this.props.data.day}</Text>

          {/* temp */}
          <View style={styles.temperatureContainer}>
            <Text style={styles.largeText}>
              {OpenWeather.convertToFahrenheit(
                this.props.data.main["temp_min"]
              )}
            </Text>
            <Text style={styles.largeText}>
              {OpenWeather.convertToFahrenheit(
                this.props.data.main["temp_max"]
              )}
            </Text>
          </View>
        </View>

        {/* description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.largeText}>
            {capitalize(this.props.data.weather[0].description)}
          </Text>
        </View>
        {/* <Text style={styles.temperature}>
          {OpenWeather.convertToFahrenheit(
            this.state.currentConditions.main.temp
          ) + "°"}
        </Text>
        <Image source={this.state.image} style={styles.icon} />
        <Image
          source={require("./images/forward.png")}
          style={styles.forwardIcon}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  forecastItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 325,
    height: 84,
    marginBottom: 12,
    padding: 0,
    // backgroundColor: "#eee",
  },
  largeText: {
    fontSize: 20,
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 72,
  },
  temperatureContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 12,
    // backgroundColor: "#eee",
  },
  descriptionContainer: {
    marginLeft: 24,
  },
});

export default ForecastListItem;

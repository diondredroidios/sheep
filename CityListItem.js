import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { OpenWeather } from "./OpenWeather";

class CityListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // get current conditions
    OpenWeather.instance.getCurrentConditions(this.props.city.id, data => {
      this.setState({ currentConditions: data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentConditions !== this.state.currentConditions) {
      this.currentConditionsDidUpdate();
    }
  }

  currentConditionsDidUpdate() {
    // set image
    let image;
    // convert from OpenWeather icon id to our icons
    let icon = this.state.currentConditions.weather[0].icon;
    let id = icon.substring(0, 2); // ignore day/night
    switch (id) {
      case "01":
        image = require("./images/sun.png");
        break;
      case "02":
      case "03":
      case "04":
      case "50":
        image = require("./images/cloud.png");
        break;
      case "09":
        image = require("./images/cloud-rain.png");
        break;
      case "10":
        image = require("./images/cloud-drizzle.png");
        break;
      case "11":
        image = require("./images/cloud-lightning.png");
        break;
      case "13":
        image = require("./images/cloud-snow.png");
        break;
      default:
        image = require("./images/cloud.png");
        break;
    }
    this.setState({ image, id });
  }

  onPress() {
    // check for needed data
    if (!this.state.currentConditions) {
      return;
    }
    this.props.onPress({
      city: this.props.city,
      currentConditions: this.state.currentConditions,
      image: this.state.image,
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={styles.cityListItem}>
          <Text style={styles.city}>{this.props.city.name}</Text>
          {this.state.currentConditions && (
            <View style={styles.cityDetails}>
              <Text style={styles.temperature}>
                {OpenWeather.convertToFahrenheit(
                  this.state.currentConditions.main.temp
                ) + "°"}
              </Text>
              <Image source={this.state.image} style={styles.icon} />
              <Image
                source={require("./images/forward.png")}
                style={styles.forwardIcon}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cityListItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 325,
    height: 84,
    marginBottom: 12,
    padding: 0,
    // backgroundColor: "#eee",
  },
  cityDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  city: {
    fontSize: 20,
  },
  temperature: {
    fontSize: 20,
    marginEnd: 12,
  },
  icon: {
    // backgroundColor: "blue",
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  forwardIcon: {
    marginLeft: 12,
    width: 24,
    height: 24,
  },
});

export default CityListItem;

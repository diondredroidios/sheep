import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  AsyncStorage,
} from "react-native";

import ForecastList from "./ForecastList";
import { OpenWeather } from "./OpenWeather";

const capitalize = require("capitalize");

class CityDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.navigation.getParam("info"),
    };
  }

  componentDidMount() {
    // get forecast
    OpenWeather.instance.getForecast(this.state.info.city.id, data => {
      // add a day of week string to each forecast day
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const today = new Date().getDay();
      data.list.forEach((forecastDay, index) => {
        const dayOfWeek = (index + today) % 7;
        forecastDay.day = daysOfWeek[dayOfWeek];
      });

      this.setState({ forecast: data });
    });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  deleteCity() {
    AsyncStorage.getItem("savedCities", (error_, result_, string) => {
      if (error_) {
        console.log(error_);
        return;
      }

      let savedCities = JSON.parse(result_);

      let newSavedCities = savedCities.filter(
        savedCity => savedCity.id !== this.state.info.city.id
      );

      console.log(
        `Removing "${this.state.info.city.name}". savedCities was `,
        savedCities,
        `now`,
        newSavedCities
      );

      AsyncStorage.setItem(
        "savedCities",
        JSON.stringify(newSavedCities),
        error_ => {
          if (error_) {
            console.log(error_);
            return;
          }
          console.log(`Finished remove city`);
          this.props.navigation.goBack();
        }
      );
    });
  }

  render() {
    console.log("this.state.info", this.state.info);
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.topRow}>
          {/* back button */}
          <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
            <Image source={require("./images/back.png")} style={styles.back} />
          </TouchableWithoutFeedback>

          {/* minus button */}
          <TouchableWithoutFeedback onPress={this.deleteCity.bind(this)}>
            <Text style={styles.minusButton}>-</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.row1}>
          {/* city */}
          <Text style={styles.city}>{this.state.info.city.name}</Text>

          {/* image */}
          <View style={styles.iconContainer}>
            <Image source={this.state.info.image} style={styles.icon} />
          </View>
        </View>

        {/* conditions */}
        <View style={styles.row2}>
          <Text style={styles.description}>
            {capitalize(
              this.state.info.currentConditions.weather[0].description
            )}
          </Text>
        </View>

        {/* forecast */}
        <View style={styles.row3}>
          <ForecastList
            data={this.state.forecast ? this.state.forecast.list : null}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default CityDetails;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },

  topRow: {
    flexDirection: "row",
    width: "100%",
    padding: 12,
    justifyContent: "space-between",
  },
  back: {
    width: 36,
    height: 36,
  },
  minusButton: {
    width: 36,
    height: 36,
    fontSize: 36,
    textAlign: "center",
    lineHeight: 36,
  },

  row1: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 0,
  },
  city: {
    fontSize: 26,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  row2: {
    width: "100%",
    flex: 1,
  },
  description: {
    textAlign: "left",
    padding: 24,
    paddingTop: 0,
    fontSize: 20,
  },

  row3: {
    flex: 8,
  },
});

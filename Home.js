import React, { Component } from "react";
import {
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import CityList from "./CityList";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedCities: [],
    };

    this.props.navigation.addListener("willFocus", this.willFocus.bind(this));
  }

  willFocus(payload) {
    // console.log("Home did focus. Payload:", payload);
    this.getSavedCities();
  }

  getSavedCities() {
    AsyncStorage.getItem("savedCities", (error_, result_, string) => {
      if (error_) {
        console.error(error_);
        return;
      }

      let savedCities = result_ ? JSON.parse(result_) : [];
      this.setState({ savedCities });
    });
  }

  addCity() {
    this.props.navigation.navigate("AddCity");
  }

  onPressCity(info) {
    this.props.navigation.navigate("CityDetails", { info });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.addCity.bind(this)}>
            <Text style={styles.plusButton}>+</Text>
          </TouchableWithoutFeedback>
          <CityList
            data={this.state.savedCities}
            onPressCity={this.onPressCity.bind(this)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    // backgroundColor: "#aaa",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 8
  },
  plusButton: {
    width: 48,
    height: 48,
    fontSize: 36,
    alignSelf: "flex-end",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 48,
    marginBottom: 12,
  },
});

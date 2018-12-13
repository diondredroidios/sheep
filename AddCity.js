import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

import { City } from "./City";

import Plus from "./Plus";

class AddCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCities: [],
    };
  }

  componentDidMount() {
    // get current saved cities
    AsyncStorage.getItem("savedCities", this.didGetSavedCities.bind(this));
  }

  didGetSavedCities(error_, result_, string) {
    // check for error
    if (error_) {
      console.log(error_);
      return;
    }

    let savedCities = result_ ? JSON.parse(result_) : [];

    // set state with available cities
    this.setState(prevState => {
      let availableCities = [];

      // loop through all potential cities
      City.allCities.forEach(potentialCity => {
        console.log("potential city", potentialCity);

        // check if potential city is already saved
        if (savedCities.find(savedCity => savedCity.id === potentialCity.id)) {
          console.log("potential city is already a saved city", potentialCity);
          return;
        }

        // otherwise, add to available cities
        availableCities.push(potentialCity);
      });

      // set state
      console.log("setting state. available cities:", availableCities);
      return { availableCities };
    });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  addCity(city) {
    // get current saved cities
    AsyncStorage.getItem("savedCities", (error_, result_, string) => {
      // check for error
      if (error_) {
        console.error(error_);
        return;
      }

      // get existing saved cities
      let savedCities = result_ ? JSON.parse(result_) : [];

      // add city
      savedCities.push(city);

      // set saved cities
      AsyncStorage.setItem(
        "savedCities",
        JSON.stringify(savedCities),
        error_ => {
          if (error_) {
            console.log(error_);
            return;
          }
          this.didAddCity(); //.bind(this)();
        }
      );
    });
  }

  didAddCity() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.topRow}>
          {/* back button */}
          <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
            <Image source={require("./images/back.png")} style={styles.back} />
          </TouchableWithoutFeedback>
        </View>
        <AddCityList
          data={this.state.availableCities}
          addCity={this.addCity.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

export default AddCity;

class AddCityList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={({ item, index }) => {
            // console.log("item", item);
            return <AddCityListItem city={item} addCity={this.props.addCity} />;
          }}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }
}

class AddCityListItem extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.addCity(this.props.city)}
      >
        <View style={styles.cityListItem}>
          <Text style={styles.listItem}>{this.props.city.name}</Text>
          <Plus />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

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
    justifyContent: "flex-start",
  },

  back: {
    width: 36,
    height: 36,
  },

  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: "center",
  },
  cityListItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 325,
    height: 84,
    marginBottom: 12,
    padding: 12,
  },
  listItem: {
    fontSize: 20,
  },
});

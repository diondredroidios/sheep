import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import ForecastListItem from "./ForecastListItem";

class ForecastList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item, index, separators }) => (
          <ForecastListItem data={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatlist}
        // style={{ backgroundColor: "#ddd", height: this.props.data.count * 36 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatlist: {
    // backgroundColor: "#fefefe",
  },
});

export default ForecastList;

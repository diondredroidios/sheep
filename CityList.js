import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import CityListItem from "./CityListItem";

class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item, index, separators }) => (
          <CityListItem city={item} onPress={this.props.onPressCity} />
        )}
        keyExtractor={(item, index) => String(item.id)}
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

export default CityList;

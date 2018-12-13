import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

class Plus extends Component {
  state = {};
  render() {
    return <Text style={styles.plusButton}>+</Text>;
  }
}

const styles = StyleSheet.create({
  plusButton: {
    width: 48,
    height: 48,
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 48,
  },
});

export default Plus;

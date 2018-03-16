import React, { Component } from "react";

import { View, Text } from "react-native";
import Colors from "../types/Colors";

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.primary3 }}>
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Text style={{ color: "#ccc" }}>Home Screen</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

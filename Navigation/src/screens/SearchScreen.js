import React, { Component } from "react";

import { View, Text } from "react-native";
import Colors from "../components/Colors";

class SearchScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.primary3 }}>
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Text style={{ color: "#ccc" }}>Search Screen</Text>
        </View>
      </View>
    );
  }
}

export default SearchScreen;

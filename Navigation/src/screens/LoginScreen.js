import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Button, Icon, SocialIcon } from "react-native-elements";

import {
  InputGroup,
  Spacer,
  HorizontalSpacer,
  Spinner
} from "../components";
import Colors from "../components/Colors";

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Log in",
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.headerColor,
      elevation: null
    },
    headerTitleStyle: {
      fontSize: 14,
      fontWeight: "bold"
    }
  };

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
        onPress={this.handleLoginSubmit}
        title="LOG IN"
        textStyle={{
          fontSize: 13,
          fontWeight: "bold"
        }}
        buttonStyle={styles.signUpBtn}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.formSection}>
          <View style={styles.formSectionInner}>
            <View style={styles.loginContainer}>
              <InputGroup
                iconName="user-o"
                placeholder="Username"
                value={this.state.form.username}
                onChangeText={value => this.updateForm("username", value)}
              />
              <Spacer />
              <InputGroup
                secureTextEntry
                iconName="lock"
                placeholder="Password"
                value={this.state.form.password}
                onChangeText={value => this.updateForm("password", value)}
              />
              <View style={{ paddingLeft: 35, paddingRight: 35 }}>
                {this.renderButton()}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: null,
        password: null
      }
    };

    this.updateForm = this.updateForm.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit() {
    let username = this.state.username;
    let password = this.state.password;
    this.props.loginUser(username, password);
  }

  updateForm(field, value) {
    this.setState({ [`${field}`]: value });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary3
  },
  headerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  formSection: {
    flex: 2,
    padding: 10
  },
  formSectionInner: {
    padding: 20
  },
  loginContainer: {},
  loginSubmitBtn: {
    marginTop: 15,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.sunsetOrange
  },
  signUpBtn: {
    marginTop: 15,
    height: 38,
    borderRadius: 30,
    backgroundColor: "#02b875"
  },
  faceBtn: {
    marginTop: 15,
    height: 38,
    borderRadius: 30,
    backgroundColor: Colors.faceBlue
  },
  appTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    fontStyle: "italic"
  }
});

export default LoginScreen

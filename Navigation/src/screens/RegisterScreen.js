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
import { NavigationActions } from "react-navigation";

import { InputGroup, Spacer, HorizontalSpacer, Spinner } from "../components";
import Colors from "../components/Colors";
import { StorageHelper } from "../helpers/StorageHelper";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false
    };

    this.updateForm = this.updateForm.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  static navigationOptions = {
    title: "Create Account",
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.headerColor,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      fontSize: 14,
      fontWeight: "bold"
    }
  };

  renderButton() {
    console.log("PROPS", this.props);
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
        onPress={this.handleLoginSubmit}
        title="Sign Up"
        textStyle={{
          fontSize: 12,
          fontWeight: "bold"
        }}
        buttonStyle={styles.signUpBtn}
      />
    );
  }

  tryGetToken(username, password) {
    this.setState({ loading: true });
    return fetch("http://httplive.netcorestack.com/api/authorize/mobiletoken", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loading: false });

        var result = responseJson.result;
        StorageHelper.onSignIn(result.token);

        const { navigation } = this.props;

        return navigation.navigate("DrawerNav", { avatar: result.avatar });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error(error);
      });
  }

  loginUser(username, password) {
    this.tryGetToken(username, password);
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
                onChangeText={value => this.updateForm("username", value)}
              />
              <Spacer />
              <InputGroup
                iconName="envelope"
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={value => this.updateForm("email", value)}
              />
              <Spacer />
              <InputGroup
                secureTextEntry
                iconName="lock"
                placeholder="Password"
                onChangeText={value => this.updateForm("password", value)}
              />
              <Spacer />
              <InputGroup
                secureTextEntry
                iconName="lock"
                placeholder="Password Confirm"
                onChangeText={value =>
                  this.updateForm("passwordConfirm", value)
                }
              />
              <View style={{ flex: 1, paddingLeft: 35, paddingRight: 35 }}>
                {this.renderButton()}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  handleLoginSubmit() {
    let username = this.state.username;
    let password = this.state.password;
    this.loginUser(username, password);
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
    borderRadius: 20,
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

export default RegisterScreen;

import { AsyncStorage } from "react-native";
export var StorageHelper;
(function(StorageHelper) {
  const TOKEN_KEY = "TOKEN_KEY";
  function onSignIn(token) {
    return AsyncStorage.setItem(TOKEN_KEY, token);
  }
  StorageHelper.onSignIn = onSignIn;
  function onSignOut() {
    return AsyncStorage.removeItem(TOKEN_KEY);
  }
  StorageHelper.onSignOut = onSignOut;
  function isSignedIn() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(TOKEN_KEY)
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  }
  StorageHelper.isSignedIn = isSignedIn;
})(StorageHelper || (StorageHelper = {}));

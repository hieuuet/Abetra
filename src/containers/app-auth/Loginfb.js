import { Alert } from "react-native";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import store from "../../store";
/**
 * Login with FB
 */

const fbGraphRequest = async (fields, callback) => {
  const accessData = await AccessToken.getCurrentAccessToken();
  // Create a graph request asking for user information
  const infoRequest = new GraphRequest(
    "/me",
    {
      accessToken: accessData.accessToken,
      parameters: {
        fields: {
          string: fields
        }
      }
    },
    callback
  );
  // Execute the graph request created above
  return new GraphRequestManager().addRequest(infoRequest).start();
};
export const facebookLogin = async () => {
  // native_only config will fail in the case that the user has
  // not installed in his device the Facebook app. In this case we
  // need to go for webview.
  let result;
  try {
    LoginManager.setLoginBehavior("native");
    result = await LoginManager.logInWithReadPermissions([
      "public_profile",
      "email"
    ]);
  } catch (nativeError) {
    try {
      LoginManager.setLoginBehavior("web");
      result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);
    } catch (webError) {
      // show error message to the user if none of the FB screens
      store.dispatch({
        type: "SHOW_ALERT",
        payload: {
          // id: randomString(10),
          content: "Login Facebook error"
        }
      });

      return undefined;
    }
  }
  // handle the case that users clicks cancel button in Login view
  if (result.isCancelled) {
    return undefined;
  }
  // Create a graph request asking for user information
  return new Promise((resolve, reject) => {
    fbGraphRequest(
      "email,name,first_name,middle_name,last_name,picture.type(large)",
      (error, result) => {
        if (error) {
          store.dispatch({
            type: "SHOW_ALERT",
            payload: {
              // id: randomString(10),
              content: "Can't get data from Facebook"
            }
          });

          reject(undefined);
        } else {
          resolve({
            fullName: result.name,
            urlImg: result.picture.data.url,
            email: result.email,
            id: result.id
          });
        }
      }
    );
  });
};

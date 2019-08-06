import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import { AuthSession } from "expo";
import jwtDecode from "jwt-decode";

const auth0ClientId = "fTnv2FOpy7TV16I00U5KF3On5slIbYBy";
const auth0Domain = "https://heatseeker.auth0.com";

function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

class Login extends Component {
  state = {
    name: null,
    user_id: null
  };

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    // console.log(`Redirect URL: ${redirectUrl}`);

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid profile", // retrieve the user's profile
      nonce: "nonce" // ideally, this will be a random value
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log("Authentication response", response);

    if (response.type === "success") {
      this.handleResponse(response.params);
    }
  };

  handleResponse = response => {
    if (response.error) {
      Alert(
        "Authentication error",
        response.error_description || "something went wrong"
      );
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    const { name, sub } = decoded;
    this.props.setLoginResponseToState(name, sub);
    this.setState({ name, user_id: sub });
  };

  render() {
    const styles = StyleSheet.create({
      login: {
        // width: "20%"
      }
    });

    const { name } = this.state;

    return (
      <View style={styles.login}>
        {name ? (
          <>
            <Button
              title="Logout"
              style={styles.loginButton}
              onPress={() => this.setState({ name: null, user_id: null })}
            />
          </>
        ) : (
          <Button
            title="Login"
            style={styles.loginButton}
            onPress={this.login}
          />
        )}
      </View>
    );
  }
}

export default Login;

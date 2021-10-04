import "./App.css";
import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import Keycloak from "keycloak-js";

import Home from "./page/Home";
import {getCookie, setCookie} from "./utils/cookie";

function App() {
  const keycloak = Keycloak("/keycloak.json");

  const handleReceivingTokens = (tokens) => {
    setCookie("accessToken", tokens.token);
    setCookie("refreshToken", tokens.refreshToken);
  };

  const refreshToken = getCookie("refreshToken");

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{onLoad: "check-sso", refreshToken}}
      LoadingComponent={<h1>Loading...</h1>}
      onTokens={handleReceivingTokens}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <h1>NOT FOUND</h1>
            <Link  to="/app2">go app2</Link>
          </Route>
          <Route exact path="/app2">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;

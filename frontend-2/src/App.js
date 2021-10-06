import "./App.css";
import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import Keycloak from "keycloak-js";

import Home from "./page/Home";
import {getCookie, setCookie} from "./utils/cookie";
import { api } from "./api";

function App() {
  const keycloak = Keycloak("/keycloak.json");

  const handleReceivingTokens = (tokens) => {
    api.defaults.headers.common.Authorization = `Bearer ${tokens.token}`;

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
            <h1>NOT FOUND that url</h1>
            <Link to="/dev">go Home</Link>
          </Route>
          <Route exact path="/dev">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;

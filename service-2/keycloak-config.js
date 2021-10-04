const Keycloak = require("keycloak-connect");
const session = require("express-session");

const keycloakConfig = {
  "realm": "myRealm",
  "auth-server-url": "http://localhost:8080/auth/",
  "ssl-required": "none",
  "resource": "service1",
  "verify-token-audience": true,
  "credentials": {
    "secret": "9212a7e9-2c0b-4f0c-a0cf-0b1e0a1b946c"
  },
  "confidential-port": 0,
  "public-key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgMva/lHDHBl4Xmgz1QnNbzIX6A2zMy5C9QH9aLYZqe+Z0TZJXhACjUhoJD1GV2b2xgBRjdEdJ4ait5rwbtsgcQ3EP/enqPwRol5XEAV72KLd+ObGSjrSgDnyjoweUZvS/PVWMXi7l9oyB5te8+hX8AAyymiBd7+ZIREgn6638/eHXXZgMkrSH10P5/UCXWjK1D/xVSt+eSzLRebe1qEFvxmX1OSH9ypeHfopU5f0ovByZ1Jzz1F8tDd9lQwC5+X/i+lNq3coAag1xVT0dZybSd3twtQn833b1mgb4jF4Lqdtq2DbYKzYYJNbtOpfwHa/A1QragOFCX3igSF0NNk9eQIDAQAB",
  "policy-enforcer": {
    "path-cache": {
      "lifespan": 60000,
      "max-entries": 1000,
    },
  }
}

let keycloak;

const initKeycloak = () => {
  if (keycloak) {
    console.log("returning existing Keycloak");
    return keycloak;
  }
  console.log("Initiating Keycloak....");
  var memoryStore = new session.MemoryStore();
  keycloak = new Keycloak(
    {
      secret: "this is secret",
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    },
    keycloakConfig
  );
  console.log("created keycloak Successfully");
  return keycloak;
};

module.exports = {
  initKeycloak,
};

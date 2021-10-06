const Keycloak = require("keycloak-connect-cache");

const keycloakConfig = {
  realm: "myRealm",
  "auth-server-url": "http://localhost:8080/auth/",
  "ssl-required": "none",
  resource: "service1",
  "verify-token-audience": true,
  credentials: {
    secret: "4b45de4b-e45b-4807-b717-8fa5c66e0d4e",
  },
  "confidential-port": 0,
  "policy-enforcer": {
    "path-cache": {
      lifespan: 300,
      "max-entries": 1000,
    },
  },
};

// const keycloakConfig = {
//   "realm": "vbee-holding",
//   "auth-server-url": "https://accounts.iristech.club/auth/",
//   "ssl-required": "none",
//   "resource": "dcm-backend",
//   "verify-token-audience": true,
//   "credentials": {
//     "secret": "81b05990-0c8d-4b03-a393-3c4f644a7320"
//   },
//   "confidential-port": 0,
//   "policy-enforcer": {}
// }

let keycloak;

const initKeycloak = (memoryStore) => {
  if (keycloak) {
    console.log("returning existing Keycloak");
    return keycloak;
  }
  console.log("Initiating Keycloak....");
  keycloak = new Keycloak({}, keycloakConfig);
  console.log("created keycloak Successfully");
  return keycloak;
};

module.exports = {
  initKeycloak,
};

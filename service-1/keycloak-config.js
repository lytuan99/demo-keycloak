const Keycloak = require("keycloak-connect-cache");

const keycloakConfig = {
  "realm": "myRealm",
  "auth-server-url": "http://localhost:8080/auth/",
  "ssl-required": "external",
  "resource": "service1",
  "verify-token-audience": true,
  "credentials": {
    "secret": "4b45de4b-e45b-4807-b717-8fa5c66e0d4e"
  },
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  "policy-enforcer": {}
}

// const keycloakConfig = {
//   "realm": "vbee-holding",
//   "auth-server-url": "https://accounts.iristech.club/auth/",
//   "ssl-required": "none",
//   "resource": "dcm-admin-base",
//   "verify-token-audience": true,
//   "credentials": {
//     "secret": "3f15b88e-e7a0-4f6f-8dee-e096aef95947"
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

const {initKeycloak} = require("./keycloak-config");

const enforcerCache = (permissions, config) => {
  const keycloak = initKeycloak();
  return function (req, res, next) {
    console.log(req);
    console.log(" :req cache");
    return keycloak.enforcer(permissions, config);
  };
};

module.exports = {
  enforcerCache,
};

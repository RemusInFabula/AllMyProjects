import Keycloak from "keycloak-js";

const keycloackConfig = {
  url: "https://keycloak.staging.e-auth.cloud",
  realm: "e-commerce-test",
  clientId: "ngecommerce",
};

const keycloakInstance: Keycloak = new Keycloak(keycloackConfig);


const initKeycloak = () => {
  return keycloakInstance.init({
    onLoad: "login-required",
    checkLoginIframe: false,
  });
};

const getKeycloak = () => keycloakInstance;

const tokenParsed = () => keycloakInstance.tokenParsed;

const logout = () => keycloakInstance.logout();

export const KeycloakService = {
    initKeycloak,
    getKeycloak,
    tokenParsed,
    logout
}

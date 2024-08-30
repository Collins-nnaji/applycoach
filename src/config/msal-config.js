export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://${process.env.REACT_APP_B2C_TENANT_NAME}.b2clogin.com/${process.env.REACT_APP_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.REACT_APP_B2C_POLICY}`,
    knownAuthorities: [`${process.env.REACT_APP_B2C_TENANT_NAME}.b2clogin.com`],
    redirectUri: "https://credolay.com/auth",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "offline_access",
    "https://graph.microsoft.com/User.Read",
    "https://graph.microsoft.com/User.ReadWrite"
  ]
};
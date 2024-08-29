export const msalConfig = {
  auth: {
    clientId: "524dd1a6-c123-4ce9-aaf8-89149eefd9fb",
    authority: "https://credolay.b2clogin.com/credolay.onmicrosoft.com/B2C_1_signupsignin",
    knownAuthorities: ["credolay.b2clogin.com"],
    redirectUri: "https://credolay.com/auth",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "offline_access", "https://credolay.onmicrosoft.com/524dd1a6-c123-4ce9-aaf8-89149eefd9fb/profile.read"]
};

// Add this new configuration for sign-up
export const signUpRequest = {
  ...loginRequest,
  prompt: 'create',
};
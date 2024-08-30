import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://${process.env.REACT_APP_B2C_TENANT_NAME}.b2clogin.com/${process.env.REACT_APP_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.REACT_APP_B2C_POLICY}`,
    knownAuthorities: [`${process.env.REACT_APP_B2C_TENANT_NAME}.b2clogin.com`],
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"]
};

export const b2cPolicies = {
  names: {
    signUpSignIn: process.env.REACT_APP_B2C_POLICY,
    editProfile: process.env.REACT_APP_B2C_EDIT_PROFILE_POLICY
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${process.env.REACT_APP_B2C_TENANT_NAME}.b2clogin.com/${process.env.REACT_APP_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.REACT_APP_B2C_POLICY}`
    },
    editProfile: {
      authority: `https://${process.env.REACT_APP_B2C_TENANT_NAME}.b2clogin.com/${process.env.REACT_APP_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.REACT_APP_B2C_EDIT_PROFILE_POLICY}`
    }
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
import Userfront from "@userfront/toolkit/react";

export const apiUrl = process.env.REACT_APP_API_URL;
export const userApiUrl = `https://api.userfront.com/v0/users/${Userfront.user.userUuid}`;

export const defaultHeaders = {
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${process.env.REACT_APP_USERFRONT_KEY}`,
  },
};

export const ngrokHeaders = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    Mode: process.env.REACT_APP_MODE,
    "Content-Type": "application/json",
  },
};

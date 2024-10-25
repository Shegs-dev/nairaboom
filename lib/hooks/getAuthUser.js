import { AUTH_API_ROUTES } from "../../utils/routes";
import axios from "axios";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

export function storeTokenInLocalStorage(token) {
  sessionStorage.setItem("token", token);
}
export function getTokenFromLocalStorage() {
  return sessionStorage.getItem("token");
}
export function storeTokenInLocalStorage2(token) {
  sessionStorage.setItem("token2", token);
}
export function getTokenFromLocalStorage2() {
  return sessionStorage.getItem("token2");
}

export function removeTokenFromLocalStorage() {
  return sessionStorage.removeItem("token");
}
export function removeTokenFromLocalStorage2() {
  return sessionStorage.removeItem("token2");
}

export function recoverFromLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_token");
  } else {
    return "{}";
  }
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };

  try {
    const token = getTokenFromLocalStorage2();

    if (!token) {
      return defaultReturnObject;
    }

    const response = await axios({
      method: "post",
      url: `${BASE_URL}/api/auth_remember`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
       
      },
      data: { token },
    });
    if (response?.data.message === "Token no longer valid, login afresh") {
      return defaultReturnObject
    }
    const { status: authenticated, payload: user } = response.data;
    const returnObject = { authenticated, user };
    return authenticated ? returnObject : false;
  } catch (err) {
    return defaultReturnObject;
  }
}

export async function authCheck() {
  const defaultReturnObject = { authenticated: false, user: null };

  try {
    const token = getTokenFromLocalStorage();

    if (!token) {
      return defaultReturnObject;
    }

    const response = await axios({
      method: "post",
      url: `${BASE_URL}/api/auth_remember`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
       
      },
      data: { token },
    });

    const { status: authenticated, payload: user } = response.data;
    const returnObject = { authenticated, user };
    return authenticated ? returnObject : false;
  } catch (err) {
    return defaultReturnObject;
  }
}

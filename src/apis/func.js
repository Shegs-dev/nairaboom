import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";

export const signIn = async (
  signInformData
) => {
  try {
    const signinconfig = {
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/auth`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
      },
      data: signInformData,
    };

    return response;
  } catch (error) {
    return error;
  }
};

export const UserReferralStats = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/user_referral_stats`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const sellEligibility = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/sell_over_eligibility`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const sellAcceptance = async (bearerToken) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/sell_over_acceptance`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getLatestCashbackTime = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/lastest_cashback_time`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getBonusWallet = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/bonus_wallet`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getWalletBalance = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/wallet_balance`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getRequestHistory = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/request_history`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getWheelTracker = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/wheel_tracker`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getBoomCode = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/boom_code`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getAppSettings = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/app_settings`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const monetizationAgreement = async (bearerToken) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/monetization_agreement`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getMonetizationEligibility = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/monetization_eligibility`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const playFastestFinger = async (bearerToken, fastFinger) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/fastest_finger_play`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        code_word: fastFinger,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getThreeSureCashOutStatus = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/three_sure_cashout_status`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/profile`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
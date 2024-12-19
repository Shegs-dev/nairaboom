import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";

export const signInCall = async (
  signInformData
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/auth`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
      },
      data: signInformData,
    });

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

export const getProfileRedirect = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/profile`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      redirect: "follow",
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const registerCustomer = async (requestData) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/signup`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
      },
      data: {
        requestData: requestData,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const registerAgent = async (
  RegformData
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/signup`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
      },
      data: RegformData,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const validateGame = async (bearerToken, game_ref) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/validate_game`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        game_ref: game_ref,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const updateMyPlayStake = async (bearerToken, game_ref, colour_scheme, boom_box_number, cashback_number) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/update_play_stake`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "text/plain;charset=utf-8",
      },
      data: {
        game_ref: game_ref,
        colour_scheme: colour_scheme,
        boom_box_number: boom_box_number,
        cashback_number: cashback_number,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const autoGenerateNumbers = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/auto_generated_numbers`,
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

export const getBankLists = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/bank_lists?start=0&len=209&paging=1`,
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

export const playMyStake = async (bearerToken, cashBack) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/play_stake`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: cashBack,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const playAgentStake = async (bearerToken, cashBack) => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/agent/play_stake`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: cashBack,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getNotifications = async (bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/notification?start=0&len=10&paging=1`,
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

export const getDailyWinners = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/list_daily_winners?start=0&len=10&paging=1`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const sellDecline = async () => {
  try {
    const response = await axios({
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/sell_over_decline`,
      headers: {
        "X-APP-KEY": AUTH_API_ROUTES.PRODUCTION_X_APP_KEY,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
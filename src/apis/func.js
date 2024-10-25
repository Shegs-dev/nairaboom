import axios from "axios";
import { AUTH_API_ROUTES } from "@/utils/routes";

export const signIn = async (
  signInformData
) => {
  try {
    const signinconfig = {
      method: "post",
      url: `${AUTH_API_ROUTES.PRODUCTION_BASE_URL}/api/auth`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
      },
      data: signInformData,
    };

    return response;
  } catch (error) {
    return error;
  }
};
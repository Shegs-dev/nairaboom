// RouteGuard.js

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthenticatedUser } from "../../lib/hooks/getAuthUser";

const protectedRoutes = [
  "",
  "/",
  "/auth",
  "/about",
  "/cashback-atm",
  "/cashout",
  "/confirm-ticket",
  "/contact",
  "/daily-results",
  "/daily-winners",
  "/faq",
  "/forgot_password",
  "/guest",
  "/how-to-play",
  "/learn-about-clock",
  "/otp_confirm",
  "/private_policy",
  "/reset_password",
  "/signup_confirm",
  "/terms_conditions",
  "/auth/login",
  "/auth/agent",
  "/auth/signup/agent",
  "/auth/signup/customer",
  "/modalities",
  "/winning",
  "/privacy_policy",
  "/share",
  "/gamble_responsibly",
]; // Add the paths that require authentication
const RouteGuard = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const checkAuthentication = async () => {
      const { authenticated } = await getAuthenticatedUser();
      if (!authenticated) {
        // Redirect to login page or handle unauthorized access
        router.push("/auth/login");
      }
    };

    if (!protectedRoutes.includes(router.pathname)) {
      checkAuthentication();
    }
  }, [router.pathname]);

  return <>{children}</>;
};

export default RouteGuard;

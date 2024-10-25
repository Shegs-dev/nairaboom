import { getAuthenticatedUser } from "../hooks/getAuthUser";
import Router from "next/router";

const redirectIfAuthenticated = async (user) => {
  const isUserAuthenticated = await getAuthenticatedUser();
  
  if (isUserAuthenticated?.authenticated) {
    if (user?.details?.user_type === "customer") {
      Router.push("/customer_dashboard");
    } else if (user?.details?.user_type === "agent") {
      Router.push("/agent_dashboard");
    }
  }
};

export default redirectIfAuthenticated;
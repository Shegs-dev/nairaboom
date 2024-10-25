import { getAuthenticatedUser } from "../hooks/getAuthUser";
import Router from "next/router";
import { useRouter } from "next/router";

const RedirectIfnotAuthenticated = async (user) => {
  const router = useRouter();
  const isUserAuthenticated = await getAuthenticatedUser();

  if (isUserAuthenticated?.authenticated) {
  } else {
    router.push("/auth?p=login");
  }
};

export default RedirectIfnotAuthenticated;



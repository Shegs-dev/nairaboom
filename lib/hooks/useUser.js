import { useState, useEffect } from "react";
import { getAuthenticatedUser } from "./getAuthUser";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUserDetails() {
      try {
        const { authenticated, user } = await getAuthenticatedUser();
        if (!user || !authenticated) {
          return;
        }
        setUser(user);
        setAuthenticated(authenticated);
      } catch (err) { 
        setError(err);
      }
    }
    getUserDetails();
  }, [error]);

  return { user, authenticated, error };
};

export default useUser;

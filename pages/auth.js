import { useRouter } from "next/router";
import { useEffect } from "react";

function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Get the "p" query parameter from the URL
    const { p } = router.query;

    // localhost:3000/auth?p=login
    if (p === "login") {
      // Redirect to the /login page
      router.push("/auth/login");
    } else if (p === "signupcustomer") {
      router.push("/auth/signup/customer");
      
    } else if( p === "agent"){
      router.push("/auth/signup/agent_");
    }
    else if( p === "customer"){
      router.push("/auth/customer");
    }
    else {
      // Handle other cases or show an error
      console.error('Invalid "p" parameter');
    }
  }, [router, router.query]);

  return null; // This component doesn't render anything
}

export default AuthRedirect;

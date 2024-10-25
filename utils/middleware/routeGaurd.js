import { useRouter } from "next/router";
import {
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import {
  ThreeDots,
} from "react-loading-icons";
import React from "react";
import { getAuthenticatedUser } from "../../lib/hooks/getAuthUser";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [url, seturl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publicurl, setpublicurl] = useState(false);

  const publicPath = [
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
    "/gamble_responsibly",
  ];

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      const url = router.pathname;
      seturl(router.pathname);

      if (publicPath.includes(router.pathname)) {
        setpublicurl(true);
      }
      const auth = await getAuthenticatedUser();
      if (auth.authenticated === true) {
        setAuthorized(auth.authenticated);
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    };
    func();
  }, [router.pathname]);

  const SessionValidationView = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 7200000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div style={{ height: "100vh", width: "100vw", position: "absolute" }}>
        {loading ? (
          <Box
            height={"100%"}
            width={"full"}
            display={"grid"}
            placeItems={"center"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ThreeDots stroke="#00A85A" width={30} height={30} />
            <Text
              textAlign="center"
              w="100%"
              fontSize={{ base: "0.75rem", md: "1.5xl" }}
              fontWeight={400}
            >
              <p>Validating your session.</p>
            </Text>
          </Box>
        ) : authorized ? null : publicPath.includes(
            url
          ) ? null : publicurl ? null : (
          <Box
            height={"full"}
            width={"full"}
            display={"grid"}
            placeItems={"center"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              justifyItems={"center"}
              gap={"1rem"}
            >
              <Image
                className="animate-pulse"
                src="/Unauthorized.gif"
                width={250}
                height={250}
                alt="Validating Session"
              />
              <Text
                textAlign="center"
                w="100%"
                fontSize={{ base: "0.75rem", md: "1.5xl" }}
                fontWeight={400}
              >
                Your session has expired, please login to continue
              </Text>

              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
                mb={"4"}
              >
                <Button
                  fontWeight={600}
                  fontSize=".8rem"
                  bgColor="nairagreen"
                  color="white"
                  borderRadius="3px"
                  transition={"all ease-in-out .4s"}
                  _hover={{}}
                  textAlign="center"
                  py={".8rem"}
                  w={{ md: "8.6rem", base: "full" }}
                  boxShadow={"inner"}
                  bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                  onClick={() => {
                    router.push("/auth?p=login");
                  }}
                >
                  Return to log in
                </Button>
              </Box>
              {/* <p className="text-xs">You will be redirected in a moment</p> */}
            </Box>
          </Box>
        )}
      </div>
    );
  };

  return (
    <>
        
        {authorized || publicPath.includes(url) || publicurl ? (
          children
        ) : router.pathname === "/" ? (
          children
        ) : (
        <SessionValidationView />
        )}
    </>
  );
};

export default RouteGuard;

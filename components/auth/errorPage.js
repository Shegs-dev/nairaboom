import {
  Box,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import PlayResponsibly from "../general/PlayResponsibly";

const ErrorPage = () => {

  return (
    <>
      <Head>
        <title>Nairaboom | Error</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-904C1779CP"
          strategy="afterInteractive"
        />
        <script strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-904C1779CP');
          `}
        </script>
      </Head>
      <Stack
        fontFamily="Inter"
        alignItems="center"
        pt={10}
        spacing={10}
        bgImage="/redesign/generalbackground.svg"
        bgPos="center"
        bgSize="cover"
        pos="relative"
      >
        <Stack
          w="100%"
          maxW="65rem"
          alignItems="center"
          spacing={10}
          pos="relative"
        >
          <HStack
            w="100%"
            justifyContent="center"
            pos="relative"
            pt={{ base: 10, md: 0 }}
          >
            <Image
              src="/redesign/logo.png"
              alt="Nairaboom logo"
              h="3rem"
              w="fit-content"
            />
          </HStack>
          <Text color="white" fontSize={"35px"} fontWeight={600}>
            Desktop version is not supported for this page. Kindly switch to a mobile device
          </Text>
          <Stack
            alignSelf={{ md: "flex-end" }}
            justifySelf={{ md: "flex-end" }}
            w={{ base: "xs", md: "md" }}
            spacing={8}
            alignItems="center"
          >
            <Box h={{base: "30rem", md: "40rem"}} />
            <Image
              w={{xs:"30rem", md:"48rem"}}
              src="/redesign/auth/loginbg.png"
              pos="absolute"
              aspectRatio={{base: 1, md: 0}}
              mr={{md: "2rem"}}
              bottom={{xs: "4.5rem", md: "0"}}
              left={{ base: "auto", md: -10 }}
              alt=""
            />
            <VStack
              w="100%"
              py={{ base: 4, md: 14 }}
              pos={{ base: "absolute", md: "relative" }}
              bottom={0}
              fontSize={{ base: "0.8rem", md: "1rem" }}
              background={{ base: "rgba( 255, 255, 255, 0.35 )", md: "none" }}
              boxShadow={{
                base: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                md: "none",
              }}
              backdropFilter={{ base: "blur( 12px )", md: "none" }}
              borderRadius={{
                base: "50% 50% 10% 10% / 40% 40% 0% 0%",
                md: "none",
              }}
            >
              <PlayResponsibly color="white" />
              <HStack>
                <Text
                  textAlign="center"
                  color="white"
                  maxW={{ base: "18rem", md: "23rem" }}
                >
                  Nairaboom is licensed and regulated by the National Lottery
                  Regulatory Commission (NLRC). { "" }License number 00000060
                </Text>
                <Image w="2rem" src="/redesign/nlrclogo.png" alt="" />
              </HStack>
            </VStack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ErrorPage;

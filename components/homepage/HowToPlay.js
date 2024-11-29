import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const HowToPlay = () => {
  return (
    <Flex
      justifyContent="center"
      pos="absolute"
      w="100%"
      top={{ xs: "-8.5rem", sm: "-13.5rem", md: "-13rem" }}
      pb="20rem"
      bgImage="/redesign/homepage/how-to-play-bg.png"
      bgPos="top"
      bgSize="100%"
      bgRepeat="no-repeat"
    >
      <VStack spacing={10} w="100%" maxW="75rem" px={5} py={10}>
        <Heading color="nairagreen" pos="relative">
          How to Play
        </Heading>
        <Flex
          wrap="wrap"
          justifyContent="center"
          rowGap={14}
          columnGap={5}
          pos="relative"
        >
          <Image
            src="/redesign/homepage/coin03.png"
            // src="/redesign/dashboard/coin01.png"
            pos="absolute"
            h={{ base: "8rem", md: "10rem" }}
            m="auto"
            top={0}
            bottom={{ base: "18rem", md: "-40rem" }}
            right={{ xs: "70%", md: "6rem" }}
            zIndex={0}
            alt={"coin"}
          />
          <Image
            src="/redesign/homepage/coin03.png"
            pos="absolute"
            h={{ base: "8rem", md: "10rem" }}
            m="auto"
            bottom={{ base: "8rem", md: "18.5rem" }}
            left={{ base: "10rem", md: "-60rem" }}
            right="0"
            zIndex={0}
            alt={"coin2"}
          />
          <Image
            pos="absolute"
            display={{ base: "flex", md: "none" }}
            src="/redesign/homepage/mobilepattern2.png"
            h={{ base: "18rem", md: "12rem", lg: "23rem" }}
            // marginTop={{ base: "auto", lg: "3rem" }}
            // bg={"red"}
            m="auto"
            right={{ base: "0rem", md: 0 }}
            bottom={{ base: "-13rem", lg: "0rem" }}
            alt={"mobilepattern"}
            zIndex={0}
            className="howtowinpattern"
          />
          {[
             {
              image: "/play-card-01.png",
              title: "1. Receive a Credit or Debit Alert",
              text: "Signup or Login to your Nairaboom game profile anytime you get a valid credit or debit alert.",
            },
            {
              image: "/play-card-03.png",
              title: "2. Fund Your Wallet",
              text: "Make your first wallet funding of ₦ 500 to receive ₦ 35,000 in your boom coins wallet to start your rollover journey to breakthrough.",
            },
            {
              image: "/play-card-02.png",
              title: "3. Play Game",
              text: `Enter your alert details to rollover & accumulate every valid credit or debit alert you receive into your boom coins wallet.`,
            },
            {
              image: "/play-card-05.png",
              title: "4. Spin To Cashout",
              text: "Spin the rolloverwheel and match the cashout keys or 3 Green balls to cashout your boom coins wallet instantly.",
            },
            {
              image: "/play-card-04.png",
              title: "5. Win The Jackpot",
              text: "Match all 4 Green balls when you Spin To Cashout and Win The Jackpot!!!",
            },
          ].map((item, index) => (
            <Stack
              key={index}
              pos="relative"
              py={5}
              px={{ base: 2, md: 5 }}
              w={{ base: "45%", md: "30%", lg: "20%" }}
              h={{ xs: "14rem", sm: "16.8rem", md: "18rem" }}
              // borderRadius={20}
              borderRadius={{ base: "2rem", md: "3rem" }}
              borderWidth={1}
              borderColor="white"
              boxShadow="4px -4px 30px -1px rgba(255,255,255,0.4) inset"
              background="radial-gradient(231% 135.8% at 0.9% 2.98%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)"
              backdropFilter="blur(21px)"
            >
              <Box
                bgImage="/redesign/homepage/play-card-bg.png"
                bgSize="cover"
                bgPos="center"
                pos="absolute"
                zIndex={30}
                top="-1.2rem"
                left="0"
                right="0"
                m="auto"
                w="fit-content"
                // bg={'red'}
                borderRadius={"full"}
                // borderRadius= {{base: "3rem", md: "3rem"}}
                // style={{borderRadius: '30px'}}
              >
                <Image
                  m={3}
                  w="1.75rem"
                  src={"/redesign/homepage/" + item.image}
                  alt=""
                />
              </Box>
              <Text
                pt={{ base: 4, md: 6 }}
                color="nairagreen"
                fontSize={{ xs: "0.7rem", sm: "0.9rem", md: "1.2rem" }}
                fontWeight={900}
              >
                {item.title}
              </Text>
              <Text
                color="white"
                // bg={"red"}
                fontSize={{ xs: "0.7rem", sm: "0.9rem", md: "1rem" }}
                fontWeight={{ base: 700 }}
              >
                {item.text}
              </Text>
            </Stack>
          ))}
        </Flex>
      </VStack>
    </Flex>
  );
};

export default HowToPlay;

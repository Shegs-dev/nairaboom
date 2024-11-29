import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import PlayResponsibly from "../general/PlayResponsibly";

const HowToPlay = () => {
    const router = useRouter();
    return ( 
      <Flex alignItems = "center"
        justifyContent = "center"
        fontFamily = "Inter"
        bg = "#002047" >
        <Stack w = "100%"
        alignItems = "center"
        pt = {
            { base: 5, md: 10 } }
        color = "white"
        spacing = { 5 } >
        <HStack w = "90%"
        maxW = "60rem"
        justifyContent = "center"
        pos = "relative" >
        <Box pos = "absolute"
        left = { 0 } >
        <BsChevronLeft size = { 20 }
        onClick = {
            () => router.back() }
        /> 
        </Box> 
        <Text fontSize = "1.5rem" > How To Cashout </Text> 
        </HStack> 
        <Heading fontSize = {
            { xs: "1.1rem", sm: "1.5rem", md: "2rem", lg: "3rem" } }
        fontWeight = {
            { base: 800, lg: 800 } }
        pt = {
            { base: 8, md: 0 } }
        textAlign = "center" >
        { /* Breakthrough With Your Alert */ }
        Rollover Your Alert 
        </Heading> 
        <Heading fontSize = {
            { xs: "0.8rem", sm: "1.1rem", md: "1.55rem", lg: "2rem" } }
        fontWeight = {
            { base: 700 } }
        textAlign = "center" >
        { /* Boom up to ₦30,000,000 Instant Jackpot */ }
        Up to ₦ 35, 000, 000 Instant Cashout 
        </Heading> 
        <HStack spacing = { 8 }
        color = "nairagreen"
        fontSize = {
            { xs: "1rem", sm: "1.2rem" } } >
        <Text fontWeight = { 700 }
        fontFamily = { "Inter" } > { /* Check-In */ }
        Rollover 
        </Text> 
        <Text fontWeight = { 700 }
        fontFamily = { "Inter" } >
        Accumulate 
        </Text> 
        <Text fontWeight = { 700 }
        fontFamily = { "Inter" } >
        Cashout 
        </Text> 
        </HStack> 
        <Button onClick = {
            () => router.push("/auth/signup/customer") }
        variant = "brand-solid"
        bg = "nairagreen" >
        SIGN UP 
        </Button> 
        <Flex wrap = "wrap"
        justifyContent = "center"
        rowGap = { 14 }
        columnGap = { 5 }
        pt = { 10 }
        px = { 4 }
        pos = "relative" >
        <Image
        // src="/redesign/dashboard/coin01.png"
        src = "/redesign/homepage/coin03.png"
        pos = "absolute"
        h = {
            { base: "8rem", md: "10rem" } }
        m = "auto"
        insetY = { 0 }
        right = {
            { xs: 0, md: "3rem" } }
        zIndex = { 0 }
        alt = { "coin" }
        /> 
        <Image src = "/redesign/dashboard/coin02.png"
        pos = "absolute"
        h = {
            { base: "8rem", md: "10rem" } }
        bottom = "-2rem"
        m = "auto"
        left = { 0 }
        right = {
            { base: "13rem", md: "25rem" } }
        zIndex = { 0 }
        alt = { "coin" }
        />

        {
            /* <Image
                         src="/redesign/homepage/coin03.png"
                        // src="/redesign/dashboard/coin01.png"
                        pos="absolute"
                        h={{ base: "8rem", md: "10rem" }}
                        m="auto"
                        top={0}
                        bottom={{ base: "18rem", md: "-40rem" }}
                        right={{ xs: "70%", md: "6rem" }}
                        zIndex={0}
                        alt={'coin'}
                      /> */
        } {
            [{
                    image: "/play-card-01.png",
                    title: "1. Receive a Credit or Debit Alert",
                    text: "Signup or Login to your Nairaboom game profile anytime you get a valid credit or debit alert.",
                },
                {
                    image: "/play-card-03.png",
                    title: "2. Fund Your Wallet",
                    text: "Make your first deposit of ₦500 & receive 35,000 Boom Coins.",
                },
                {
                    image: "/play-card-02.png",
                    title: "3. Play Game",
                    text: `Enter your alert details to rollover & accumulate every valid credit or debit alert you receive into Boom Coins.`,
                },
                {
                    image: "/play-card-05.png",
                    title: "4. Spin To Cashout",
                    text: "Spin the wheel and match the Cashout keys or 3 Green Balls to cashout your Boom Coins instantly.",
                },
                {
                    image: "/play-card-04.png",
                    title: "5. Win The Jackpot",
                    text: "Match all 4 Green balls when you Spin To Cashout and Win The Jackpot!!!",
                },
            ].map((item, index) => ( 
                <Stack key = { index }
                pos = "relative"
                py = { 5 }
                px = {
                    { base: 2, md: 5 } }
                w = {
                    { base: "45%", md: "30%", lg: "20%" } }
                h = {
                    { xs: "15rem", sm: "16rem", md: "initial" } }
                borderRadius = { 20 }
                borderWidth = { 1 }
                borderColor = "white"
                boxShadow = "4px -4px 30px -1px rgba(255,255,255,0.4) inset"
                background = "radial-gradient(231% 135.8% at 0.9% 2.98%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)"
                backdropFilter = "blur(21px)" >
                <Box bgImage = "/redesign/homepage/play-card-bg.png"
                bgSize = "cover"
                bgPos = "center"
                pos = "absolute"
                zIndex = { 30 }
                top = "-1.2rem"
                left = "0"
                right = "0"
                m = "auto"
                w = "fit-content"
                borderRadius = { "full" } >
                <Image m = { 3 }
                w = "1.75rem"
                src = { "/redesign/homepage/" + item.image }
                alt = "" />
                </Box> 
                <Text pt = {
                    { base: 2, md: 4 } }
                color = "nairagreen"
                fontSize = {
                    { xs: "0.7em", sm: "1rem", md: "1.5rem" } }
                fontWeight = { 600 } >
                { item.title } 
                </Text> 
                <Text color = "white"
                fontSize = {
                    { xs: "0.7em", sm: "0.9rem", md: "1rem" } }
                fontWeight = {
                    { md: 600 } } >
                { item.text } 
                </Text> 
                </Stack>
            ))
        } 
        </Flex>

        {
            /* <Button mt={"2rem"} variant="link" color="white" textDecor="underline">
                      Learn More
                    </Button> */
        } 
        <Link href = "/"
        passHref >
        <Button as = "a"
        mt = "2rem"
        variant = "link"
        color = "white"
        textDecoration = "underline" >
        Learn More 
        </Button> 
        </Link> 
        <HStack>
        <Text fontWeight = { 700 }
        color = { "nairagreen" }
        fontFamily = { "Inter" } >
        Ready to Boom ?
        </Text> 
        <Button onClick = {
            () => router.push("/auth/signup/customer") }
        variant = "brand-solid"
        bg = "nairagreen"
        fontWeight = { 900 }
        h = {
            { base: "2.5rem", md: "2.5rem" } } >
        SIGN UP 
        </Button> 
        </HStack> 
        <Box pos = "relative"
        mb = "0" >
        <VStack pos = "absolute"
        bottom = {
            { xs: 0, md: "5" } }
        left = "0"
        right = "0"
        m = "auto"
        background = {
            { base: "rgba( 255, 255, 255, 0.35 )", md: "none" } }
        boxShadow = {
            {
                base: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                md: "none",
            }
        }
        backdropFilter = {
            { base: "blur( 12px )", md: "none" } }
        borderRadius = {
            {
                base: "50% 50% 10% 10% / 40% 40% 0% 0%",
                md: "none",
            }
        }
        fontSize = {
            { base: "0.75rem", md: "1rem" } }
        py = {
            { base: 5, md: 0 } }
        zIndex = { 4 } >
        <PlayResponsibly color = "white" / >
        <HStack pb = {
            { md: 8 } } >
        <Text textAlign = "center"
        color = "white"
        maxW = {
            { base: "18rem", md: "23rem" } } >
        Nairaboom is licensed and regulated by the National Lottery Regulatory Commission(NLRC). { "" }
        License number 00000060 
        </Text> 
        <Image w = "2rem"
        src = "/redesign/nlrclogo.png"
        alt = "" />
        </HStack> 
        </VStack> 
        <Box position = { "relative" }
        bottom = {
            { xs: "4rem", md: "0" } }
        mt = {
            { xs: "2rem", md: 0 } } >
        <Image
        // bg="red"
        maxW = {
            { base: "100%", md: "35rem" } }
        src = "/redesign/dashboard/how-to-play.png"
        alt = "how to play" />
        </Box>
        </Box> 
        </Stack> 
        </Flex>
    );
};

export default HowToPlay;
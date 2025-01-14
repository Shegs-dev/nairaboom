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
        Swap Your Bank Alert 
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
        Swap 
        </Text>
        <Text fontWeight = { 700 }
        fontFamily = { "Inter" } >
        Sell 
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
            
        } 
        </Flex>

        <Text
          w="90%"
          margin="auto"
          fontFamily={"poppins"}
          fontSize={{base: '1rem', md: '1.3rem'}}
          pb="2rem"
          lineHeight={"2rem"}
          color={"white"}
        >
          <p><b><center>HOW TO ROLLOVER, SWAP, SELL & CASHOUT WITH YOUR BANK ALERTS</center></b></p>
          Welcome to NairaBoom &#127881;, a platform that transforms your bank alerts into exciting earnings, 
          cashouts and guaranteed payouts. Our platform makes it easy and fun to swap every credit and debit 
          alert notification that you receive from your bank into value.
          <Text>
          Below are the various ways you can earn on NairaBoom: 
          </Text>
          <br/>
          <Text fontWeight={700}>
          I. SWAP YOUR BANK ALERT
          </Text>
          <br/>
          You can turn your everyday bank alerts into value by swapping them on NairaBoom.<br/>
          <br/>
          <b>How To Swap Your Alert:</b>
          <br/> <br/> 
          1. <b>Sign Up:</b> Create your account. <br/>
          2. <b>Log In:</b> Access your dashboard by logging in.<br/>
          3. <b>Make a Deposit:</b> Fund your wallet with the minimum deposit. <br/>
          4. <b>Swap Your Alert:</b> Click any of the “SWAP NOW” or “PLAY NOW” options on your dashboard 
          &#127918; , input the details of any recent bank alert (credit or debit alert) you received and 
          tap on the "Rollover to Swap" button for a chance to cashout 🎰!
          <br/>
          <br/>
          <b>How to Cashout from Swapping your Bank Alerts:</b>
          <br/> <br/> 
          1. <b>Cashout Keys:</b> Match the Cashout Keys 🔑 in the exact order as seen on your dashboard 
          in one spin cycle to win a percentage of your Boom Coin Tokens (BCT) as cash. <br/>
          2. <b>3 Green Balls :</b> Win your accumulated Boom Coin Tokens (BCT) as cash when you get 
          3 green balls in one spin cycle 💵.<br/>
          3. <b>4 Green Balls :</b> Hit the Jackpot 🎉 when you get 4 green balls in one spin cycle during 
          the jackpot week!
          <br/><br/>
          <Text fontWeight={700}>
            II. 3 SURE CASHOUT
          </Text>
          <br/> 
          Boost your cashout chances with 3 Sure Cashout which offers a cumulative win across three consecutive 
          rollovers (alert swaps), ensuring higher odds of cashing out💸 !
          <br/>
          <br />
          <b>How It Works:</b>
          <br/><br/>
          <b>Rollover 1:</b> Swap an alert and if you get 1 or 2 green balls in one spin cycle, you receive the 
          first tick ✅in your 3 Sure Cashout Tracker.
          <br/><br/>
          <b>Rollover 2:</b> Swap an alert the second time and if you get 1 or 2 green balls in one spin cycle, 
          you receive the second tick ✅in your 3 Sure Cashout Tracker.
          <br/><br/>
          <b>Rollover 3:</b> Swap an alert for the third time and if you get 1 or 2 green balls in one spin cycle, 
          you receive the third tick ✅in your 3 Sure Cashout Tracker.
          <br/><br/>
          <b>Cashout:</b> Once you complete three (3) green ticks ✅✅✅ in 3 consecutive rollovers (alert swaps), 
          you win a cumulative percentage amount from the 3 rollovers (alert swaps) you just did 💸.
          <br/><br/>
          <b>Note:</b> If you do not get a Green Ball in Rollover 2, you immediately get another chance to perform 
          Rollover 2 again before proceeding to Rollover 3.
          <br/>
        </Text>

        <Text
          w="90%"
          margin="auto"
          fontFamily={"poppins"}
          fontSize={{base: '1rem', md: '1.3rem'}}
          pb="2rem"
          lineHeight={"2rem"}
          color={"white"}
        >
          <Text fontWeight={700}>III. FASTEST FINGERS</Text>
          <br/>
          This is a gameplay where if you are the quickest to type in the Money Word in the Fastest Fingers field, you win a quick 
          cash reward.<br/><br/>
          <Text fontWeight={700}>How to Play:</Text>
          <br/> 
          1. <b>Word Announcement:</b> Watch out for the Money Word announcement on the NairaBoom Telegram Channel or 
          any of the participating social media handles or mass media stations (as pre-announced). <br/><br/> 
          2. <b>Wait for Time Slot:</b> Be ready during the specified time slot pre-announced.<br/><br/> 
          3. <b>Enter the Money Word:</b> Quickly type the Money Word into the Fastest Fingers field. The winning 
          time could be any moment within the time slot.
          <br/><br/> 
          4. <b>Winner Selection:</b> The fastest entry at the exact winning moment wins the quick cash for that time slot!<br/>
          <br/>
          <Text fontWeight={700}>IV. MONETIZATION 💸</Text>
          <br/> 
          Unlock the power of NairaBoom's Monetization Program and earn lifetime commissions by growing the NairaBoom community.
          <br/><br/>
          <Text fontWeight={700}>How It Works:</Text>
          <br/> 
          1. <b>Grow Your Trybe:</b> Share your unique referral link and earn ₦100.000 for every successful referral when 
          they complete their first rollover (alert swap). Once you hit the required referral count (minimum of 5 referrals), 
          your Monetization Status will be unlocked, opening the door to even more earnings. <br/><br/> 
          2. <b>Earn Big:</b> After activation of your monetization status, you will start earning up to 40% on all swap fares 
          and cashouts from your Trybe.<br/><br/> 
          3. <b>Lifetime Earnings:</b> With no cap on referrals or earnings, you can keep growing your Trybe and boost your income for life.
          <br/><br/>
          <Text fontWeight={700}>Steps to Grow Your Trybe & Earn:</Text>
          <br/> 
          1. <b>Access Your Referral Link:</b> Head to your dashboard menu and tap on <b>'Refer Your Trybe'</b> to find your unique referral 
          link. <br/><br/> 
          2. <b>Share Your Referral Link:</b> Click "Share My Link To Refer" and send it to your contacts via social media or by copying 
          and pasting your link directly.<br/><br/> 
          3. <b>Expand Your Trybe:</b> There’s no cap on the number of referrals or your potential earnings because the more people you refer 
          to join your Trybe, the more you earn on the platform.
          <br/><br/> 
          4. <b>Earn for Life:</b> Get up to 40% on swap fares and cashouts of your Trybe credited to your wallet, which you can withdraw to 
          your bank account anytime.
          <br/><br/> 
          <Text fontWeight={700}>Multi-Level Trybe Earnings:</Text>
          <br/> 
          Your earnings go beyond your direct referrals in your Trybe. When your referrals bring in their own referrals, you continue earning 
          across three levels of referrals. This means your income grows not only from your direct referrals but also from those they bring 
          into NairaBoom. The bigger your “Trybe”, the more you earn!<br/>
          <br/>
          <b>Monetization Earnings Breakdown:</b>
          <br/><br/>
          <b>Referral Level 1:</b> Earn up to 10% on swap fares and 10% on cashouts from your direct referrals in your Trybe.
          <br/><br/>
          <b>Referral Level 2:</b> Earn up to 5% on swap fares and 7.5% on cashouts from your direct referrals' Trybe.
          <br/><br/>
          <b>Referral Level 3:</b> Earn up to 2.5% on swap fares and 5% on cashouts from your indirect referrals Trybe.
          <br/><br/>
          Turn your referral efforts into a lifetime earning opportunity with NairaBoom’s Monetization Program! 🌟
          <br/><br/><br/>
          <Text fontWeight={700}>V. BOOM COIN TOKENS (BCT) SELL OFFER</Text>
          <br/> 
          Convert your Boom Coin Tokens (BCT) into cash through random sell offers!
          <br/>
          <br/>
          <b>How It Works</b>
          <br/><br/> 
          When your Boom Coin Tokens (BCT) hit a certain value, you’ll get a random sell offer.
          <br/><br/>
          <b>Accept:</b> Tap "Accept" to instantly convert your Boom Coin Tokens (BCT) into cash.
          <br/><br/>
          <b>Decline:</b> Tap "Decline" to keep swapping your alerts to get more Boom Coin Tokens (BCT) for potentially higher sell offers.
          <br/><br/>
          <b>Key Points:</b> Sell offers are random when your Boom Coin Tokens (BCT) hit a certain value.
          <br/>
          No penalties for declining a sell offer, and your Boom Coin Tokens (BCT) remain intact.
          <br/><br/><br/>
          <Text fontWeight={700}>VI. SOCIAL MEDIA CASHOUT</Text>
          <br/> 
          Turn your Boom Coin Tokens (BCT) into cash by participating in our social media challenges!
          <br/>
          <br/>
          <b>How It Works</b>
          <br/><br/>
          <b>1. Follow Us:</b> TikTok <a href="https://www.tiktok.com/@nairaboom.ng?_t=8rloUPG8JNv&_r=1">(@nairaboom.ng)</a>, 
          X <a href="https://x.com/nairaboomng">(@nairaboomng)</a>, Instagram <a href="https://www.instagram.com/nairaboomng/">(@nairaboomng)</a>, 
          Threads <a href="https://www.threads.net/@nairaboomng">(@nairaboomng)</a>, Facebook &nbsp;
          <a href="https://web.facebook.com/profile.php?id=61554354321220&mibextid=ZbWKwL&_rdc=1&_rdr=#">(Nairaboom)</a> and subscribe to our&nbsp;
          <a href="https://www.youtube.com/@Nairaboomng">Youtube</a> channel.
          <br/><br/>
          <b>2. Share Your Boom Wallet (BCT Wallet):</b> Post a video or picture of your Boom Wallet on your social media page.
          <br/><br/>
          <b>3. Tag Us:</b> Use the caption "How many likes or reposts or retweets can I get to cash out my Boom Wallet?". The context depends on 
          the social media platform.
          <br/><br/>
          <b>4. Hit the Target:</b> We’ll set a “Likes”/ “Reposts” / “Retweets” target – reach it, and your Boom Coin Tokens (BCT) in your Boom 
          Wallet will be converted into cash!
          <br/><br/>
          <Text fontWeight={700}>Why Choose NairaBoom?</Text>
          <br/> 
          Transform your everyday bank alerts into BIG BOOMS with NairaBoom! Join our vibrant community today and unlock multiple cashout options 
          alongside a rewarding monetization program that maximizes the value of your alerts!💸
        </Text>

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
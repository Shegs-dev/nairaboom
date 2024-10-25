import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Select,
  Spacer,
  Stack,
  Text,
  VStack,
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Hide,
  Show
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { BsChevronLeft, BsPerson } from "react-icons/bs";
import { TbRating18Plus } from "react-icons/tb";

import Wrapper from "../../components/Wrapper";
import NextLink from "next/link";
import useUser from "../../lib/hooks/useUser";
import { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";
import { consumers } from "form-data";
import { NumericFormat } from "react-number-format";
import numeral from "numeral";
import CurrencyInput from "react-currency-input-field";
import { useMediaQuery } from "@chakra-ui/react";
import { formatAmount } from "../../src/utils";
import Link from "next/link";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const CheckoutComp = () => {
  const { user } = useUser();
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [isChecked, setIschecked] = useState(false);
  const [coordinate, setCoordinates] = useState([]);
  const [asyncGenerated, setAsyncGenerated] = useState();

  const [boomNumbers, setBoomNumbers] = useState([]);
  const [amount, setamount] = useState(null);
  const [balance, setbalance] = useState(null);
  const [gameRef, setgameRef] = useState(null);
  const [amountFormat, setamountFormat] = useState(0);
  const [isLargerThan768] = useMediaQuery("(max-width: 768px)");

  let lat = useRef(0);
  let long = useRef(0);

  const generateBoomConfig = {
    method: "get",
    url: `${BASE_URL}/api/auto_generated_numbers`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const generate = async () => {
    try {
      const res = await axios(generateBoomConfig);
      setAsyncGenerated(res?.data?.payload);
    } catch (e) {
    }
  };

  let genBoom = [];
  const generateNumbers = () => {
    genBoom = [];
    const min = 0;
    const max = 69;
    let generated;
    for (let i = 0; i < 3; i++) {
      generated = Math.floor(Math.random() * (max - min)) + min;
      genBoom.push(generated);
    }
    setBoomNumbers(genBoom);
  };

  const bearerToken = user?.token;

  useEffect(() => {
    if (!bearerToken) return;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat.current = position.coords.latitude;
      long.current = position.coords.longitude;
    });

    const fetchBankData = async () => {
      const bankconfig = {
        method: "get",
        url: `${BASE_URL}/api/bank_lists?start=0&len=209&paging=1`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        const response = await axios(bankconfig);
        setBankData(response.data?.payload.content);
      } catch (err) {
      }
    };
    fetchBankData();
    const winningConfig = {
      method: "get",
      url: `${BASE_URL}/api/profile`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      redirect: "follow",
    };

    const winnings = async () => {
      try {
        const res = await axios(winningConfig);
      } catch (e) {
      }
    };
    winnings();
  }, [bearerToken, toast, user?.token]);

  const initialCashback = {
    amount: "",
    stake_amount: "",
    latitude: "",
    longitude: "",
    game_type: "cashout",
  };

  const [cashBack, setCashback] = useState(initialCashback);

  const [valued, setValued] = useState("");

  const addComma = (val) => {
    const separateByComma = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const removeNonNumber = (num) => num.toString().replace(/[^0-9]/g, "");
    return separateByComma(removeNonNumber(val));
  };

  const handleChange = (e) => {
    setCashback({
      ...cashBack,
      [e.target.name]: e.target.value.trim(),
      stake_amount:
        cashBack.amount > 1 && cashBack.amount < 20000
          ? 200
          : cashBack.amount >= 20000
          ? 0.02 * cashBack.amount
          : 0.0,
      latitude: `${lat.current}`,
      longitude: `${long.current}`,
    });

    const rawValue = e.target.value;
    const formattedValue = numeral(rawValue).format("0,0");
  };
  const cashconfig = {
    method: "post",
    url: `${BASE_URL}/api/play_stake`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${bearerToken}`,
    },
    data: cashBack,
  };

  const handleCashbackSubmit = async () => {
    try {
      // e.preventDefault();
      setIsLoading(true);
      // if (cashBack.amount > Number(balance?.payload?.content[0].amount)) {
      if (cashBack.stake_amount > Number(balance?.payload?.content[0].amount)) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          // title: response.data.message,
          title: "Insufficient Balance",
          position: "top",
        });
        router.push("/customer_dashboard/wallet");
        return;
      }

      const response = await axios(cashconfig);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        router.push("/customer_dashboard/wallet");
        return;
      }

      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        title: response.data.message,
        position: "top",
      });
      setgameRef(response.data?.payload.game_ref);
      // router.push("/customer_dashboard/request_history");
      router.push({
        pathname: "/customer_dashboard/boomwheel",
        query: {
          ref: gameRef === null ? response.data?.payload.game_ref : gameRef,
        },
      });
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Some error occurred! check your connection.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [bonusBalance, setBonusBalance] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!bearerToken) return;
    const fetchBalance = async () => {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/wallet_balance`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      const bonusConfig = {
        method: "get",
        url: `${BASE_URL}/api/bonus_wallet`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);

        setIsLoading(true);
        const response2 = await axios(bonusConfig);

        setBonusBalance(response2?.data);

        setbalance(response?.data);

        if (response?.data?.payload.content[0].amount) {
          if (response?.data.payload.content[0].amount < 200) {
            toast({
              isClosable: true,
              duration: 3000,
              status: "error",
              title: `Insufficent balance, Please fund account with ₦${
                200 - response?.data?.payload.content[0].amount
              }`,
              position: "top",
            });
            router.push("/customer_dashboard/fund_account");
          }
          setCashback({
            ...cashBack,
            stake_amount:
              cashBack.amount > 1 && cashBack.amount < 20000
                ? 200
                : cashBack.amount >= 20000
                ? 0.02 * cashBack.amount
                : 0.0,
          });
        }
      } catch (err) {
        // toast({
        //   status: "error",
        //   isClosable: true,
        //   duration: "5000",
        //   title: "Please check your connection and try again",
        //   position: "top",
        // });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [bearerToken, toast]);

  return <>
    <Head>
      <title>NAIRABOOM | Play Game</title>
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
      alignItems="center"
      pt={10}
      spacing={5}
      bgImage="/redesign/generalbackground.svg"
      bgPos="center"
      bgSize="cover"
      pos="relative"
      color="white"
    >
      <Stack
        w="100%"
        maxW="65rem"
        spacing={10}
        alignItems="center"
        px={{ base: 8, md: 0 }}
      >
        <HStack pos="relative" w="100%" justifyContent="center">
          <Box
            pos="absolute"
            left={0}
            cursor="pointer"
            onClick={() =>
              router.push(`/${window.location.pathname.split("/")[1]}`)
            }
          >
            <BsChevronLeft size={30} onClick={() => router.back()} />
          </Box>
          <Text fontSize="1.5rem" fontWeight={600}>
            Cashout
          </Text>
        </HStack>

        {/* <Text>Got an alert, you want to boom? Enter Details Below</Text> */}
        <Flex
          justifyContent="center"
          w="100%"
          maxW="65rem"
          px={{ base: 0, md: 10 }}
          gap={5}
          flexFlow={{ base: "column-reverse wrap", md: "nowrap" }}
        >
          <Flex
            w={{ base: "100%", md: "50%" }}
            justifyContent="center"
            alignItems="flex-end"
          >
            <Flex
              w={{ base: "100%", md: "50%" }}
              justifyContent="center"
              alignItems="flex-end"
            >
              {/* <Image src="/redesign/dashboard/play-game-mockup.png" alt={""} /> */}
              <Hide below='md'>
              <Image   ml={{base: '', lg:'-30rem'}} src="/redesign/dashboard/playgame2.png" alt={'play-game-image'}/> 
              </Hide>
              <Show below='md'>
              <Image   ml={{base: '', lg:'-30rem'}} src="/redesign/dashboard/playgame3.png" alt={'play-game-image'}/> 
              </Show>
            </Flex>
            <Stack
              w={{ base: "100%", md: "sm" }}
              spacing={8}
              alignItems="center"
            >
              <FormControl>
                <FormLabel px={5} fontWeight={500}>
                  Amount
                </FormLabel>
                <CurrencyInput
                  id="input-example"
                  name="amount"
                  placeholder="Please enter amount"
                  defaultValue={0}
                  decimalsLimit={1}
                  prefix={"₦"}
                  disabled={true}
                  style={{
                    height: "4rem",
                    // width: isLargerThan768 ? "100%" : "28rem",
                    width: "100%",
                    paddingLeft: "1rem",
                    color: "black",
                    borderRadius: 50,
                  }}
                  onValueChange={(value, name) => {
                    if (value === undefined) {
                      setCashback({
                        ...cashBack,
                        amount: 0.0,
                        stake_amount: 0.0,
                        latitude: `${lat.current}`,
                        longitude: `${long.current}`,
                      });
                    } else {
                      setCashback({
                        ...cashBack,
                        amount: value,
                        stake_amount:
                          value > 1 && value < 20000
                            ? 200
                            : value >= 20000
                            ? 0.01 * value
                            : 0.0,
                        latitude: `${lat.current}`,
                        longitude: `${long.current}`,
                      });
                    }
                  }}
                  value={`${formatAmount(
                    bonusBalance?.payload?.content?.[0]?.amount * 0.02
                  )}`}
                />
                {/* <Input
                    bg="white"
                    px={8}
                    type="text"
                    color={"nairablue"}
                    borderRadius={50}
                    placeholder="N0"
                    w={{ base: "100%", md: "28rem" }}
                    h="4rem"
                    border={"none"}
                    bgColor="white"
                  /> */}
              </FormControl>
              <HStack
                height="4rem"
                w="100%"
                px={8}
                bg="white"
                type="number"
                borderRadius={50}
                placeholder="Alert Amount"
                color="gray"
              >
                <Text>Stake Amount</Text>
                <Spacer />
                <Text fontSize={"1.25rem"}>
                  ₦{" "}
                  {/* {bonusBalance.amount > 1 && bonusBalance.amount < 20000
                    ? 200
                    : cashBack.amount >= 20000
                    ? 0.02 * cashBack.amount
                    : 0.0} */}
                  {bonusBalance
                    ? !bonusBalance ||
                      bonusBalance?.payload?.totalLength === 0 ||
                      bonusBalance === null ||
                      bonusBalance === undefined
                      ? 0
                      : formatAmount(
                          bonusBalance?.payload?.content?.[0]?.amount * 0.02
                        )
                    : 0}
                </Text>
              </HStack>
              <HStack
                height="4rem"
                w="100%"
                px={8}
                bg="white"
                type="number"
                borderRadius={50}
                placeholder="Alert Amount"
                color="gray"
              >
                <Text>Potential Winnings</Text>
                <Spacer />
                <Text>
                  {/* ₦30,000,000 */}
                  &#8358;
                  {bonusBalance
                    ? !bonusBalance ||
                      bonusBalance?.payload?.totalLength === 0 ||
                      bonusBalance === null ||
                      bonusBalance === undefined
                      ? 0
                      : formatAmount(bonusBalance.payload.content[0].amount)
                    : 0}
                </Text>
              </HStack>
              <Box
                mt={"1em"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign="center"
              >
                <Checkbox
                  colorScheme="nairagreen"
                  color={"white"}
                  p={"0.5em"}
                  display={{ base: "flex" }}
                >
                  {/* I Agree to T & Cs */}I Agree to{" "}
                </Checkbox>
                <Link
                  as={Link}
                  to="/terms_conditions"
                  href="/terms_conditions"
                  color="blue.500"
                  legacyBehavior>
                  <Text color={"nairagreen"} style={{textDecoration: "underline"}}>T & Cs</Text>
                </Link>
              </Box>
              {/* <Button
                  w="100%"
                  colorScheme="none"
                  bg="nairagreen"
                  color="white"
                  borderRadius={50}
                  pos="relative"

                  border={"none"}
            
                  type={"submit"}
                  fontWeight={600}
                  fontSize="lg"
                  mb={{ base: "2rem", md: "4rem" }}
                  cursor={"pointer"}
                  // isDisabled={!isChecked}
                  isDisabled={false}
                  _hover={{ transform: "scale(1.05)" }}
                  onClick={()=>{
                    handleCashbackSubmit()
                  }}
                >
                  {isLoading ? <Spinner /> : "Spin the boom wheel"}
                </Button> */}
              <Button
                w="100%"
                colorScheme="none"
                bg="nairagreen"
                color="white"
                borderRadius={50}
                pos="relative"
                border={"none"}
                type={"submit"}
                fontWeight={700}
                fontSize="lg"
                h={"3.25rem"}
                mb={{ base: "2rem", md: "1rem" }}
                cursor={"pointer"}
                // isDisabled={!isChecked}
                isDisabled={false}
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => {
                  handleCashbackSubmit();
                }}
              >
                {isLoading ? <Spinner /> : "Spin The Boomwheel"}
              </Button>
              <Button
                w="100%"
                colorScheme="none"
                bg="#ff0000"
                color="white"
                borderRadius={50}
                pos="relative"
                border={"none"}
                type={"submit"}
                h={"3.25rem"}
                fontWeight={600}
                fontSize="lg"
                mb={{ base: "2rem", md: "4rem" }}
                cursor={"pointer"}
                // isDisabled={!isChecked}
                isDisabled={true}
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => {
                  handleCashbackSubmit();
                }}
              >
                {isLoading ? <Spinner /> : "Check-In Only"}
              </Button>
              <HStack color="nairagreen" py={5}>
                <Icon as={TbRating18Plus} />
                <Text fontSize={"lg"}>Play Responsibly</Text>
              </HStack>
            </Stack>
          </Flex>
        </Flex>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Your modal content goes here */}
            This is the modal content.
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  </>;
};

export default CheckoutComp;

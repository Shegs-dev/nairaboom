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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Show,
  Hide
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
import { ImInfo } from "react-icons/im";
import Greencircle from "../../public/greencircle.svg";
// import PlayEight from '/'

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const PlayGameUser = () => {
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

  const [referenceNo, setreferenceNo] = useState(true);

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
    alert_type: "",
    date_received_alert: "",
    bank_lists_id: "",
    stake_amount: "",
    latitude: "",
    longitude: "",
    game_type: "normal",
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

      try {
        setIsLoading(true);
        const response = await axios(config);

        setbalance(response?.data);

        if (response?.data?.payload.content[0].amount) {
          if (response?.data?.payload.content[0].amount < 200) {
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

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Add leading zero if month or day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };


  const { isOpen, onOpen, onClose } = useDisclosure();

  const [maxDate, setMaxDate] = useState(getCurrentDate());

  return (
    <>
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
              Play Game
            </Text>
          </HStack>
          <Text>Got an alert, you want to rollover? Enter Details Below</Text>
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
              dispay={{base: 'none'}}
            >
              {/* <Image src="/redesign/dashboard/play-game-mockup.png" alt={'play-game-image'}/> */}
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
                  Alert Amount
                </FormLabel>
                <CurrencyInput
                  id="input-example"
                  name="amount"
                  placeholder="Valid Alert Only"
                  defaultValue={null}
                  decimalsLimit={1}
                  prefix={"₦"}
                  style={{
                    height: "4rem",
                    width: isLargerThan768 ? "100%" : "28rem",
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
                />
                {/* <Input
                  bg="white"
                  px={8}
                  type="text"
                  color={"nairablue"}
                  borderRadius={50}
                  placeholder="N0"
                  w={{ base: "100%", md: "28rem" }}
                     h="3.25rem"
                  border={"none"}
                  bgColor="white"
                /> */}
              </FormControl>
              <FormControl>
                <Box display={"flex"} flexDir={"row"} alignItems={"center"}>
                  <FormLabel px={5} fontWeight={500}>
                    Reference No.
                  </FormLabel>
                  <Box display={"flex"} flexDir={"row"}>
                    <Box
                      onClick={() => {
                        setreferenceNo(true);
                      }}
                      bg={"nairagreen"}
                      px={4}
                      py={2}
                      borderRadius={2}
                    >
                      <Text fontWeight={600}>Yes</Text>
                    </Box>
                  </Box>
                  <Box display={"flex"} flexDir={"row"} ml={4}>
                    <Box
                      onClick={() => {
                        setreferenceNo(false);
                      }}
                      bg={"nairagreen"}
                      px={4}
                      py={2}
                      borderRadius={2}
                    >
                      <Text fontWeight={600}>No</Text>
                    </Box>
                  </Box>
                </Box>
                {referenceNo && (
                  <Input
                    name="reference_num"
                    w={{ base: "100%", md: "28rem" }}
                    h="3.25rem"
                    border={"none"}
                    color={"#A7A7A7"}
                    bgColor="white"
                    type={"text"}
                    my="1rem"
                    placeholder="Enter Reference No"
                    focusBorderColor="nairagreen"
                    isRequired
                    borderRadius={50}
                    onChange={handleChange}
                  />
                )}
              </FormControl>

              <FormControl>
                <FormLabel px={5} fontWeight={500}>
                  Type Of Alert
                </FormLabel>
                <Select
                  bg="white"
                  type="text"
                  borderRadius={50}
                  defaultValue=""
                  color="gray"
                  name="alert_type"
                  w={{ base: "100%", md: "28rem" }}
                  h="3.25rem"
                  border={"none"}
                  bgColor="white"
                  placeholder="Type of Alert"
                  _placeholder={{ fontWeight: 500 }}
                  mb={{ base: "0rem", md: "2.5rem" }}
                  focusBorderColor="nairagreen"
                  isRequired
                  onChange={handleChange}
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel px={5} fontWeight={500}>
                  Bank Used To Receive Alert
                </FormLabel>
                <Select
                  bg="white"
                  type="text"
                  borderRadius={50}
                  name="bank_lists_id"
                  w={{ base: "100%", md: "28rem" }}
                  h="3.25rem"
                  border={"none"}
                  bgColor="white"
                  placeholder="Bank"
                  _placeholder={{ fontWeight: 500 }}
                  color={"#A7A7A7"}
                  focusBorderColor="nairagreen"
                  isRequired
                  onChange={handleChange}
                >
                  {bankData.map((bank, index) => (
                    <option key={index} value={bank.ID}>
                      {bank.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel px={5} fontWeight={500}>
                  Date You Received Alert
                </FormLabel>
                {/* <Input
                  px={8}
                  bg="white"
                  type="date"
                           color={"nairablue"}
                  borderRadius={50}
                  
                /> */}
                <Input
                  name="date_received_alert"
                  w={{ base: "100%", md: "28rem" }}
                  h="3.25rem"
                  border={"none"}
                  color={"#A7A7A7"}
                  bgColor="white"
                  type={"date"}
                  mb="1rem"
                  focusBorderColor="nairagreen"
                  isRequired
                  borderRadius={50}
                  onChange={handleChange}
                  max={maxDate}
                />
              </FormControl>

              <HStack
                h="3.25rem"
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
                  {cashBack.amount > 1 && cashBack.amount < 20000
                    ? 200
                    : cashBack.amount >= 20000
                    ? 0.02 * cashBack.amount
                    : 0.0}
                </Text>
              </HStack>
              <HStack
                h="3.25rem"
                w="100%"
                // w={{ base: "100%", md: "28rem" }}
                px={8}
                bg="white"
                type="number"
                borderRadius={50}
                placeholder="Alert Amount"
                color="gray"
                justifyContent={"space-between"}
              >
                <Text>Potential Winning</Text>
                <Box display={"flex"} flexDir={"column"}>
                  <Text>₦{Number(cashBack.amount)?.toLocaleString()} -</Text>
                  {/* <Text fontSize={{base: 10, md:12}}>-</Text> */}
                  {/* <Spacer /> */}
                  <Text>₦35,000,000</Text>
                </Box>
              </HStack>
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
              <HStack
                w="100%"
                alignItems="center"
                // w={{ base: "100%", md: "28rem" }}

                mb={{ base: "2rem", md: "1rem" }}
              >
                <Button
                  w="100%"
                  h="3.25rem"
                  colorScheme="none"
                  bg="nairagreen"
                  color="white"
                  borderRadius={50}
                  pos="relative"
                  border={"none"}
                  type={"submit"}
                  fontWeight={700}
                  fontSize={"2xl"}
                  // mb={{ base: "2rem", md: "1rem" }}
                  cursor={"pointer"}
                  // isDisabled={!isChecked}
                  isDisabled={false}
                  _hover={{ transform: "scale(1.05)" }}
                  onClick={() => {
                    handleCashbackSubmit();
                  }}
                >
                  {isLoading ? <Spinner /> : "Rollover"}
                </Button>
                <Box
                  onClick={() => {
                    onOpen();
                  }}
                  height={"3.25rem"}
                  w={{ base: "2.0rem", lg: "2.5rem" }}
                  // mt={{ base: "0.85rem", lg: "1px" }}
                  className="eightAtplaygame"
                  alignSelf={{ base: "flex-start", md: "center" }}
                >
                  <ImInfo size={{ base: "1.5rem", lg: "2rem" }} />
                </Box>
              </HStack>

              <Button
                w="100%"
                colorScheme="none"
                bg="#ff0000"
                color="white"
                borderRadius={50}
                pos="relative"
                border={"none"}
                type={"submit"}
                h="3.25rem"
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
                {/* <Icon as={TbRating18Plus} /> */}
                <Image
                  src="/plus18.png"
                  w={{ base: "2.5rem", lg: "2.5rem" }}
                  alignSelf={{ base: "flex-start", md: "center" }}
                  alt=""
                />
                {/* <TbRating18Plus size={30}/> */}
                <Text fontSize={"lg"}>Play Responsibly</Text>
              </HStack>
            </Stack>
          </Flex>
        </Stack>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>POSSIBLE WINNINGS</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            {/* Your modal content goes here */}
            <TableContainer >
              <Table variant="simple">
                <TableCaption>Winning Table</TableCaption>
                <Thead>
                  <Tr>
                    <Th>GAME PLAY </Th>
                    {/* <Th>DESCRIPTION</Th> */}
                    <Th >WINNINGS</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td display={"flex"} flex flexDir={"row"}>
                      {/* <Image width={30} mr={1} src={'/greencircle.svg'} alt=""/> */}
                      {/* <ImInfo size={30} /> */}
                      <Image
                        width={30}
                        mr={1}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                    </Td>
                    {/* <Td fontSize={{ base: "sm", md: "md" }}>1 GREEN</Td> */}
                    <Td>1,000 NAIRA IN ROLLOVER WALLET</Td>
                  </Tr>
                  <Tr>
                    <Td display={"flex"} flex flexDir={"row"}>
                      <Image
                        width={30}
                        mr={1}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                      <Image
                        width={30}
                        mr={1}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                    </Td>
                    {/* <Td fontSize={{ base: "sm", md: "md" }}>2 GREEN</Td> */}
                    <Td>50% IN ROLLOVER WALLET</Td>
                  </Tr>
                  <Tr>
                    <Td display={"flex"} flex flexDir={"row"}>
                      <Image
                        width={30}
                        mr={1}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                      <Image
                        width={30}
                        mr={1}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                      <Image
                        width={30}
                        mr={1}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                    </Td>
                    {/* <Td fontSize={{ base: "sm", md: "md" }}>3 GREEN</Td> */}
                    <Td>CASHOUT</Td>
                  </Tr>
                  <Tr>
                    <Td display={"flex"} flex flexDir={"row"}>
                      <Image
                        width={30}
                        mr={0.5}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                      <Image
                        width={30}
                        mr={0.5}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                      <Image
                        width={30}
                        mr={0.5}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                      <Image
                        width={30}
                        mr={0.5}
                        src={"/greencircle.svg"}
                        alt=""
                      />
                      
                    </Td>
                    {/* <Td fontSize={{ base: "sm", md: "md" }}>4 GREEN</Td> */}
                    <Td>
                      <Text ml={'1rem'}>JACKPOT</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td display={"flex"} flex flexDir={"row"}>
                      <Image width={30} mr={1} src={"/purple.svg"} alt="" />
                      <Image width={30} mr={1} src={"/redcircle.svg"} alt="" />
                      <Image width={30} mr={1} src={"/bluecircle.svg"} alt="" />
                      <Image width={30} mr={1} src={"/yellow.svg"} alt="" />
                    </Td>
                    {/* <Td fontSize={{ base: "sm", md: "md" }}>BOOM CODE</Td> */}
                    <Td>
                    <Text ml={'1rem'}>CASHOUT %</Text>
                    </Td>
                    
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlayGameUser;

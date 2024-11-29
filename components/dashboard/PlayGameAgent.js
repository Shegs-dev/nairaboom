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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { BsChevronLeft, BsPerson } from "react-icons/bs";
import { ImInfo } from "react-icons/im";
import useUser from "../../lib/hooks/useUser";
import { useState, useEffect } from "react";
import numeral from "numeral";
import CurrencyInput from "react-currency-input-field";
import Link from "next/link";
import {
  getBankLists,
  playAgentStake,
  getWalletBalance
} from "../../src/apis/func";

const PlayGameAgent = () => {
  const [isLargerThan768] = useMediaQuery("(max-width: 768px)");

  const { user } = useUser();
  const router = useRouter();
  const toast = useToast();

  const [bank, setBank] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [isChecked, setIschecked] = useState(false);
  const [gameRef, setgameRef] = useState(null);
  const [balance, setbalance] = useState(null);

  let lat = useRef(0);
  let long = useRef(0);

  const bearerToken = user?.token;

  useEffect(() => {
    if (!bearerToken) return;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat.current = position.coords.latitude;
      long.current = position.coords.longitude;
    });

    const fetchBankData = async () => {
      try {
        const response = await getBankLists(bearerToken);
        setBankData(response.data?.payload.content);
      } catch (err) {
        toast({
          status: "error",
          duration: 5000,
          title:
            "Something went wrong, please check your connection and try again",
          position: "top",
        });
      }
    };
    const fetchBalance = async () => {
      try {
        setIsLoading(true);
        const response = await getWalletBalance(bearerToken);

        setbalance(response?.data);

        if (response?.data.payload.content[0].amount) {
          if (response?.data.payload.content[0].amount < 200) {
            toast({
              isClosable: true,
              duration: 3000,
              status: "error",
              title: `Insufficent balance, Please fund account with ₦${
                200 - response?.data.payload.content[0].amount
              }`,
              position: "top",
            });
            router.push("/customer_dashboard/fund_account");
          }
        }
      } catch (err) {
        toast({
          status: "error",
          isClosable: true,
          duration: "5000",
          title: "Please check your connection and try again",
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBankData();
    fetchBalance();
  }, [bearerToken, toast]);

  const initialCashback = {
    cust_fullname: "",
    cust_phone_number: "",
    cust_email: "",
    amount: "",
    alert_type: "",
    date_received_alert: "",
    bank_lists_id: "",
    latitude: "",
    longitude: "",
    bank_code: "",
    stake_amount: "",
    game_type: "normal",
  };
  const [cashBack, setCashback] = useState(initialCashback);
  const [referenceNo, setreferenceNo] = useState(true);

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
      bank_lists_id: bank?.[0]?.split(",")[0],
      bank_code: bank?.[0]?.split(",")[1],
    });

    const rawValue = e.target.value;
    const formattedValue = numeral(rawValue).format("0,0");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCashbackSubmit = async (e) => {
    try {
      setIsLoading(true);
      if (cashBack.stake_amount > Number(balance?.payload?.content[0].amount)) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          title: "Insufficient Balance",
          position: "top",
        });
        router.push("/agent_dashboard/wallet");
        return;
      }
      const response = await playAgentStake(bearerToken, cashBack);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        return;
      }

      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        title: response.data.message,
        position: "top",
      });
      setgameRef(response.data.payload.game_ref);
      router.push({
        pathname: "/agent_dashboard/boomwheel",
        query: {
          ref: gameRef === null ? response.data.payload.game_ref : gameRef,
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

  const bankchange = (e) => {
    setBank([e.target.value]);
    handleChange(e);
  };

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
            Play Game
          </Text>
        </HStack>
        <Text>Got an alert, you want to rollover? Enter Details Below</Text>
        <Flex
          justifyContent="center"
          w="100%"
          maxW="65rem"
          gap={5}
          flexFlow={{ base: "column-reverse wrap", md: "nowrap" }}
        >
          <Flex
            w={{ base: "100%", md: "50%" }}
            justifyContent="flex-start"
            alignItems="flex-end"
          >
            <Image
              src="/redesign/dashboard/playgameagent.png"
              w="80%"
              alt={""}
            />
          </Flex>
          <Stack
            w={{ base: "100%", md: "sm" }}
            spacing={8}
            alignItems="center"
          >
            <FormControl>
              <Input
                bg="white"
                px={8}
                h="3.25rem"
                w={{ base: "100%", md: "28rem" }}
                type="text"
                color="gray"
                borderRadius={50}
                placeholder="Customer's Name"
                name="cust_fullname"
                border={"none"}
                bgColor="white"
                _placeholder={{
                  fontSize: "16px",
                  color: "#A7A7A7",
                  fontWeight: 500,
                }}
                mb={{ base: "1rem", md: "1.0rem" }}
                focusBorderColor="nairagreen"
                isRequired
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Input
                bg="white"
                px={8}
                h="3.25rem"
                type="number"
                color="gray"
                borderRadius={50}
                placeholder="Customer's Phone Number"
                name="cust_phone_number"
                w={{ base: "100%", md: "28rem" }}
                border={"none"}
                bgColor="white"
                _placeholder={{
                  fontSize: "16px",
                  color: "#A7A7A7",
                  fontWeight: 500,
                }}
                mb={{ base: "1.5rem", md: "1.0rem" }}
                focusBorderColor="nairagreen"
                isRequired
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Box display={"flex"} flexDir={"row"} alignItems={"center"}>
                <FormLabel px={5} fontWeight={500}>
                  Reference No.
                </FormLabel>
                <Box display={"flex"} flexDir={"row"} >
                  <Box
                    onClick={() => {
                      setreferenceNo(true);
                    }}
                    bg={"nairagreen"}
                    px={4}
                    py={2}
                    borderRadius={2}
                    _hover={{ cursor: 'pointer' }}
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
                    _hover={{ cursor: 'pointer' }}
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
                Alert Amount
              </FormLabel>
              <CurrencyInput
                id="input-example"
                name="amount"
                placeholder="Valid Alert Only"
                defaultValue={0}
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
            </FormControl>
            <FormControl>
              <Box
                bg="white"
                h="3.25rem"
                w={{ base: "100%", md: "28rem" }}
                borderRadius={50}
                overflow="hidden"
                px={3}
              >
                <Select
                  type="text"
                  defaultValue=""
                  borderWidth={0}
                  name="alert_type"
                  w={{ base: "100%", md: "100%" }}
                  h="3.25rem"
                  border={"none"}
                  bgColor="white"
                  placeholder="Type of Alert"
                  _placeholder={{ fontWeight: 500 }}
                  mb={{ base: "1.5rem", md: "2.5rem" }}
                  color={"#A7A7A7"}
                  focusBorderColor="nairagreen"
                  isRequired
                  onChange={handleChange}
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </Select>
              </Box>
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
                onChange={bankchange}
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
              <Input
                px={8}
                bg="white"
                type="date"
                h="3.25rem"
                borderRadius={50}
                color="gray"
                name="date_received_alert"
                w={{ base: "100%", md: "28rem" }}
                border={"none"}
                bgColor="white"
                mb="1rem"
                focusBorderColor="nairagreen"
                isRequired
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  bg="white"
                  px={8}
                  h="3.25rem"
                  type="text"
                  color="gray"
                  borderRadius={50}
                  placeholder="Stake Amount"
                />
                <InputRightElement color="gray" w="4rem">
                  {/* N0 */}₦{" "}
                  {cashBack.amount > 1 && cashBack.amount < 20000
                    ? 200
                    : cashBack.amount >= 20000
                    ? 0.02 * cashBack.amount
                    : 0.0}
                </InputRightElement>
              </InputGroup>
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
              justifyContent={"space-between"}
            >
              <Text>Potential Winning</Text>
              <Box display={"flex"} flexDir={"column"}>
                <Text>₦{Number(cashBack.amount)?.toLocaleString()} -</Text>
                <Text>₦35,000,000</Text>
              </Box>
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
                defaultChecked
                value={isChecked}
                onChange={setIschecked}
              >
               I Agree to{" "}
              </Checkbox>
              <Link
                as={Link}
                to="/terms_conditions"
                href="/terms_conditions"
                color="blue.500"
                legacyBehavior>
                <Text
                  color={"nairagreen"}
                  style={{ textDecoration: "underline" }}
                >
                  T & Cs
                </Text>
              </Link>
            </Box>
            <HStack w="100%" alignItems="center" mb={{ base: "2rem" }}>
              <Button
                w="100%"
                h="3.25rem"
                colorScheme="none"
                bg="nairagreen"
                color="white"
                borderRadius={50}
                pos="relative"
                border={"none"}
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                type={"submit"}
                fontWeight={700}
                fontSize={"2xl"}
                cursor={"pointer"}
                isDisabled={!isChecked}
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
                className="eightAtplaygame"
                alignSelf={{ base: "flex-start", md: "center" }}
              >
                <ImInfo size={{ base: "1.5rem", lg: "2rem" }} />
              </Box>
            </HStack>
            <HStack color="nairagreen" py={5}>
              <Image
                src="/plus18.png"
                w={{ base: "2.5rem", lg: "2.5rem" }}
                alignSelf={{ base: "flex-start", md: "center" }}
                alt=""
              />
              <Text>Play Responsibly</Text>
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
        <ModalBody>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Winning Table</TableCaption>
              <Thead>
                <Tr>
                  <Th>GAME PLAY</Th>
                  <Th ml={"2rem"}>WINNINGS</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td display={"flex"} flex flexDir={"row"}>
                    <Image
                      width={30}
                      mr={1}
                      src={"/greencircle.svg"}
                      alt=""
                    />
                  </Td>
                  <Td>1,000 NAIRA IN BOOM COINS WALLET</Td>
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
                  <Td>50% IN BOOM COINS WALLET</Td>
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
                      mr={1}
                      src={"/greencircle.svg"}
                      alt=""
                    />
                  </Td>
                  <Td>JACKPOT</Td>
                </Tr>
                <Tr style={{justifyContent: 'space-between'}}>
                  <Td display={"flex"} flex flexDir={"row"}>
                    <Image width={30} mr={1} src={"/purple.svg"} alt="" />
                    <Image width={30} mr={1} src={"/redcircle.svg"} alt="" />
                    <Image width={30} mr={1} src={"/bluecircle.svg"} alt="" />
                    <Image width={30} mr={1} src={"/yellow.svg"} alt="" />
                  </Td>
                  <Td>CASHOUT %</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>;
};

export default PlayGameAgent;

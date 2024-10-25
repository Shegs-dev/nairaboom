import {
  Box,
  Avatar,
  Text,
  Link,
  chakra,
  Heading,
  Input,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  useDisclosure,
  Spinner,
  useToast,
  Square,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import avatar from "../../public/dashboard/avatar.svg";
import winning from "../../public/winning/winning-icon.png";
import nairasign from "../../public/dashboard/Nairasign.svg";
import NextLink from "next/link";
import dateIcon from "../../public/wallet/date-icon.png";
import searchIcon from "../../public/wallet/search-icon.png";
import redDot from "../../public/wallet/red-dot.png";
import greenDot from "../../public/wallet/green-dot.png";
import smallnairasign from "../../public/wallet/nairasign.png";
import Wrapper from "../../components/Wrapper";
import useUser from "../../lib/hooks/useUser";
import empty from "../../public/dashboard/empty.png";
import WithDraw from "../../components/WithDraw";
import FundWallet from "../../components/FundWallet";
import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";
import { formatAmount } from "../../src/utils/index";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const Wallet = () => {
  const toast = useToast();
  const { user } = useUser();
  const [data, setData] = useState("");
  const [balance, setBalance] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [modifieddata, setmodifiedData] = useState([]);
  const [page, setPage] = useState(1);
  const bearerToken = user?.token;
  useEffect(() => {
    if (!bearerToken) return;

    async function fetchTransac() {
      const config = {
        method: "get",
        // url: `${BASE_URL}/api/transaction_history`,
        url: `${BASE_URL}/api/transaction_history?start=0&len=500&paging=1`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);
        setData(response?.data);
        function splitArray(array) {
          var subarrays = [];
          var length = array.length;
          for (var i = 0; i < length; i += 10) {
            var subarray = array.slice(i, i + 10);
            subarrays.push(subarray);
          }
          return subarrays;
        }
        const modified_data = splitArray(response?.data.payload.content);
        setmodifiedData(modified_data);
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
    }

    async function fetchBalance() {
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

        setBalance(response?.data);
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
    }

    fetchBalance();
    fetchTransac();
  }, [bearerToken, toast]);
  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Customer Wallet</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
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
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        pb={{ base: "2.5rem", md: "4rem" }}
      >
        <Text
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
          color="nairablue"
        >
          My Wallet
        </Text>
        <Box display={"flex"} alignItems="center" gap="1.6rem">
          <Box as={NextLink} href="/customer_dashboard/editprofile">
            <Avatar
              name={user?.details?.fullname}
              src={user?.details?.customer_path}
              bg="rgba(30, 215, 96, 0.19)"
              cursor={"pointer"}
            />
          </Box>
        </Box>
      </Box>
      <Box
        bgColor={"white"}
        borderRadius="20px"
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent={"space-between"}
        pl={{ base: ".2rem", md: "1.1rem" }}
        gap={{ base: "0rem", md: "1.25rem" }}
        w="100%"
        pb=".8rem"
        pr={{ base: ".5rem", md: "2rem" }}
        pt={{ base: "1.5rem", md: "2.5rem" }}
      >
        <Box
          display={"flex"}
          pb={{ base: "1rem", md: "1.6rem" }}
          gap={"1.375rem"}
        >
          <Box w="100%">
            <Image src={winning} alt="winning icon" />
          </Box>
          <Box display={"flex"} flexDir="column">
            <Text fontWeight={500} color="nairagrey" fontSize={"xl"}>
              Balance
            </Text>
            <Text
              color="nairablue"
              fontWeight={700}
              fontSize={{ base: "2rem", md: "2.5rem" }}
            >
              &#8358;
              {balance
                ? !balance ||
                  balance?.payload?.totalLength === 0 ||
                  balance === null ||
                  balance === undefined
                  ? 0
                  : formatAmount(balance.payload.content[0]?.amount)
                : 0}
            </Text>
          </Box>
        </Box>
        <Box
          flexWrap={"wrap"}
          display={"flex"}
          flexDir="row"
          alignItems={{ base: "center", md: "flex-end" }}
          justifyContent="center"
          gap={{ base: ".3rem", md: "1.7rem" }}
          maxW={"90%"}
        >
          <FundWallet />
          <WithDraw />
        </Box>
      </Box>
      <Box pt="3.3rem" fontFamily={"poppins"}>
        <Heading
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.875rem" }}
          color="nairablue"
          fontFamily={"poppins"}
        >
          Transaction History
        </Heading>
        <Box
          display={"flex"}
          w={{ base: "100%", md: "70%" }}
          mt="1.5rem"
          gap="2.4rem"
        >
          <Box
            h="2.6rem"
            w={{ base: "90%", md: "18.8rem" }}
            pl={"1.5rem"}
            bgColor="white"
            display={"flex"}
            alignItems={"center"}
            borderRadius="6px"
          >
            <Image src={searchIcon} alt="search icon" />
            <Input
              border={"none"}
              type="search"
              px={".5rem"}
              focusBorderColor="transparent"
              placeholder="Search"
              _placeholder={{
                fontSize: "1rem",
                ml: { base: "1.5rem", md: "2rem" },
              }}
              h="100%"
            />
          </Box>
        </Box>
        <Box w={{ base: "100%" }} mt="2.4rem" fontFamily={"poppins"}>
          <Tabs isFitted variant="unstyled">
            <TabList
              border="1px solid #DCDADA"
              borderRadius={"10px"}
              h="3.25rem"
            >
              <Tab
                fontSize={".9rem"}
                color={"nairagrey"}
                _selected={{
                  color: "white",
                  bg: "#1ED760",
                  borderLeftRadius: "10px",
                }}
              >
                All
              </Tab>
              <Tab
                fontSize={".9rem"}
                color={"nairagrey"}
                _selected={{
                  color: "white",
                  bg: "#1ED760",
                }}
              >
                Credit
              </Tab>
              <Tab
                fontSize={".9rem"}
                color={"nairagrey"}
                _selected={{
                  color: "white",
                  bg: "#1ED760",
                  borderRightRadius: "10px",
                }}
              >
                Debit
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel overflowY={"scroll"}>
                {isLoading || !data ? (
                  <Box
                    py="10rem"
                    display={"flex"}
                    flexDir="column"
                    alignItems={"center"}
                  >
                    <Spinner />
                  </Box>
                ) : data?.payload?.totalLength === 0 ? (
                  <Box
                    py="10rem"
                    display={"flex"}
                    flexDir="column"
                    alignItems={"center"}
                  >
                    <Image src={empty} alt="no record" />
                    <Text color="#A7A7A7" fontSize={"18px"}>
                      No Records
                    </Text>
                  </Box>
                ) : (
                  // data?.payload.content.map((item, index) => (
                  //   <Box
                  //     key={index}
                  //     pt="1rem"
                  //     display={"flex"}
                  //     justifyContent="space-between"
                  //   >
                  //     <Box display={"flex"} gap=".7rem">
                  //       <chakra.span>
                  //         {item.tranx_type == "debit" ? (
                  //           <Image src={redDot} alt="red dot" />
                  //         ) : (
                  //           <Image src={greenDot} alt="green dot" />
                  //         )}
                  //       </chakra.span>
                  //       <Box display="flex" flexDir="column">
                  //         <Text color="nairablue" fontSize={"18px"}>
                  //           {item.tranx_description}
                  //         </Text>
                  //         <Text color="nairagrey" fontSize={"13px"}>
                  //           {item.date_created}
                  //         </Text>
                  //       </Box>
                  //     </Box>
                  //     <Text
                  //       color="nairablue"
                  //       fontWeight={600}
                  //       fontSize="1.125rem"
                  //     >
                  //       <chakra.span>
                  //         <Image src={smallnairasign} alt="nairasign" />
                  //       </chakra.span>
                  //       {item.amount}
                  //     </Text>
                  //   </Box>
                  // ))
                  modifieddata[page - 1]?.map((item, index) => (
                    <Box
                      key={index}
                      pt="1rem"
                      display={"flex"}
                      justifyContent="space-between"
                    >
                      <Box display={"flex"} gap=".7rem">
                        <chakra.span>
                          {item.tranx_type == "debit" ? (
                            <Image src={redDot} alt="red dot" />
                          ) : (
                            <Image src={greenDot} alt="green dot" />
                          )}
                        </chakra.span>
                        <Box display="flex" flexDir="column">
                          <Text color="nairablue" fontSize={"18px"}>
                            {item.description || item.tranx_description}
                          </Text>
                          <Text color="nairagrey" fontSize={"13px"}>
                            {item.date_created}
                          </Text>
                        </Box>
                      </Box>
                      <Text
                        color="nairablue"
                        fontWeight={600}
                        fontSize="1.125rem"
                      >
                        <chakra.span>
                          {/* <Image src={smallnairasign} alt="nairasign" /> */}
                          ₦
                        </chakra.span>
                        {item.amount}
                      </Text>
                    </Box>
                  ))
                )}
              </TabPanel>
              <TabPanel overflowY={"scroll"}>
                {isLoading || !data ? (
                  <Box
                    py="10rem"
                    display={"flex"}
                    flexDir="column"
                    alignItems={"center"}
                  >
                    <Spinner />
                  </Box>
                ) : data?.payload?.totalLength === 0 ? (
                  <Box
                    py="10rem"
                    display={"flex"}
                    flexDir="column"
                    alignItems={"center"}
                  >
                    <Image src={empty} alt="no record" />
                    <Text color="#A7A7A7" fontSize={"18px"}>
                      No Records
                    </Text>
                  </Box>
                ) : (
                  data?.payload.content.map(
                    (item, index) =>
                      item.tranx_type == "credit" && (
                        <Box
                          key={index}
                          pt="1rem"
                          display={"flex"}
                          justifyContent="space-between"
                        >
                          <Box display={"flex"} gap=".7rem">
                            <chakra.span>
                              {item.tranx_type == "debit" ? (
                                <Image src={redDot} alt="red dot" />
                              ) : (
                                <Image src={greenDot} alt="green dot" />
                              )}
                            </chakra.span>
                            <Box display="flex" flexDir="column">
                              <Text color="nairablue" fontSize={"18px"}>
                                {item.description || item.tranx_description}
                              </Text>
                              <Text color="nairagrey" fontSize={"13px"}>
                                {item.date_created}
                              </Text>
                            </Box>
                          </Box>
                          <Text
                            color="nairablue"
                            fontWeight={600}
                            fontSize="1.125rem"
                          >
                            <chakra.span>
                              <Image src={smallnairasign} alt="nairasign" />
                            </chakra.span>
                            {item.amount}
                          </Text>
                        </Box>
                      )
                  )
                )}
              </TabPanel>
              <TabPanel overflowY={"scroll"}>
                {isLoading || !data ? (
                  <Box
                    py="10rem"
                    display={"flex"}
                    flexDir="column"
                    alignItems={"center"}
                  >
                    <Spinner />
                  </Box>
                ) : data?.payload?.totalLength === 0 ? (
                  <Box
                    py="10rem"
                    display={"flex"}
                    flexDir="column"
                    alignItems={"center"}
                  >
                    <Image src={empty} alt="no record" />
                    <Text color="#A7A7A7" fontSize={"18px"}>
                      No Records
                    </Text>
                  </Box>
                ) : (
                  data?.payload.content.map(
                    (item, index) =>
                      item.tranx_type == "debit" && (
                        <Box
                          key={index}
                          pt="1rem"
                          display={"flex"}
                          justifyContent="space-between"
                        >
                          <Box display={"flex"} gap=".7rem">
                            <chakra.span>
                              {item.tranx_type == "debit" ? (
                                <Image src={redDot} alt="red dot" />
                              ) : (
                                <Image src={greenDot} alt="green dot" />
                              )}
                            </chakra.span>
                            <Box display="flex" flexDir="column">
                              <Text color="nairablue" fontSize={"18px"}>
                                {item.description || item.tranx_description}
                              </Text>
                              <Text color="nairagrey" fontSize={"13px"}>
                                {item.date_created}
                              </Text>
                            </Box>
                          </Box>
                          <Text
                            color="nairablue"
                            fontWeight={600}
                            fontSize="1.125rem"
                          >
                            <chakra.span>
                              <Image src={smallnairasign} alt="nairasign" />
                            </chakra.span>
                            {item.amount}
                          </Text>
                        </Box>
                      )
                  )
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          mb={{ base: "3rem", md: "5.375rem" }}
          display={"flex"}
          justifyContent="space-evenly"
          pt="3rem"
          alignItems={"center"}
          maxW={"90%"}
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: "1rem", md: "0" }}
        >
          <Text fontSize={"14px"} color="#A7A7A7">
            {page === 1
              ? `Showing 1 - 10 of ${data?.payload?.content.length}`
              : `Showing ${page - 1}1 - ${page * 10} of ${
                  data?.payload?.content.length
                }`}
          </Text>
          <Box flexWrap={"wrap"} display={"flex"} gap="11px" maxW={"inherit"}>
            {modifieddata.slice(0, 5).map((item, index) => {
              return (
                <Square
                  key={index}
                  color={page === index + 1 ? "white" : "nairablue"}
                  size={"2.1rem"}
                  bgColor={page === index + 1 ? "nairablue" : "transparent"}
                  fontSize={"14px"}
                  borderRadius={"5px"}
                  border="1px solid"
                  cursor={"pointer"}
                  onClick={() => {
                    setPage(index + 1);
                  }}
                >
                  {index + 1}
                </Square>
              );
            })}
            <Square
              color="nairablue"
              border="1px solid"
              w={"3rem"}
              fontSize={"14px"}
              borderRadius={"5px"}
              cursor={"pointer"}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </Square>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Wallet;

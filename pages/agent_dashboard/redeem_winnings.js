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
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Tbody,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
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
import { useEffect } from "react";
import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";
import AgentWinnings from "../../components/agentWinnings";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const RedeemWinnings = () => {
  const toast = useToast();
  const { user } = useUser();
  const [data, setData] = useState("");
  const [balance, setBalance] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const bearerToken = user?.token;

  useEffect(() => {
    if (!bearerToken) return;

    async function fetchDailyWinners() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/agent/winnings`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      try {
        setIsLoading(true);
        const response = await axios(config);
        setData(response?.data);
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
        url: `${BASE_URL}/api/agent/wallet_balance`,
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

    // fetchTransaction();
    fetchBalance();
    fetchDailyWinners();
  }, [bearerToken, toast]);
  const someFunc = () => {
    setIsOpenModal(false);
    onClose();
  };

  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Agent Redeem Winnings</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
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
          Redeem Winnings (Customer Games)
        </Text>
        <Box display={"flex"} alignItems="center" gap="1.6rem">
          <Box as={NextLink} href="/editprofile">
            <Avatar
              name={user?.details?.fullname}
              src={user?.details?.customer_path}
              bg="rgba(30, 215, 96, 0.19)"
              cursor={"pointer"}
            />
          </Box>
        </Box>
      </Box>
      <Box pt="1.3rem" fontFamily={"poppins"}>
        {/* <Heading
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.875rem" }}
          color="nairablue"
          fontFamily={"poppins"}
        >
          Customer Games
        </Heading> */}
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
            {/* <TabList
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
                Winnings
              </Tab>
            </TabList> */}
            <TabPanels>
              <TabPanel overflowY={"scroll"}>
                <Box w="100%" marginX={"0%"}>
                  <TableContainer overflowX={"scroll"} w="100%">
                    <Table variant={"simple"}>
                      <Thead>
                        <Tr
                          bgColor="nairablue"
                          borderRadius={"5px"}
                          py="1rem"
                          display={"flex"}
                          fontFamily="poppins"
                          justifyContent={"space-evenly"}
                          mb="1.8rem"
                        >
                          <Th border={"none"}>
                            <Text
                              color="white"
                              fontWeight={700}
                              fontSize={{ base: ".7rem", md: "xl" }}
                            >
                              Date
                            </Text>
                          </Th>

                          <Th border={"none"}>
                            <Text
                              color="white"
                              fontWeight={700}
                              fontSize={{ base: ".7rem", md: "xl" }}
                            >
                              Amount
                            </Text>
                          </Th>
                          <Th border={"none"}>
                            <Text
                              color="white"
                              fontWeight={700}
                              fontSize={{ base: ".7rem", md: "xl" }}
                            >
                              Name
                            </Text>
                          </Th>
                          <Th border={"none"}>
                            <Text
                              color="white"
                              fontWeight={700}
                              fontSize={{ base: ".7rem", md: "xl" }}
                            >
                              Status
                            </Text>
                          </Th>
                          <Th border={"none"}>
                            <Text
                              color="white"
                              fontWeight={700}
                              fontSize={{ base: ".7rem", md: "xl" }}
                            >
                              Action
                            </Text>
                          </Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {isLoading || !data ? (
                          <Box
                            py="10rem"
                            display={"flex"}
                            flexDir="column"
                            alignItems={"center"}
                          >
                            <Spinner />
                          </Box>
                        ) : data.payload?.total_winning === "0" ? (
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
                          data.payload?.winning_history?.map((item, index) => (
                            <AgentWinnings item={item} key={index}/>
                          ))
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default RedeemWinnings;

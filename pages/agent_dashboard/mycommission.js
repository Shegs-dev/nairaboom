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
import NextLink from "next/link";
import Wrapper from "../../components/Wrapper";
import useUser from "../../lib/hooks/useUser";
import empty from "../../public/dashboard/empty.png";
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
        url: `${BASE_URL}/api/bonus_history`,
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
          My Commissions
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
        <Box w={{ base: "100%" }} mt="2.4rem" fontFamily={"poppins"}>
          <Tabs isFitted variant="unstyled">
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
                              Type
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
                          data.payload?.content?.map((item, index) => (
                            <>
                              <Tr
                                display={"flex"}
                                justifyContent={{
                                  base: "space-between",
                                  md: "space-evenly",
                                }}
                                // justifyContent={"space-between"}
                                fontFamily="poppins"
                              >
                                <Td
                                  fontSize={{ base: "0.8rem", md: "1.125rem" }}
                                  color="nairablue"
                                >
                                  {item.date_created.split(' ')[0]} <br/>
                                  {item.date_created.split(' ')[1]}
                                </Td>
                                <Td
                                  fontSize={{ base: "0.8rem", md: "1.125rem" }}
                                  color="nairablue"
                                >
                                  {`₦ ${item.amount} `}
                                </Td>
                                <Td
                                  fontSize={{ base: "0.8rem", md: "1.125rem" }}
                                  color="nairablue"
                                >
                                  {item.bonus_type}
                                </Td>
                              </Tr>
                            </>
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

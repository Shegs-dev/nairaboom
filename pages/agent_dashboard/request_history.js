import {
  Box,
  Text,
  Avatar,
  HStack,
  Spinner,
  TableContainer,
  Table,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  useDisclosure,
  useToast,
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
  Square,
} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import NextLink from "next/link";
import Head from "next/head";
import useUser from "../../lib/hooks/useUser";
import Image from "next/legacy/image";
import empty_records from "../../public/dashboard/empty_record.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";
import GameComp from "../../components/gameHistoryComp";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const RequestHistory = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [modifieddata, setmodifiedData] = useState([]);
  const [page, setPage] = useState(1);
  const toast = useToast();

  const bearerToken = user?.token;

  useEffect(() => {
    if (!bearerToken) return;

    async function fetchData() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/agent/request_history`,
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
        //   err,
        //   position: "top",
        // });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [bearerToken]);

  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Agent Request History</title>
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
          My Game History
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
      {/* <Box>
        <HStack justifyContent={"space-between"}>
          <Text
            fontWeight={500}
            color="#A7A7A7"
            fontSize={{ base: "1rem", md: "xl" }}
          >
            Date
          </Text>
          <Text
            pl="3rem"
            fontWeight={500}
            color="#A7A7A7"
            fontSize={{ base: "1rem", md: "xl" }}
          >
            Name
          </Text>
          <Text
            pl="3rem"
            fontWeight={500}
            color="#A7A7A7"
            fontSize={{ base: "1rem", md: "xl" }}
          >
            Phone No.
          </Text>
          <Text
            pl="3rem"
            fontWeight={500}
            color="#A7A7A7"
            fontSize={{ base: "1rem", md: "xl" }}
          >
            Alert Type
          </Text>
          <Text
            pl="3rem"
            fontWeight={500}
            color="#A7A7A7"
            fontSize={{ base: "1rem", md: "xl" }}
          >
            Amount
          </Text>
          <Text
            fontWeight={500}
            color="#A7A7A7"
            fontSize={{ base: "1rem", md: "xl" }}
          >
            Action
          </Text>
        </HStack>
        <Box
          pt="2rem"
          display={"flex"}
          flexDir="column"
          alignItems={"center"}
          gap="2rem"
        >
          {isLoading || !data ? (
            <Box
              py="10rem"
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Spinner />
            </Box>
          ) : data?.payload?.totalLength === 0 ? (
            <Box
              py="10rem"
              display={"flex"}
              flexDir="column"
              justifyContent="center"
              alignItems={"center"}
            >
              <Image src={empty_records} alt="no record" />
              <Text color="#A7A7A7" fontSize={"18px"}>
                No Records
              </Text>
            </Box>
          ) : (
            data.payload.content.map((item, index) => (
              <Box
                key={index}
                display={"flex"}
                flexDir="row"
                alignItems={"center"}
                justifyContent="space-between"
                w="100%"
              >
                <Text color="nairablue" fontWeight={500}>
                  {item.date_received_alert}
                </Text>
                <Text
                  color="nairablue"
                  fontWeight={500}
                >{`${item.amount}`}</Text>
                <Text
                  color="nairablue"
                  fontWeight={500}
                >{`${item.amount}`}</Text>
                <Text
                  color="nairablue"
                  fontWeight={500}
                >{`${item.alert_type}`}</Text>
                <Text
                  color="nairablue"
                  fontWeight={500}
                >{`${item.amount}`}</Text>
                <Text color="nairablue" fontWeight={500}>
                  {item.cashback_time}
                </Text>
              </Box>
            ))
          )}
        </Box>
      </Box> */}
      <Tabs isFitted variant="unstyled">
        <Box>
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
                           WheelNo
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
                          justifyContent="center"
                          alignItems={"center"}
                        >
                          <Spinner />
                        </Box>
                      ) : data?.payload?.totalLength === 0 ? (
                        <Box
                          py="10rem"
                          display={"flex"}
                          flexDir="column"
                          justifyContent="center"
                          alignItems={"center"}
                        >
                          <Image src={empty_records} alt="no record" />
                          <Text color="#A7A7A7" fontSize={"18px"}>
                            No Records
                          </Text>
                        </Box>
                      ) : (
                        <>
                          {/* {page === 1 && (
                            <>
                              {data.payload.content
                                .slice(page, page * 10 + 1)
                                ?.map((item, index) => (
                                  <GameComp item={item} key={index} />
                                ))}
                            </>
                          )}
                          {page > 1 && (
                            <>
                              {modifieddata[[page -1]]
                                ?.map((item, index) => (
                                  <GameComp item={item} key={index} />
                                ))}
                            </>
                          )} */}
                          {modifieddata[[page - 1]]?.map((item, index) => (
                            <GameComp item={item} key={index} />
                          ))}
                        </>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              {/* <Box
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

              </Box> */}
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
            {modifieddata?.map((item, index)=>{
              return (
                <Square
                key = {index}
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
              )
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
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </Wrapper>
  );
};

export default RequestHistory;

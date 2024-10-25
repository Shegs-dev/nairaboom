import {
  Box,
  Text,
  Avatar,
  HStack,
  Spinner,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Square,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import NextLink from "next/link";
import useUser from "../../lib/hooks/useUser";
import Image from "next/legacy/image";
import empty_records from "../../public/dashboard/empty_record.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";
import RequesthistoryComp from "../../components/requesthistoryComp";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const RequestHistory = () => {
  const { onOpen, onClose } = useDisclosure();
  const someFunc = () => {
    setIsOpen(false);
    onClose();
  };

  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const toast = useToast();
  const bearerToken = user?.token;
  const [isOpen, setIsOpen] = useState(false);
  const [modifieddata, setmodifiedData] = useState([]);
  const [page, setPage] = useState(1);

  const demoItem = [
    {
      date_received_alert: "01-01-2023",
      amount: "500",
      alert_type: "Credit",
      cashback_time: "04:13:44",
      numbers: [21, 22, 12, 13],
    },
    {
      date_received_alert: "02-01-2023",
      amount: "600",
      alert_type: "Debit",
      cashback_time: "04:23:44",
      numbers: [4, 23, 11, 31],
    },
  ];

  useEffect(() => {
    if (!bearerToken) return;

    async function fetchData() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/request_history?start=0&len=20&paging=2`,
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

    fetchData();
  }, [bearerToken, toast]);

  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Customer Request History</title>
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
          <Text fontWeight={500} color="#A7A7A7" fontSize={"xl"}>
            s/n
          </Text>
          <Text fontWeight={500} color="#A7A7A7" fontSize={"xl"}>
            Date
          </Text>
          <Text pl="3rem" fontWeight={500} color="#A7A7A7" fontSize={"xl"}>
            Alert Type
          </Text>
          <Text pl="3rem" fontWeight={500} color="#A7A7A7" fontSize={"xl"}>
            Stake Amount
          </Text>
          <Text fontWeight={500} color="#A7A7A7" fontSize={"xl"}></Text>
          <Text fontWeight={500} color="#A7A7A7" fontSize={"xl"}>
          </Text>
        </HStack>
        <Box display={"flex"} flexDir="column" alignItems={"center"} gap="2rem">
          {isLoading || !data || data === null ? (
            <Box
              py="10rem"
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Spinner />
            </Box>
          ) : demoItem.totalLength === 0 ? (
            <Box
              py="10rem"
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Image src={empty_records} alt="no record" />
              <Text color="#A7A7A7" fontSize={"18px"}>
                No Records
              </Text>
            </Box>
          ) : (
            data.payload?.content?.map((item, index) => (
              <Box
                key={index}
                display={"flex"}
                flexDir="row"
                alignItems={"center"}
                justifyContent="space-between"
                w="100%"
              >
                <Text
                  fontSize={{ base: "1rem", md: "lg" }}
                  color="nairablue"
                  fontWeight={500}
                  textAlign="center"
                >
                  {index + 1}
                </Text>
                <Text
                  fontSize={{ base: "1rem", md: "lg" }}
                  color="nairablue"
                  fontWeight={400}
                  textAlign="center"
                >
                  {item.date_received_alert}
                </Text>
                <Text
                  color="nairablue"
                  fontWeight={500}
                >{`${item.amount} via ${item.alert_type}`}</Text>
                <Text color="nairablue" fontWeight={500}>
                  {item.cashback_time}
                </Text>

                <Button onClick={() => setIsOpen(true)}>View More</Button>
                <Modal isCentered isOpen={isOpen} item={item} onClose={someFunc}>
                  <ModalOverlay />
                  <ModalContent
                    fontFamily={"poppins"}
                    w={{ base: "90%", md: "40%" }}
                    maxW={"95%"}
                    p={{ base: "1rem", md: "3rem" }}
                  >
                    <ModalHeader>View More Button</ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>
                      <Text color="nairablue" fontWeight={500}>
                        Date: {item.date_received_alert}
                      </Text>
                      <Text color="nairablue" fontWeight={500}>
                        Alert Type: {`${item.amount} via ${item.alert_type}`}
                      </Text>
                      <Text color="nairablue" fontWeight={500}>
                        Time: {item.cashback_time}
                      </Text>
                      <Text color="nairablue" fontWeight={500}>
                        Time: {item.cashback_time}
                      </Text>

                      <Text color="nairablue" fontWeight={500}>
                        Numbers Spinned
                      </Text>
                      <Box
                        display={"flex"}
                        justifyContent="center"
                        alignItems="center"
                        gap="4"
                        my="4"
                      >
                        {item.numbers.map((num) => {
                          return (
                            <Text
                              fontWeight={700}
                              fontSize="1.5rem"
                              color="nairablue"
                              p={"0.7em"}
                              backgroundColor="gray.500"
                              borderRadius={"10px"}
                            >
                              {num}
                            </Text>
                          );
                        })}
                      <Box>
                        <Text
                          fontWeight={700}
                          fontSize="1.5rem"
                          color="nairablue"
                          p={"1em"}
                          backgroundColor="gray.500"
                          borderRadius={"10px"}
                        >
                          4
                        </Text>
                      </Box>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            ))
          )}
        </Box>
      </Box> */}

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
                {/* <Th border={"none"}>
                  <Text
                    color="white"
                    fontWeight={700}
                    fontSize={{ base: ".7rem", md: "xl" }}
                  >
                    S/N
                  </Text>
                </Th> */}

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
                    Alert Type
                  </Text>
                </Th>
                <Th border={"none"}>
                  <Text
                    color="white"
                    fontWeight={700}
                    fontSize={{ base: ".7rem", md: "xl" }}
                  >
                    Stake Amount
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
              {isLoading ? (
                <Box
                  py="10rem"
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Spinner />
                </Box>
              ) : !data || data === null || demoItem.totalLength === 0 ? (
                <Box
                  py="10rem"
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Image src={empty_records} alt="no record" />
                  <Text color="#A7A7A7" fontSize={"18px"}>
                    No Records
                  </Text>
                </Box>
              ) : (
                // data?.payload?.content.map((item, index) => (
                //   <RequesthistoryComp key={index} item={item}/>
                // ))
                modifieddata[[page - 1]]?.map((item, index) => (
                  <RequesthistoryComp key={index} item={item} />
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

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
            {modifieddata?.map((item, index) => {
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

export default RequestHistory;

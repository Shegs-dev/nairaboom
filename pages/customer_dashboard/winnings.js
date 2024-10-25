import {
  Box,
  Text,
  Input,
  Avatar,
  Button,
  Link,
  useToast,
  Spinner,
  TableContainer,
  Table,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  useDisclosure,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Square,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/legacy/image";
import searchIcon from "../../public/dashboard/search.png";
import NextLink from "next/link";
import winning from "../../public/winning/winning-icon.png";
import Wrapper from "../../components/Wrapper";
import useUser from "../../lib/hooks/useUser";
import empty_record from "../../public/dashboard/empty_record.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";
import AgentWinnings from "../../components/wincomp";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const Winnings = () => {
  const toast = useToast();
  const { user, error } = useUser();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const bearerToken = user?.token;

  useEffect(() => {
    if (!bearerToken) return;

    async function fetchData() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/winnings`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);
        setData(response?.data);
      } catch (error) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: "Something went wrong, please check connection and try again",
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [bearerToken, toast]);

  return (
    <Wrapper>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        pb="2.25rem"
      >
        <Text
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
          color="nairablue"
        >
          My Winnings
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
        pt="2.2rem"
        pb="3.8rem"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Box
          bgColor={"white"}
          borderRadius="20px"
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent={"space-between"}
          pl="2rem"
          gap="1.25rem"
          w="100%"
          py={{ base: "1.5rem", md: "2.5rem" }}
          pr="2.68rem"
        >
          <Box display={"flex"} gap={"1.375rem"}>
            <Box>
              <Image src={winning} alt="total transactions" />
            </Box>
            <Box display={"flex"} flexDir="column">
              <Text
                fontSize={{ base: "1rem", md: "xl" }}
                fontWeight={500}
                color={"nairagrey"}
              >
                Total Winnings
              </Text>
              <Box>
                {isLoading || !data ? (
                  <Spinner />
                ) : (
                  <Text
                    color="nairablue"
                    fontWeight={700}
                    fontSize={{ base: "2.25rem", md: "2.75rem" }}
                  >
                    {data?.payload?.total_winning}
                  </Text>
                )}
              </Box>
            </Box>
          </Box>
          <NextLink href="/daily-winners" passHref legacyBehavior>
            <Link
              fontWeight={600}
              fontSize=".8rem"
              bgColor="nairagreen"
              color="white"
              borderRadius="md"
              transition={"all ease-in-out .4s"}
              _hover={{
                color: "nairagreen",
                bg: "white",
                border: "1px solid",
                borderColor: "nairagreen",
              }}
              textAlign="center"
              py={"1rem"}
              w="11rem"
              mt="1.5rem"
              boxShadow={"inner"}
              bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
              alignSelf={{ base: "-moz-initial", md: "flex-end" }}
            >
              View Daily Winners
            </Link>
          </NextLink>
        </Box>
      </Box>
      {/* <Box
        display={"flex"}
        w={{ base: "100%", md: "90%" }}
        flexDir="column"
        gap={{ base: "1.5rem", md: "2rem" }}
      >
        <Text
          color="nairablue"
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
        >
          My Winning History
        </Text>
        <Box
          display={"flex"}
          justifyContent="space-between"
          px={{ base: "0rem", md: "1rem" }}
        >
          <Text
            color="nairagrey"
            fontWeight={500}
            fontSize={{ base: "1rem", md: "1.25rem" }}
          >
            S/N
          </Text>
          <Text
            color="nairagrey"
            fontWeight={500}
            fontSize={{ base: "1rem", md: "1.25rem" }}
          >
            Amount won
          </Text>
          <Text
            color="nairagrey"
            fontWeight={500}
            fontSize={{ base: "1rem", md: "1.25rem" }}
          >
            Timestamp
          </Text>
        </Box>
        <Box display={"flex"} flexDir="column" gap="2rem">
          {isLoading || !data ? (
            <Box
              py="6rem"
              display={"flex"}
              flexDir="column"
              alignItems={"center"}
            >
              <Spinner />
            </Box>
          ) : data?.payload?.total_winning == 0 ? (
            <Box
              py="6rem"
              display={"flex"}
              flexDir="column"
              alignItems={"center"}
              gap="2rem"
            >
              <Image src={empty_record} alt="no record" />
              <Text color="#A7A7A7" fontSize={"18px"}>
                No Records
              </Text>
            </Box>
          ) : (
            data?.payload?.winning_history.map((item, index) => (
              <Box
                key={index}
                display={"flex"}
                justifyContent="space-between"
                pl={{ base: ".5rem", md: "1.5rem" }}
                pr={{ base: ".5rem", md: "2.5rem" }}
                maxH="25rem"
                overflowY="scroll"
              >
                <Text
                  fontSize={{ base: "1rem", md: "lg" }}
                  color="nairablue"
                  fontWeight={400}
                >
                  {index + 1}
                </Text>
                <Text
                  fontSize={{ base: "1rem", md: "lg" }}
                  color="nairablue"
                  fontWeight={400}
                >
                  {item.timestamp_time}
                </Text>
                <Text
                  fontSize={{ base: "1rem", md: "lg" }}
                  color="nairablue"
                  fontWeight={400}
                >
                  {item.amount_won}
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
                            Type
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
                          {data.payload?.winning_history.map((item, index) => (
                            <AgentWinnings item={item} key={index} />
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
                <Box
                  flexWrap={"wrap"}
                  display={"flex"}
                  gap="11px"
                  maxW={"inherit"}
                >
                  {modifieddata?.map((item, index) => {
                    return (
                      <Square
                        key={index}
                        color={page === index + 1 ? "white" : "nairablue"}
                        size={"2.1rem"}
                        bgColor={
                          page === index + 1 ? "nairablue" : "transparent"
                        }
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
              </Box> */}
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </Wrapper>
  );
};

export default Winnings;

import Head from "next/head";
import React from "react";
import BackgroundTitle from "../components/BackgroundTitle";
import Clock from "../components/Clock";
import FooterComponent from "../components/Footer";
import NavBar from "../components/NavBar";
import background from "../public/aboutpage/background.png";
import { AUTH_API_ROUTES } from "../utils/routes";
import useUser from "../lib/hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import empty_records from "../public/dashboard/empty_record.png";
import {
  Box,
  chakra,
  Heading,
  Text,
  Input,
  Button,
  Square,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/legacy/image";
// import Footer2 from "../components/homepage/Footer2";
import Footer3 from "../components/homepage/Footer3";
import Navbar2 from "../components/homepage/Nav";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

function DailyResults() {
  const [data, setData] = useState("");

  const [page, setPage] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  //retrieve user
  const { user } = useUser();

  const dat_ = [
    {
      ID: "1",
      fullname: "Oluwaseun Test",
      phone_number: "08109894456",
      amount_won: "100000.00",
      date_won: "2022-08-30",
      lucky_time: "01:43:19",
    },
  ];

  useEffect(() => {
    async function fetchDailyWinners() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/boom_number_history`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
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
  }, [toast, page]);
  return (
    <Box>
      <Head>
        <title>Nairaboom - Daily Result</title>
        <meta name="description" content="World’sPioneerFintechBingoGame" />
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

      {/* <NavBar /> */}
      <Navbar2/>
      <BackgroundTitle
        image={background}
        longbit="Win"
        // shortbit="ings"
        shortbit="ners"
      />

      <Box>
        <Box
          py="5rem"
          mt="1.5rem"
          w="100%"
          bg={"white"}
          borderRadius="md"
          maxW={{ md: "50%" }}
          margin={{ md: "0 auto" }}
        >
          <Box>
            <Heading
              color={"white"}
              textAlign={"center"}
              bg={"nairablue"}
              py={{ base: "0.3em", md: "0.5em" }}
            >
              Latest Winners{" "}
            </Heading>
          </Box>
        </Box>
        <Box w="90%" marginX={"5%"}>
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
                      S/N
                    </Text>
                  </Th>

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
                      Name
                    </Text>
                  </Th>
                  <Th border={"none"}>
                    <Text
                      color="white"
                      fontWeight={700}
                      fontSize={{ base: ".7rem", md: "xl" }}
                    >
                      Amount Won( &#8358;)
                    </Text>
                  </Th>

                  {/* 
                    <Th border={"none"}>
                      <Text
                        color="white"
                        fontWeight={700}
                        fontSize={{ base: ".7rem", md: "xl" }}
                      >
                        Amount won
                      </Text>
                    </Th> */}

                  {/* <Th border={"none"}>
                      <Text
                        color="white"
                        fontWeight={700}
                        fontSize={{ base: ".7rem", md: "xl" }}
                      >
                        Date won
                      </Text>
                    </Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {/* {isLoading || !data ? (
                  <Tr
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"center"}
                    py="15rem"
                  >
                    <Td>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : data?.payload.totalLength === 0 ? (
                  <Tr
                    py="15rem"
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Td color="#A7A7A7" fontSize={"18px"}>
                      <Image src={empty_records} alt="no record" />
                      <Text>No Records</Text>
                    </Td>
                  </Tr>
                ) : (
                  data?.payload.content.map((item, index) => (
                    <Tr
                      display={"flex"}
                      justifyContent={{
                        base: "space-between",
                        md: "space-evenly",
                      }}
                      fontFamily="poppins"
                      key={index}
                    >
                      <Td
                        fontSize={{ base: "0.8rem", md: "1.125rem" }}
                        color="nairablue"
                      >
                        {index + 1}
                      </Td>
                      <Td
                        fontSize={{ base: "0.8rem", md: "1.125rem" }}
                        color="nairablue"
                      >
                        {item.date_created}
                      </Td>
                      <Td
                        fontSize={{ base: "0.8rem", md: "1.125rem" }}
                        color="nairablue"
                      >
                        {item.timestamp_perm}
                      </Td>
                      <Td
                        fontSize={{ base: "0.8rem", md: "1.125rem" }}
                        color="nairablue"
                      >
                        {item.timestamp_perm}
                      </Td>
                    </Tr>
                  ))
                )} */}

                {/* {data === null ||
                data.payload?.content === null ||
                data.payload?.content.length < 1 ? (
                  <Tr
                    py="15rem"
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Td color="#A7A7A7" fontSize={"18px"}>
                      <Image src={empty_records} alt="no record" />
                      <Text>No Records</Text>
                    </Td>
                  </Tr>
                ) : 
                  data?.payload?.content.map((item, index) => (
                  <Tr
                    display={"flex"}
                    justifyContent={{
                      base: "space-between",
                      md: "space-evenly",
                    }}
                    fontFamily="poppins"
                    key={index}
                  >
                    <Td
                      fontSize={{ base: "0.8rem", md: "1.125rem" }}
                      color="nairablue"
                    >
                      {index + 1}
                    </Td>
                    <Td
                      fontSize={{ base: "0.8rem", md: "1.125rem" }}
                      color="nairablue"
                    >
                      {item.date_won}
                    </Td>
                    <Td
                      fontSize={{ base: "0.8rem", md: "1.125rem" }}
                      color="nairablue"
                    >
                      {item.fullname}
                    </Td>
                    <Td
                      fontSize={{ base: "0.8rem", md: "1.125rem" }}
                      color="nairablue"
                    >
                      {item.amount_won}
                    </Td>
                  </Tr>
                  )
                )} */}

                <Tr
                  py="15rem"
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Td color="#A7A7A7" fontSize={"18px"}>
                    <Image src={empty_records} alt="no record" />
                    <Text>No Records</Text>
                  </Td>
                </Tr>
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
                ? `Showing 1 - 10 of ${data?.payload?.totalLength}`
                : `Showing ${page - 1}1 - ${page * 10} of ${
                    data?.payload?.totalLength
                  }`}
            </Text>
            <Box flexWrap={"wrap"} display={"flex"} gap="11px" maxW={"inherit"}>
              <Square
                color={page === 1 ? "white" : "nairablue"}
                size={"2.1rem"}
                bgColor={page === 1 ? "nairablue" : "transparent"}
                fontSize={"14px"}
                borderRadius={"5px"}
                border="1px solid"
                cursor={"pointer"}
                onClick={() => {
                  setPage(1);
                }}
              >
                1
              </Square>
              <Square
                color={page === 2 ? "white" : "nairablue"}
                border="1px solid"
                size={"2.1rem"}
                fontSize={"14px"}
                bgColor={page === 2 ? "nairablue" : "transparent"}
                borderRadius={"5px"}
                cursor={"pointer"}
                onClick={() => {
                  setPage(2);
                }}
              >
                2
              </Square>
              <Square
                color={page === 3 ? "white" : "nairablue"}
                bgColor={page === 3 ? "nairablue" : "transparent"}
                border="1px solid"
                size={"2.1rem"}
                fontSize={"14px"}
                borderRadius={"5px"}
                cursor={"pointer"}
                onClick={() => {
                  setPage(3);
                }}
              >
                3
              </Square>

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
      </Box>

      {/* <FooterComponent /> */}
      <Footer3/>
    </Box>
  );
}

export default DailyResults;

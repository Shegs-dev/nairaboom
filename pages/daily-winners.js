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
import NavBar from "../components/NavBar";
import FooterComponent from "../components/Footer";
import background from "../public/aboutpage/background.png";
import party from "../public/party.png";
import Image from "next/legacy/image";
import coil2 from "../public/aboutpage/coil2.png";
import searchIcon from "../public/whitesearch.png";
import confetti from "../public/confetti.png";
import useUser from "../lib/hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import empty_records from "../public/dashboard/empty_record.png";
import { AUTH_API_ROUTES } from "../utils/routes";
import Navbar2 from "../components/homepage/Nav";
import Footer2 from "../components/homepage/Footer2";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const DailyWinners = () => {
  const [data, setData] = useState("");

  const [page, setPage] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  //retrieve user
  const { user } = useUser();

  const dat_ = [
    {
      "ID": "1",
      "fullname": "Oluwaseun Test",
      "phone_number": "08109894456",
      "amount_won": "100000.00",
      "date_won": "2022-08-30",
      "lucky_time": "01:43:19"
    }
  ]

  useEffect(() => {
    async function fetchDailyWinners() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/list_daily_winners?start=0&len=10&paging=${page}`,
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
      {/* <NavBar /> */}
      <Navbar2/>
      <Box
        backgroundImage={`url(${background.src})`}
        backgroundPosition={{ base: "right", md: "center" }}
        backgroundRepeat="no-repeat"
        backgroundSize={"cover"}
        backgroundAttachment="fixed"
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        py={{ base: "6rem", md: "8rem", lg: "10rem" }}
      >
        <Heading
          color={"nairablue"}
          fontSize={{ base: "2rem", md: "4rem" }}
          fontWeight={700}
          fontFamily={"poppins"}
          textAlign={"center"}
        >
          Daily Win
          <chakra.span
            borderRadius={"4px"}
            borderBottom="10px solid"
            borderColor="nairagreen"
          >
            ners
          </chakra.span>
        </Heading>
        <Box maxW={"30%"}>
          <Image src={party} alt="party" />
        </Box>
      </Box>
      <Box
        bgColor={"white"}
        backgroundImage={`url(${coil2.src})`}
        backgroundPosition="right top"
        backgroundRepeat="no-repeat"
        pt="7.5rem"
        fontFamily={"poppins"}
        display="flex"
        flexDir={"column"}
        alignItems="center"
      >
        <Text
          pb="1.6rem"
          fontSize={{ base: "1.2rem", md: "1.5rem" }}
          fontWeight={700}
          color="nairablue"
        >
          Check My Number
        </Text>
        <form action="">
          <Box
            display={"flex"}
            w={{ base: "90%", md: "33.75rem" }}
            h={{ base: "4rem", md: "4rem" }}
            borderRadius={"15px"}
            bgColor={"#F6F6F6"}
          >
            <Input
              type="text"
              placeholder="Input your number here to check"
              h="100%"
              focusBorderColor="none"
              border={"none"}
              _placeholder="#A7A7A7"
            />
            <Button
              float={"right"}
              // type="submit"
              bgColor={"nairagreen"}
              w="5rem"
              h={{ base: "4rem", md: "4rem" }}
              _hover={{}}
            >
              <Image src={searchIcon} alt="search icon" />
            </Button>
          </Box>
        </form>
        <Box
          backgroundImage={`url(${confetti.src})`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          mt={{ base: "4rem", md: "6.3rem" }}
          bgColor={"#F6F6F6"}
          borderRadius={{ base: "1.6rem", md: "2.1rem" }}
          pt={{ base: "2rem", md: "4.5rem" }}
          pb={{ base: "2rem", md: "3.5rem" }}
          display={"flex"}
          flexDir="column"
          fontFamily={"poppins"}
          color="nairablue"
          w={{ base: "99%", md: "90%" }}
          alignItems={"center"}
        >
          <Text
            fontWeight={700}
            fontSize={{ base: "1.2rem", md: "1.5rem" }}
            pb="3rem"
          >
            List Of Daily Winners
          </Text>
          <Box w="90%">
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
                        Full Name
                      </Text>
                    </Th>

                    <Th border={"none"}>
                      <Text
                        color="white"
                        fontWeight={700}
                        fontSize={{ base: ".7rem", md: "xl" }}
                      >
                        Phone Number
                      </Text>
                    </Th>

                    <Th border={"none"}>
                      <Text
                        color="white"
                        fontWeight={700}
                        fontSize={{ base: ".7rem", md: "xl" }}
                      >
                        Amount won
                      </Text>
                    </Th>

                    <Th border={"none"}>
                      <Text
                        color="white"
                        fontWeight={700}
                        fontSize={{ base: ".7rem", md: "xl" }}
                      >
                        Date won
                      </Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading || !data ? (
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
                    dat_.map((item, index) => (
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
                          {item.fullname} hmm
                        </Td>
                        <Td
                          fontSize={{ base: "0.8rem", md: "1.125rem" }}
                          color="nairablue"
                        >
                          {item.phone_number}
                        </Td>
                        <Td
                          fontSize={{ base: "0.8rem", md: "1.125rem" }}
                          color="nairablue"
                        >
                          {`${item.amount_won} Won`}
                        </Td>
                        <Td
                          fontSize={{ base: "0.8rem", md: "1.125rem" }}
                          color="nairablue"
                        >
                          {item.date_won}
                        </Td>
                      </Tr>
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
                  ? `Showing 1 - 10 of ${data?.payload?.totalLength}`
                  : `Showing ${page - 1}1 - ${page * 10} of ${
                      data?.payload?.totalLength
                    }`}
              </Text>
              <Box
                flexWrap={"wrap"}
                display={"flex"}
                gap="11px"
                maxW={"inherit"}
              >
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
      </Box>
      {/* <FooterComponent /> */}
      <Footer2/>
    </Box>
  );
};
export default DailyWinners;

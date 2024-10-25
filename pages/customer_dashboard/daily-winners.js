import {
  Box,
  Text,
  Avatar,
  Link,
  chakra,
  Input,
  Button,
  Square,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/legacy/image";
import avatar from "../../public/dashboard/avatar.svg";
import NextLink from "next/link";
import ArrowLeft from "../../public/daily-winners/ArrowLeft.png";
import confetti from "../../public/daily-winners/confetti.png";
import notificationbell from "../../public/dashboard/notification.svg";
import searchIcon from "../../public/daily-winners/search.png";
import Wrapper from "../../components/Wrapper";
import { AUTH_API_ROUTES } from "../../utils/routes";
import useUser from "../../lib/hooks/useUser";

const DailyWinners = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  // const toast = useToast();
  const { user, error } = useUser();
  // const [data, setData] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const bearerToken = user?.token;

  // useEffect(() => {
  //   if (!bearerToken) return;

  //   async function fetchData() {
  //     const config = {
  //       method: "get",
  //       url: `${BASE_URL}/api/winnings`,
  //       headers: {
  //         "X-APP-KEY": NAIRABOOM_KEY,
  //         Authorization: `Bearer ${bearerToken}`,
  //       },
  //     };

  //     try {
  //       setIsLoading(true);
  //       const response = await axios(config);
  //       setData(response?.data);
  //     } catch (error) {
  //       toast({
  //         isClosable: true,
  //         duration: 5000,
  //         status: "error",
  //         title: "Something went wrong, please check connection and try again",
  //         position: "top",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [bearerToken, toast]);

  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Customer Daily Winners</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
      </Head>
      <Box display={"flex"} justifyContent="space-between" pb="2.25rem">
        <NextLink href={"/winnings"} passHref legacyBehavior>
          <Box as={Link} display="flex" alignSelf={"flex-end"}>
            <Box>
              <Image src={ArrowLeft} alt="arrow left" />
            </Box>
            <chakra.span
              fontSize={".9rem"}
              color="#9E9E9E"
              pl=".4rem"
              _hover={{ color: "nairablue" }}
              textDecoration="none"
            >
              Back
            </chakra.span>
          </Box>
        </NextLink>
        <Box display={"flex"} alignItems="center" gap="1.6rem">
          <Box as={NextLink} href="/editprofile">
            <Avatar
              name={user?.data?.fullname}
              src={user?.data?.customer_path}
              bg="rgba(30, 215, 96, 0.19)"
              cursor={"pointer"}
            />
          </Box>
        </Box>
      </Box>
      <Box pt={{ base: "1.5rem", md: "2rem" }}>
        <Text color="nairablue" fontWeight={700} fontSize="xl">
          Daily Winners
        </Text>
      </Box>
      <Text
        pt={{ base: "1.5rem", md: "2.5rem" }}
        pb="1.2rem"
        color="nairablue"
        fontWeight={500}
        fontSize="1rem"
      >
        Check My Number
      </Text>
      <form action="">
        <Box
          display={"flex"}
          w={{ base: "100%", md: "26.25rem" }}
          h="3.8rem"
          borderRadius={"5px"}
          bgColor={"white"}
        >
          <Input
            type="text"
            placeholder="Input your number here to check"
            h="100%"
            focusBorderColor="none"
            border={"none"}
            _placeholder={{ color: "#A7A7A7" }}
          />
          <Button
            float={"right"}
            type="submit"
            bgColor={"nairagreen"}
            w="4.6rem"
            h="inherit"
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
        mt="2.5rem"
        bgColor={"white"}
        borderRadius={"1.3rem"}
        pt={"2.8rem"}
        pb={"1rem"}
        px={{ base: "1rem", md: "3rem" }}
        display={"flex"}
        flexDir="column"
        fontFamily={"poppins"}
        color="nairablue"
        w={"100%"}
        alignItems={"center"}
      >
        <Text fontWeight={700} fontSize="1rem" pb="1.875rem">
          List Of Daily Winners
        </Text>
        <Box w="100%">
          <Box
            bgColor="nairablue"
            borderRadius={"5px"}
            py="1.4rem"
            display={"flex"}
            fontFamily="poppins"
            justifyContent={"space-evenly"}
            mb="1.8rem"
          >
            <Text
              display={{ base: "none", md: "block" }}
              color="white"
              fontWeight={600}
              fontSize=".8rem"
            >
              S/N
            </Text>
            <Text color="white" fontWeight={600} fontSize=".8rem">
              Full Name
            </Text>
            <Text
              display={{ base: "none", md: "block" }}
              color="white"
              fontWeight={600}
              fontSize=".8rem"
            >
              Phone Number
            </Text>
            <Text color="white" fontWeight={600} fontSize=".8rem">
              Amount won
            </Text>
            <Text color="white" fontWeight={600} fontSize=".8rem">
              Date won
            </Text>
          </Box>
          <Box
            display={"flex"}
            flexDir="column"
            gap="1.4rem"
            mb={{ base: "4rem", md: "7.6rem" }}
          >
            {numbers.map((number, index) => (
              <Box
                display={"flex"}
                justifyContent={{ base: "space-between", md: "space-evenly" }}
                fontFamily="poppins"
                px={{ base: "1rem", md: "0rem" }}
                key={index}
              >
                <Text
                  display={{ base: "none", md: "block" }}
                  fontSize=".75rem"
                  color="nairablue"
                >
                  {number}
                </Text>
                <Text fontSize=".75rem" color="nairablue">
                  Nwabueze E.
                </Text>
                <Text
                  display={{ base: "none", md: "block" }}
                  fontSize=".75rem"
                  color="nairablue"
                >
                  *********08
                </Text>
                <Text fontSize=".75rem" color="nairablue">
                  ₦ 3,000 Won
                </Text>
                <Text fontSize=".75rem" color="nairablue">
                  2021-10-07
                </Text>
              </Box>
            ))}
          </Box>{" "}
          <Box
            mb={{ base: "3rem", md: "5.375rem" }}
            display={"flex"}
            justifyContent="space-evenly"
            alignItems={"center"}
            flexDir={{ base: "column", md: "row" }}
            gap={{ base: "1rem", md: "0" }}
          >
            <Text fontSize={"14px"} color="#A7A7A7">
              Showing 1 - 10 of 1,200
            </Text>
            <Box flexWrap={"wrap"} display={"flex"} gap="11px" maxW={"inherit"}>
              <Square
                color="white"
                size={"2.1rem"}
                bgColor={"nairablue"}
                fontSize={"14px"}
                borderRadius={"5px"}
              >
                1
              </Square>
              <Square
                color="nairablue"
                border="1px solid"
                size={"2.1rem"}
                fontSize={"14px"}
                borderRadius={"5px"}
              >
                2
              </Square>
              <Square
                color="nairablue"
                border="1px solid"
                size={"2.1rem"}
                fontSize={"14px"}
                borderRadius={"5px"}
              >
                3
              </Square>
              <Square
                color="nairablue"
                border="1px solid"
                size={"2.1rem"}
                fontSize={"14px"}
                borderRadius={"5px"}
              >
                ...
              </Square>
              <Square
                color="nairablue"
                border="1px solid"
                size={"2.1rem"}
                fontSize={"14px"}
                borderRadius={"5px"}
              >
                22
              </Square>
              <Square
                color="nairablue"
                border="1px solid"
                w={"3rem"}
                fontSize={"14px"}
                borderRadius={"5px"}
              >
                Next
              </Square>
            </Box>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default DailyWinners;

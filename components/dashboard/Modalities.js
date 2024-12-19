import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsChevronLeft } from "react-icons/bs";
import React from "react";
import { useRouter } from "next/router";

const WinningModalities = () => {
  const router = useRouter();
  return (
    <Flex alignItems="center" justifyContent="center" fontFamily="Inter">
      <Stack w="100%" alignItems="center" pt={{ base: 5, md: 10 }} spacing={10}>
        <HStack w="90%" maxW="60rem" justifyContent="center" pos="relative">
          <Box pos="absolute" left={0}>
            <BsChevronLeft size={20} onClick={() => router.back()} />
          </Box>
          <Text fontWeight={"semibold"} color={"#002047"} fontSize="1.5rem">
            Winning Modalities
          </Text>
        </HStack>
        <Text
          fontWeight={"semibold"}
          color={"#002047"}
          textAlign="center"
          maxW="60rem"
          px={{ base: 5, md: 10 }}
        >
          With Nairaboom every spin brings excitement and a chance to Win &
          Boom! With multiple winning modalities, Nairaboom guarantees an
          electrifying experience that will keep you coming back for more!
        </Text>
        <Stack w="100%" overflowX="auto">
          <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
            fontWeight={600}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                MODALITY
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text
                fontWeight={"semibold"}
                color={"#002047"}
                textAlign="center"
              >
                DISPLAY
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                WINNING
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                DESCRIPTION
              </Text>
            </GridItem>
          </Grid>

          {/* First row */}
          <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                4 Green Balls
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(4, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>15</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>23</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>31</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>7</Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                JACKPOT
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Win up to ₦ 35,000,000
              </Text>
            </GridItem>
          </Grid>

          {/* Second row */}
          <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                3 Green Balls
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(4, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>15</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>23</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="red">
                  <Text>26</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>7</Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                CASHOUT
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Win your Boom Coin Tokens (BCT) as Cash.
              </Text>
            </GridItem>
          </Grid>

          {/* Changed row */}
          <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                2 Green Balls
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(4, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="chocolate">
                  <Text>5</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>16</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>23</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="yellow">
                  <Text>11</Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                3 SURE ENTRY
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Earn an entry for 3 Sure Cashout & a chance to win your cumulative swaps
              </Text>
            </GridItem>
          </Grid>

          {/* Third row */}
          {/* <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                2 Green Boxes (Matching Numbers)
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(4, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="chocolate">
                  <Text>5</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>23</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>23</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="yellow">
                  <Text>11</Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                250% of Stake
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Win 250% of your Stake Amount
              </Text>
            </GridItem>
          </Grid> */}

          {/* Fourth row */}
          {/* <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                2 Green Boxes (Non Matching Numbers)
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(4, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="black" color="white">
                  <Text>9</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>7</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>15</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="purple" color="white">
                  <Text>20</Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                N250.00
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Win N250.00 in your Boom Wallet
              </Text>
            </GridItem>
          </Grid> */}

          {/* Fifth row */}
          <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                1 Green Ball
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(4, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="chocolate">
                  <Text fontWeight={"semibold"} color={"#002047"}>
                    16
                  </Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="red">
                  <Text fontWeight={"semibold"} color={"#002047"}>
                    2
                  </Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="black" color="white">
                  <Text fontWeight={"semibold"} color={"#FFFFFF"}>
                    1
                  </Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text fontWeight={"semibold"} color={"#002047"}>
                    31
                  </Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                3 SURE ENTRY
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Earn an entry for 3 Sure Cashout & a chance to win your cumulative swaps
              </Text>
            </GridItem>
          </Grid>
          {/* Six row */}
          <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Cashout keys
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(4, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="chocolate">
                  <Text fontWeight={"semibold"} color={"#002047"}>
                    14
                  </Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="red">
                  <Text fontWeight={"semibold"} color={"#002047"}>
                    23
                  </Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="black" color="white">
                  <Text fontWeight={"semibold"} color={"#FFFFFF"}>
                    7
                  </Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text fontWeight={"semibold"} color={"#002047"}>
                    5
                  </Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                CASHOUT %
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Cashout a Percentage of your Boom Coin Tokens.
              </Text>
            </GridItem>
          </Grid>
          <Grid
            gap={5}
            templateColumns="repeat(8, 1fr)"
            px={{ base: 5, md: 20 }}
            py={3}
            w={{ base: "50rem", md: "100%" }}
            borderBottomWidth={1}
          >
            <GridItem colSpan={2}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                3 Green Balls in 3 Consecutive Rollover Swaps
              </Text>
            </GridItem>
            <GridItem
              colSpan={2}
              as={Flex}
              justifyContent="center"
              h="fit-content"
            >
              <Grid
                templateColumns="repeat(3, 1fr)"
                borderRadius={20}
                w="fit-content"
                gap="1px"
                overflow="hidden"
              >
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>15</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>23</Text>
                </Center>
                <Center h="2.5rem" w="2.5rem" bg="nairagreen">
                  <Text>7</Text>
                </Center>
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                GAME CUMULATIVE %
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontWeight={"semibold"} color={"#002047"}>
                Win a percentage of the cumulative alert amounts of 3 consecutive rollover swaps.
              </Text>
            </GridItem>
          </Grid>
        </Stack>
        <Box
          bgImage="/redesign/dashboard/modalities-01.png"
          bgPos="top"
          bgRepeat="no-repeat"
          pt="25rem"
        >
          <Image w="100%" src="/redesign/dashboard/modalities-02.png" />
        </Box>
      </Stack>
    </Flex>
  );
};

export default WinningModalities;

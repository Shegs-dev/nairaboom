import {
  Box,
  Text,
  Avatar,
  Link,
  Spinner,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  Button,
  ModalFooter,
  chakra,
  Badge,
  Input,
  ModalHeader,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

import Image from "next/legacy/image";
import avatar from "../public/sidenav/avatar.png";
import blackhomeicon from "../public/sidenav/home.svg";
import greyhomeicon from "../public/sidenav/greyhome.svg";
import greycashback from "../public/sidenav/greycashback.svg";
import blackcashback from "../public/sidenav/blackcashback.svg";
import blackwinning from "../public/sidenav/blackwinning.svg";
import greywinning from "../public/sidenav/greywinning.svg";
import greywallet from "../public/sidenav/greywallet.svg";
import blackwallet from "../public/sidenav/blackwallet.svg";
import greyhistory from "../public/sidenav/greyhistory.svg";
import blackhistory from "../public/sidenav/blackhistory.svg";
import copy from "../public/sidenav/copy.svg";
import greychange from "../public/sidenav/greychange.svg";
import blackchange from "../public/sidenav/blackchange.svg";
import greyedit from "../public/sidenav/greyedit.svg";
import blackedit from "../public/sidenav/blackedit.svg";
import logout from "../public/sidenav/logout.png";

import greyshare from "../public/sidenav/shareNG.svg";
import share from "../public/sidenav/shareNGB.svg";
import greyrefer from "../public/sidenav/referSolidB.svg";
import refer from "../public/sidenav/referSolidG.svg";

import ActiveLink from "./ActiveLinkDashboard";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { removeTokenFromLocalStorage , removeTokenFromLocalStorage2} from "../lib/hooks/getAuthUser";
import useUser from "../lib/hooks/useUser";
import { useState } from "react";

const SideNav = () => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useUser();

 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const isCustomer = router.pathname.includes("customer_dashboard");

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      removeTokenFromLocalStorage("token");
      removeTokenFromLocalStorage2("token2");

      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: "successfully logged out",
        position: "top",
      });
      // router.push("/auth?p=login");
      router.replace("/");

      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  const DashboardLink = [
    [
      "Dashboard",
      ["/customer_dashboard", "/agent_dashboard"],
      `${blackhomeicon.src}`,
      `${greyhomeicon.src}`,
      "19px",
      "20px",
    ],
    [
      "Play Game",
      ["/customer_dashboard/cashback", "/agent_dashboard/cashback"],
      `${blackcashback.src}`,
      `${greycashback.src}`,
      "27px",
      "27px",
    ],
    // [
    //   "Claim My Winnings",
    //   ["/customer_dashboard/winnings", "/agent_dashboard/winnings"],
    //   `${blackwinning.src}`,
    //   `${greywinning.src}`,
    //   "25px",
    //   "21px",
    // ],
    [
      "My Wallet",
      ["/customer_dashboard/wallet", "/agent_dashboard/wallet"],
      `${blackwallet.src}`,
      `${greywallet.src}`,
      "19px",
      "18.69px",
    ],
    // [
    //   "My Bonus",
    //   ["/customer_dashboard/wallet", "/agent_dashboard/wallet"],
    //   `${blackwallet.src}`,
    //   `${greywallet.src}`,
    //   "19px",
    //   "18.69px",
    // ],
    [
      "My Game History",
      [
        "/customer_dashboard/request_history",
        "/agent_dashboard/request_history",
      ],
      `${blackhistory.src}`,
      `${greyhistory.src}`,
      "16px",
      "21px",
    ],
    [
      "Refer Your Trybe",
      ["/customer_dashboard/referral_link", "/agent_dashboard/referral_link"],
      `${refer.src}`,
      `${greyrefer.src}`,
      "16px",
      "21px",
    ],
    [
      "Share & Earn",
      ["/customer_dashboard/share_ads", "/agent_dashboard/share_ads"],
      `${share.src}`,
      `${greyshare.src}`,
      "16px",
      "21px",
    ],
  ];
  const DashboardLink_ = [
    [
      "Dashboard",
      ["/customer_dashboard", "/agent_dashboard"],
      `${blackhomeicon.src}`,
      `${greyhomeicon.src}`,
      "19px",
      "20px",
    ],
    [
      "Play Game",
      ["/customer_dashboard/cashback", "/agent_dashboard/cashback"],
      `${blackcashback.src}`,
      `${greycashback.src}`,
      "27px",
      "27px",
    ],
    [
      "My Wallet",
      ["/customer_dashboard/wallet", "/agent_dashboard/wallet"],
      `${blackwallet.src}`,
      `${greywallet.src}`,
      "19px",
      "18.69px",
    ],

    [
      "My Game History",
      [
        "/customer_dashboard/request_history",
        "/agent_dashboard/request_history",
      ],
      `${blackhistory.src}`,
      `${greyhistory.src}`,
      "16px",
      "21px",
    ],
    [
      "Agent Code",
      ["/customer_dashboard/referral_link", "/agent_dashboard/agentcode"],
      `${refer.src}`,
      `${greyrefer.src}`,
      "16px",
      "21px",
    ],
    // [
    //   "My Commissions",
    //   [
    //     "/customer_dashboard/mycommission",
    //     "/agent_dashboard/mycommission",
    //   ],
    //   `${share.src}`,
    //   `${greyshare.src}`,
    //   "16px",
    //   "21px",
    // ],
    [
      "Redeem Winnings",
      [
        "/customer_dashboard/redeem_winnings",
        "/agent_dashboard/redeem_winnings",
      ],
      `${share.src}`,
      `${greyshare.src}`,
      "16px",
      "21px",
    ],
    // [
    //   "Share & Earn",
    //   ["/customer_dashboard/share_ads", "/agent_dashboard/share_ads"],
    //   `${share.src}`,
    //   `${greyshare.src}`,
    //   "16px",
    //   "21px",
    // ],
  ];

  const DashboardLink2 = [
    [
      "Need Help?",
      ["/customer_dashboard/disputes", "/agent_dashboard/disputes"],
      `${blackhistory.src}`,
      `${greyhistory.src}`,
      "16px",
      "20px",
    ],
    [
      "Edit Profile",
      ["/customer_dashboard/editprofile", "/agent_dashboard/editprofile"],
      `${blackedit.src}`,
      `${greyedit.src}`,
      "16px",
      "20px",
    ],
    [
      "Change Password",
      [
        "/customer_dashboard/change-password",
        "/agent_dashboard/change-password",
      ],
      `${blackchange.src}`,
      `${greychange.src}`,
      "19px",
      "20px",
    ],
  ];
  return (
    <Box
      w="25%"
      bgColor={"white"}
      h={"max-content"}
      float="left"
      display={{ base: "none", lg: "flex" }}
      flexDir="column"
      pl="3rem"
      pr=".5rem"
      pt="2.5rem"
      pb="9.3rem"
      fontFamily={"poppins"}
    >
      <Box pb=".5rem" display={"flex"} alignItems="center" gap="1.05rem">
        <Avatar
          name={user?.details?.fullname}
          src={`${user?.details?.customer_path}`}
          bg="rgba(30, 215, 96, 0.19)"
        />
        <Box>
          {!user ? (
            <Spinner />
          ) : (
            <Text fontWeight={500} fontSize={"xl"}>
              {`Welcome ${user?.details.fullname.split(" ")[0]}`}
            </Text>
          )}
        </Box>
      </Box>

      <hr />
      <Box gap="1.5rem" pt="2.125rem" display={"flex"} flexDir="column">
        {isCustomer ? (
          <>
            {DashboardLink.map((dashboard, index) =>
              router.pathname == `${dashboard[1][0]}` ||
              router.pathname == `${dashboard[1][1]}` ? (
                <ActiveLink
                  key={index}
                  bg="currentlink"
                  color="nairablue"
                  icon={dashboard[2]}
                  name={dashboard[0]}
                  href={
                    router.pathname.includes("customer")
                      ? dashboard[1][0]
                      : dashboard[1][1]
                  }
                  width={dashboard[4]}
                  height={dashboard[5]}
                />
              ) : (
                <ActiveLink
                  key={index}
                  bg="white"
                  color="#A7A7A7"
                  icon={dashboard[3]}
                  name={dashboard[0]}
                  href={
                    router.pathname.includes("customer")
                      ? dashboard[1][0]
                      : dashboard[1][1]
                  }
                  width={dashboard[4]}
                  height={dashboard[5]}
                />
              )
            )}
          </>
        ) : (
          <>
            {DashboardLink_.map((dashboard, index) =>
              router.pathname == `${dashboard[1][0]}` ||
              router.pathname == `${dashboard[1][1]}` ? (
                <ActiveLink
                  key={index}
                  bg="currentlink"
                  color="nairablue"
                  icon={dashboard[2]}
                  name={dashboard[0]}
                  href={
                    router.pathname.includes("customer")
                      ? dashboard[1][0]
                      : dashboard[1][1]
                  }
                  width={dashboard[4]}
                  height={dashboard[5]}
                />
              ) : (
                <ActiveLink
                  key={index}
                  bg="white"
                  color="#A7A7A7"
                  icon={dashboard[3]}
                  name={dashboard[0]}
                  href={
                    router.pathname.includes("customer")
                      ? dashboard[1][0]
                      : dashboard[1][1]
                  }
                  width={dashboard[4]}
                  height={dashboard[5]}
                />
              )
            )}
          </>
        )}
      </Box>
      <Box pt="10rem" gap="1.5rem" display={"flex"} flexDir="column">
        {DashboardLink2.map((dashboard, index) =>
          router.pathname == `${dashboard[1][0]}` ||
          router.pathname == `${dashboard[1][1]}` ? (
            <ActiveLink
              key={index}
              bg="currentlink"
              color="nairablue"
              icon={dashboard[2]}
              name={dashboard[0]}
              href={
                router.pathname.includes("customer")
                  ? dashboard[1][0]
                  : dashboard[1][1]
              }
              width={dashboard[4]}
              height={dashboard[5]}
            />
          ) : (
            <ActiveLink
              key={index}
              bg="white"
              color="#A7A7A7"
              icon={dashboard[3]}
              name={dashboard[0]}
              href={
                router.pathname.includes("customer")
                  ? dashboard[1][0]
                  : dashboard[1][1]
              }
              width={dashboard[4]}
              height={dashboard[5]}
            />
          )
        )}
      </Box>
      {user?.details?.kyc_approved === false && (
        <Button
          onClick={() =>
            isCustomer
              ? router.push(`/customer_dashboard/editprofile`)
              : router.push(`/agent_dashboard/editprofile`)
          }
          color={"white"}
          mt="1rem"
          bg="nairagreen"
        >
          Verify your Account
        </Button>
      )}
      <>
        <Box
          _hover={{ textDecoration: "none" }}
          gap="1.18rem"
          mt="2.5rem"
          pl="2rem"
          as={Link}
          display="flex"
          alignItems="center"
          onClick={onOpen}
        >
          {/* <Image src={logout} width={"20px"} height={"20px"} alt="logout icon" /> */}
          <Text color="#FF4B4B" fontWeight={500} fontSize="xl">
            Log Out
          </Text>
        </Box>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent py="1rem">
            <ModalCloseButton />
            <ModalBody
              textAlign={"center"}
              fontSize={"1.5rem"}
              fontFamily="poppins"
            >
              Are you sure <br /> you want to log out?
            </ModalBody>
            <ModalFooter display={"flex"} justifyContent="center">
              <Button w="5rem" colorScheme="red" mr={3} onClick={onClose}>
                No
              </Button>
              <Button
                onClick={handleLogout}
                w="5rem"
                colorScheme="green"
                mr={3}
              >
                {isLoading ? <Spinner /> : "Yes"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

export default SideNav;

import { CopyIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  UnorderedList,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InterswitchPay } from "react-interswitch";
import Wrapper from "../../components/Wrapper";
import useUser from "../../lib/hooks/useUser";
import monnifyLogo from "../../public/monnify_logo.png";
import paystackLogo from "../../public/paystack_logo.png";
import makeid from "../../utils/random";
import { AUTH_API_ROUTES } from "../../utils/routes";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

import { useMonnifyPayment } from "react-monnify";
const FundAccount = () => {
    const [amount, setAmount] = useState("500");
    const [isLoading, setIsLoading] = useState(false);
    const [virtualAcct, setVirtualAccount] = useState(null);
    const [isBvnValidated, setisBvnValidated] = useState(false);
    const [interSwitchModal, setinterSwitchModal] = useState(false);
    const [showPaystackModal, setShowPaystackModal] = useState(false);
    const [method, setmethod] = useState("");
    const [data, setData] = useState();
    const [userData, setUserData] = useState();
    const [verifyEmail, setverifyEmail] = useState("");
    const { hasCopied, onCopy } = useClipboard(virtualAcct ? .account_number);
    const { user } = useUser();
    const toast = useToast();
    const router = useRouter();
    const bearerToken = user ? .token;
    const random = makeid(15);
    const paydetails = {
        ref: random,
        amount: `${amount * 100}`,
    };

    const [paymentConfirmDetails, setPaymentConfirmDetails] = useState({
        amount: null,
        ref: paydetails.ref,
    });
    const props = {
        merchantCode: "MX19982",
        payItemID: "Default_Payable_MX19982",
        customerEmail: user ? .details ? .email,
        redirectURL: "/customer_dashboard/wallet",
        text: "Pay Now",
        mode: "LIVE",
        transactionReference: paydetails.ref,
        amount: amount * 100,
        style: {
            width: "100%",
            paddingTop: ".5rem",
            paddingBottom: ".5rem",
            borderRadius: "5px",
            border: "none",
            color: "#fff",
            backgroundColor: "#1ED760",
            fontSize: ".8rem",
            fontWeight: 600,
        },
        callback: (response) => {
            setPaymentConfirmDetails({
                ref: response.txnref || paydetails.amount,
                amount: `${
          response.amount === undefined ? paydetails?.amount : response.amount
        }`,
            });
            // router.push("/customer_dashboard/cashback");
        },
    };

    //Monnify
    const [showMonnifyModal, setShowMonnifyModal] = useState(false);
    const [monnifyFundAmount, setMonnifyFundAmount] = useState();
    const HandleFundMonnify = async() => {
        setPaystackLoading(true);
        const data = {
            amount: monnifyFundAmount,
        };
        if (user ? .details ? .email) {
            data.email = user ? .details ? .email;
        }
        const paystackConfig = {
            method: "post",
            url: `${BASE_URL}/api/initiate_monnify`,
            headers: {
                "X-APP-KEY": NAIRABOOM_KEY,
                Authorization: `Bearer ${bearerToken}`,
            },
            data: data,
            // {
            //   amount: monnifyFundAmount
            //   // email: user?.details?.email,
            //   // email: userData?.payload?.email || user?.details?.email,
            // },
        };

        try {
            const res = await axios(paystackConfig);
            if (res ? .status === 200) {
                router.push(res ? .data ? .payload ? .authorization_url);
                setPaystackLoading(false);
            }
        } catch (err) {
            toast({
                isClosable: true,
                duration: 3000,
                status: "error",
                title: err ? .message || "An error occured, try again later",
                position: "top",
            });
            setPaystackLoading(false);
        } finally {
            setPaystackLoading(false);
        }
    };

    //////-----------------------------------Paystack ------------------------------------>>>>>
    const [paystackFundAmount, setPaystackFundAmount] = useState();
    // paystackk function here
    const [paystackLoading, setPaystackLoading] = useState(false);
    const HandleFundPaystack = async() => {
        setPaystackLoading(true);
        const data = {
            amount: paystackFundAmount,
        };
        if (user ? .details ? .email) {
            data.email = user ? .details ? .email;
        }
        const paystackConfig = {
            method: "post",
            url: `${BASE_URL}/api/initiate_paystack`,
            headers: {
                "X-APP-KEY": NAIRABOOM_KEY,
                Authorization: `Bearer ${bearerToken}`,
            },
            data: data,
            // {
            //   amount: paystackFundAmount,
            //   // email: userData?.payload?.email || user?.details?.email,
            // },
        };

        try {
            const res = await axios(paystackConfig);
            if (res ? .status === 200) {
                router.push(res ? .data ? .payload ? .authorization_url);
            }
        } catch (err) {
            toast({
                isClosable: true,
                duration: 3000,
                status: "error",
                title: "An error occured, try again later",
                position: "top",
            });
        } finally {
            setPaystackLoading(false);
            setPaystackLoading(false);
        }
    };

    const [showAddEmail, setShowAddEmail] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userEmailLoading, setUserEmailLoading] = useState("");

    const handleCreateVirtualAccount = async() => {};
    async function fetchData2() {
        const config = {
            method: "get",
            url: `${BASE_URL}/api/profile`,
            headers: {
                "X-APP-KEY": NAIRABOOM_KEY,
                Authorization: `Bearer ${bearerToken}`,
            },
        };
        try {
            setIsLoading(true);
            const response = await axios(config);
            setUserData(response ? .data);
        } catch (err) {
            // toast({
            //     status: "error",
            //     isClosable: true,
            //     duration: "5000",
            //     title: "Please check your connection and try again",
            //     position: "top",
            // });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (!bearerToken) return;

        async function fetchData() {
            const config = {
                method: "get",
                url: `${BASE_URL}/api/fetch_virtual_account`,
                headers: {
                    "X-APP-KEY": NAIRABOOM_KEY,
                    Authorization: `Bearer ${bearerToken}`,
                },
            };

            try {
                setIsLoading(true);
                const response = await axios(config);

                if (response.data.message === "Account needs to be validated first") {
                    setisBvnValidated(false);
                } else {
                    setData(response ? .data ? .payload);
                    setVirtualAccount(response.data.payload);
                }
            } catch (err) {
                // toast({
                //     status: "error",
                //     isClosable: true,
                //     duration: "5000",
                //     title: "Please check your connection and try again",
                //     position: "top",
                // });
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
        fetchData2();
    }, [bearerToken, toast]);

    useEffect(() => {
        async function confirmPayment() {
            setIsLoading(true);
            if (paymentConfirmDetails.amount === null || !bearerToken) {
                return;
            }

            const config = {
                method: "post",
                url: `${BASE_URL}/api/manual_validation`,
                headers: {
                    "X-APP-KEY": NAIRABOOM_KEY,
                    Authorization: `Bearer ${bearerToken}`,
                },
                data: paymentConfirmDetails,
            };

            try {
                const res = await axios(config);

                if (res ? .data ? .status === false) {
                    toast({
                        isClosable: true,
                        duration: 3000,
                        status: "error",
                        title: res.data.message,
                        position: "top",
                    });
                    router.push("/customer_dashboard/wallet");
                    return;
                }

                toast({
                    isClosable: true,
                    duration: 3000,
                    status: "success",
                    title: res ? .data.message,
                    position: "top",
                });
                router.push("/customer_dashboard/cashback");
            } catch (err) {
                // toast({
                //   isClosable: true,
                //   duration: 5000,
                //   status: "error",
                //   title:
                //     "Oops, Some error occurred! check your connection and try again.",
                //   position: "top",
                // });
            }
            setIsLoading(false);
        }

        const fetchVirtualAccount = async() => {
            if (!bearerToken) return;
            const config = {
                method: "get",
                url: `${BASE_URL}/api/fetch_virtual_account`,
                headers: {
                    "X-APP-KEY": NAIRABOOM_KEY,
                    Authorization: `Bearer ${bearerToken}`,
                },
            };

            try {
                const res = await axios(config);
                if (res ? .data ? .status === false) {
                    setVirtualAccount(null);
                    return;
                }

                setVirtualAccount(res.data.payload);
            } catch (err) {
                toast({
                    isClosable: true,
                    duration: 5000,
                    status: "error",
                    title: "Oops, Some error occurred! check your connection and try again.",
                    position: "top",
                });
            }
        };
        confirmPayment();

        user ? .details ? .kyc_approved === true && fetchVirtualAccount();
    }, [paymentConfirmDetails, toast, bearerToken, user ? .details ? .kyc_approved]);
    // redirectURL: "/customer_dashboard/fund_account",
    const initiatePayment = async() => {
        const config = {
            method: "post",
            url: `${BASE_URL}/api/manual_fund_wallet`,
            headers: {
                "X-APP-KEY": NAIRABOOM_KEY,
                Authorization: `Bearer ${bearerToken}`,
            },
            data: paydetails,
        };

        try {
            setIsLoading(true);
            const response = await axios(config);
            if (response ? .data.status === false) {
                toast({
                    duration: 3000,
                    isClosable: true,
                    status: "error",
                });
                return;
            }
            setinterSwitchModal(true);
        } catch (err) {
            toast({
                isClosable: true,
                duration: 5000,
                status: "error",
                title: "something went wrong, kindly check internet and try again",
                position: "top",
            });
        }
        setIsLoading(false);
    };
    const props_monnify = {
        amount: 5000,
        currency: "NGN",
        reference: "" + Math.floor(Math.random() * 1000000000 + 1),
        customerFullName: "John Doe",
        customerEmail: "monnify@monnify.com",
        customerMobileNumber: "08121281921",
        apiKey: "MK_TEST_YW9DBR2KN7",
        contractCode: "4934121693",
        paymentDescription: "Integrating monnify",
        isTestMode: true,
        metadata: {
            name: "Damilare",
            age: 45,
        },
    };
    const config = {
        amount: 5000,
        currency: "NGN",
        reference: "" + Math.floor(Math.random() * 1000000000 + 1),
        customerFullName: "John Doe",
        customerEmail: "monnify@monnify.com",
        customerMobileNumber: "08121281921",
        apiKey: "MK_TEST_SAF7HR5F3F",
        contractCode: "4934121693",
        paymentDescription: "Test Pay",
        isTestMode: true,
        metadata: {
            name: "Damilare",
            age: 45,
        },
    };

    function payWithMonnify() {
        MonnifySDK.initialize({
            amount: Number(amount),
            currency: "NGN",
            reference: new String(new Date().getTime()),
            customerFullName: "Damilare Ogunnaike",
            customerEmail: "bamgboyetaiwo9@gmail.com",
            apiKey: "MK_TEST_YW9DBR2KN7",
            contractCode: "9775649684",
            paymentDescription: "nairaboom",
            metadata: {
                name: "Damilare",
                age: 45,
            },
            onLoadStart: () => {
            },
            onLoadComplete: () => {
            },
            onComplete: function(response) {
                //Implement what happens when the transaction is completed.
            },
            onClose: function(data) {
                //Implement what should happen when the modal is closed here
            },
        });
    }
    const MonnifyHookExample = () => {
        const componentProps = {
            ...config,
            onSuccess: (response),
            onClose: (response),
        };
        const initializePayment = useMonnifyPayment(componentProps);
        return (
            // <Button
            //   w={{ base: "55%", md: "100%" }}
            //   mx={"auto"}
            //   p={{ sm: "3rem", lg: "0" }}
            //   bg="green"
            //   my={"1rem"}
            // onClick={() => {
            //   // initializePayment();
            //   payWithMonnify();
            // }}
            // >
            //   <Text
            //     fontWeight={500}
            //     color={"white"}
            //     fontSize={{ sm: "1.15rem", base: "1.15rem" }}
            //   >
            //     Fund via Bank
            //   </Text>
            // </Button>

            <
            Box onClick = {
                () => {
                    payWithMonnify();
                }
            }
            bg = "green"
            alignContent = { "center" }
            alignItems = { "center" }
            justifyContent = { "center" }
            justifyItems = { "center" }
            textAlign = { "center" }
            w = {
                { base: "100%", md: "90%", lg: "90%" }
            }
            display = { "flex" }
            borderRadius = { "10px" }
            height = { "5vh" } >
            <
            Text fontWeight = { 700 }
            marginY = { "auto" }
            fontSize = {
                { base: "0.8rem", md: "1.25rem" }
            }
            color = "white" >
            Fund via Bank <
            /Text> < /
            Box >
        );
    };

    const [updateLoading, setupdateLoading] = useState(false);
    const [updateEmail, setupdateEmail] = useState("");
    const handleEmailUpdate = async() => {
        if (!userEmail) {
            toast({
                isClosable: true,
                duration: 300,
                status: "error",
                message: "Email is Compulsory!.",
                position: "top",
            });
        }
        const editprofile = {
            method: "post",
            url: `${BASE_URL}/api/profile`,
            headers: {
                "X-APP-KEY": NAIRABOOM_KEY,
                Authorization: `Bearer ${bearerToken}`,
            },
            data: {
                email: userEmail,
            },
        };
        try {
            setupdateLoading(true);
            const response = await axios(editprofile);
            if (response ? .data ? .status === false) {
                toast({
                    isClosable: true,
                    duration: 300,
                    status: "error",
                    message: response ? .data ? .message,
                    position: "top",
                });
                return;
            }
            toast({
                isClosable: true,
                duration: 600,
                status: "success",
                message: "You've successfully updated your profile",
                title: "You've successfully updated your profile",
                position: "top",
            });
            router.push("/customer_dashboard/wallet");
        } catch (err) {
            toast({
                isClosable: true,
                duration: 5000,
                status: "error",
                title: "Oops, some error occurred! check your connection and try again.",
                position: "top",
            });
        } finally {
            setupdateLoading(false);
            await fetchData2();
            setShowAddEmail(false);
        }
    };
    return ( <
        Wrapper >
        <
        Head >
        <
        title > NairaBoom Customer Fund Account < /title> <
        meta name = "user dashboard"
        content = "nairaboom.ng agent dashboard" / >
        <
        /Head> <
        Box display = { "flex" }
        justifyContent = "space-between"
        alignItems = { "center" }
        pb = {
            { base: "2.5rem", md: "4rem" }
        } >
        <
        Text fontWeight = { 700 }
        fontSize = {
            { base: "1.25rem", md: "1.5rem" }
        }
        color = "nairablue" >
        Fund Wallet <
        /Text> <
        Box display = { "flex" }
        alignItems = "center"
        gap = "1.6rem" >
        <
        Box as = { NextLink }
        href = "/customer_dashboard/editprofile" >
        <
        Avatar name = { user ? .details ? .fullname }
        src = { user ? .details ? .customer_path }
        bg = "rgba(30, 215, 96, 0.19)"
        cursor = { "pointer" }
        /> < /
        Box > <
        /Box> < /
        Box > <
        Box > {
            method === "Virtual" && ( <
                >
                {
                    /* <Text fontWeight={500} fontSize="1.25rem" textAlign={"center"}>
                                  Kindly make a transfer to your virtual account <br />
                                  {virtualAcct?.account_name} <br /> {virtualAcct?.bank_name} <br />{" "}
                                </Text> */
                }

                <
                Text fontWeight = { 500 }
                fontSize = "1.25rem"
                textAlign = { "center" } >
                Follow these steps to fund your wallet <
                br / >
                <
                /Text> {
                /* <Text fontWeight={500} fontSize="1.25rem" textAlign={"center"}>
                              Open your bank app and pay the above account to top-up your wallet{" "}
                              <br />
                            </Text> */
            } <
            UnorderedList >
            <
            ListItem > Open your bank app < /ListItem> <
            ListItem >
            Copy the account details below and make payment <
            /ListItem> <
            ListItem >
            Upon successful payment,
            your Nairaboom wallet will be credited automatically. <
            /ListItem> <
            ListItem > Log in to your profile to Play Game. < /ListItem> < /
            UnorderedList > {
                /* <Box
                              mt=".5rem"
                              display={"flex"}
                              justifyContent="center"
                              alignItems={"center"}
                              cursor="pointer"
                              onClick={onCopy}
                              bgColor={"red"}
                            >
                              <Text
                                _hover={{ color: "black" }}
                                fontWeight={500}
                                fontSize="1.5rem"
                                textAlign={"center"}
                                color="grey"
                              >
                                {virtualAcct?.account_number}
                              </Text>
                              {hasCopied ? (
                                <Text pl=".3rem" fontWeight={500}>
                                  copied
                                </Text>
                              ) : (
                                <CopyIcon w="2rem" h="1.5rem" />
                              )}
                            </Box> */
            } <
            Box mt = ".5rem"
            // display={"flex"}
            justifyContent = "center"
            alignItems = { "center" }
            cursor = "pointer"
            onClick = { onCopy } >
            <
            Text fontWeight = { 700 }
            fontSize = {
                { base: "1.00rem", md: "1.25rem" }
            }
            color = "nairablue" >
            Bank Name <
            /Text> <
            Text fontWeight = { 400 }
            fontSize = {
                { base: "1.00rem", md: "1.25rem" }
            }
            color = "nairablue" > { virtualAcct ? .bank_name } <
            /Text> < /
            Box > <
            Box mt = ".5rem"
            // display={"flex"}
            justifyContent = "center"
            alignItems = { "center" }
            cursor = "pointer"
            onClick = { onCopy } >
            <
            Text fontWeight = { 700 }
            fontSize = {
                { base: "1.00rem", md: "1.25rem" }
            }
            color = "nairablue" >
            Account Number <
            /Text>

            <
            Box display = { "flex" } >
            <
            Text _hover = {
                { color: "black" }
            }
            fontWeight = { 500 }
            fontSize = "1.5rem"
            textAlign = { "center" }
            color = "grey" > { virtualAcct ? .account_number } <
            /Text> {
            hasCopied ? ( <
                Text pl = ".3rem"
                fontWeight = { 500 } >
                copied <
                /Text>
            ) : ( <
                CopyIcon w = "2rem"
                h = "1.5rem" / >
            )
        } <
        /Box> < /
        Box >

        <
        Box mt = { "2rem" } >
        <
        Text fontWeight = { 400 }
        // fontSize={{ base: "1.00rem", md: "1.25rem" }}
        color = "nairablue" >
        Bank transfers generally credit within 10 minutes but
        if within 24 hours you are not credited, please contact your bank. <
        /Text> < /
        Box > <
        />
    )
}

{
    method === "" && ( <
        >
        <
        div className = "" >
        <
        Box display = { "flex" }
        flexDir = "column"
        alignItems = { "center" }
        justifyContent = { "center" } >
        <
        Text fontWeight = { 500 }
        fontSize = "1.25rem" >
        Choose wallet funding option <
        /Text> <
        Box w = "100%"
        mt = { "2rem" } >
        <
        form onSubmit = {
            (e) => {
                e.preventDefault();
            }
        } >
        <
        Box bg = "white"
        fontFamily = { "poppins" }
        margin = "auto"
        display = {
            { base: "flex", md: "block" }
        }
        flexDirection = { "column" }
        w = {
            { base: "100%", md: "70%" }
        }
        p = {
            { base: "1rem", md: "4rem" }
        }
        py = {
            { base: "3rem", md: "4rem" }
        }
        mt = "1rem"
        borderRadius = { "5px" }
        boxShadow = "md" > {
            /* <>
                                    <MonnifyHookExample className="btn" />
                                  </>
                                  <Button
                                    w={{ base: "55%", md: "100%" }}
                                    mx={"auto"}
                                    p={{ sm: "3rem", lg: "0" }}
                                    bg="green"
                                    onClick={() => {
                                      setmethod("Interswitch");
                                    }}
                                  >
                                    <Text
                                      fontWeight={500}
                                      color={"white"}
                                      fontSize="1.15rem"
                                    >
                                      Pay with Interswitch
                                    </Text>
                                  </Button>
                                  <Button
                                    w={{ base: "55%", md: "100%" }}
                                    mx={"auto"}
                                    bg="green"
                                    mt={"1rem"}
                                    p={{ sm: "3rem", lg: "0" }}
                                    onClick={() => {
                                      if (user?.details.kyc_approved === true) {
                                        setmethod("Virtual");
                                      } else {
                                        toast({
                                          isClosable: true,
                                          duration: 5000,
                                          status: "error",
                                          title:
                                            "Please verify your account to generate a virtual account number.",
                                          position: "top",
                                        });
                                        router.push("/customer_dashboard/editprofile");
                                      }
                                    }}
                                  >
                                    <Text
                                      fontWeight={500}
                                      color={"white"}
                                      fontSize="1.15rem"
                                    >
                                      Pay with Bloc
                                    </Text>
                                  </Button> */
        }

        <
        Box >
        <
        SimpleGrid width = {
            { base: "90%", md: "100%" }
        }
        // ml={{ base: "%", lg: "0%" }}
        mx = { "auto" }
        columns = {
            { base: 2, md: 2 }
        }
        spacing = {
            { base: 3, md: 5, lg: 10 }
        }
        // minChildWidth={{base: "120px", md: "90px"}}
        >
        {
            /* <Box
                                        onClick={() => {}}
                                        bg="green"
                                        // p={{ sm: "1rem", lg: "0.5rem" }}
                                        alignContent={"center"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        justifyItems={"center"}
                                        textAlign={"center"}
                                        w={{ base: "100%", md: "90%", lg: "90%" }}
                                        display={"flex"}
                                        borderRadius={"10px"}
                                      >
                                        <Text
                                          fontWeight={700}
                                          marginY={"auto"}
                                          fontSize={{ base: "0.8rem", md: "1.25rem" }}
                                          color="white"
                                        >
                                          Fund via Bank
                                        </Text>
                                      </Box> */
        }

        { /* monnify Trigger button */ } {
            /* <Box
                                        bg="green"
                                        alignContent={"center"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        justifyItems={"center"}
                                        textAlign={"center"}
                                        w={{ base: "100%", md: "90%", lg: "90%" }}
                                        display={"flex"}
                                        borderRadius={"10px"}
                                        onClick={() => {
                                          setmethod("Monnify");
                                        }}
                                      >
                                        <Text
                                          fontWeight={700}
                                          marginY={"auto"}
                                          py={"1rem"}
                                          fontSize={{ base: "0.8rem", md: "1.25rem" }}
                                          color="white"
                                        >
                                          Fund via Bank
                                        </Text>
                                      </Box> */
        }

        {
            /* <Box
                                        bg="green"
                                        alignContent={"center"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        justifyItems={"center"}
                                        textAlign={"center"}
                                        w={{ base: "100%", md: "90%", lg: "90%" }}
                                        display={"flex"}
                                        borderRadius={"10px"}
                                        onClick={() => {
                                          setmethod("Interswitch");
                                        }}
                                      >
                                        <Text
                                          fontWeight={700}
                                          marginY={"auto"}
                                          py={"1rem"}
                                          fontSize={{ base: "0.8rem", md: "1.25rem" }}
                                          color="white"
                                        >
                                          Pay with Interswitch
                                        </Text>
                                      </Box> */
        } { /* Paystck trigger here */ } <
        Box bg = "green"
        filter = { isLoading ? "blur(1px)" : "none" }
        alignContent = { "center" }
        alignItems = { "center" }
        justifyContent = { "center" }
        justifyItems = { "center" }
        textAlign = { "center" }
        w = {
            { base: "100%", md: "90%", lg: "90%" }
        }
        display = { "flex" }
        borderRadius = { "10px" }
        onClick = {
            () => {
                if (isLoading) {
                    return;
                }
                setShowMonnifyModal(true);
                // if (
                //   !user?.details.email ||
                //   user?.details.email === ""
                // ) {
                //   setShowAddEmail(true);
                // } else {
                //   setShowMonnifyModal(true);
                // }
                // if (user?.details.kyc_approved === true) {
                // if (
                //   user?.details.email &&
                //   user?.details.email !== ""
                // ) {
                //   setmethod("Virtual");
                // } else {
                // toast({
                //   isClosable: true,
                //   duration: 5000,
                //   status: "error",
                //   title:
                //     // "Please verify your account to generate a virtual account number.",
                //     "Please update your profile with an email address to proceed!.",
                //   position: "top",
                // });

                //   router.push("/customer_dashboard/editprofile");
                //   // setShowAddEmail(true);
                // }
            }
        }
        _hover = {
            {
                cursor: "pointer",
                background: "darkgreen", // Change background color on hover

                transform: "scale(1.05)",
            }
        } >
        <
        Text fontWeight = { 700 }
        marginY = { "auto" }
        py = { "1rem" }
        fontSize = {
            { base: "0.8rem", md: "1.25rem" }
        }
        color = "white" >
        Fund with { "\n" } { "  " }
        Monnify <
        /Text> < /
        Box > <
        Box bg = "green"
        filter = { isLoading ? "blur(1px)" : "none" }
        alignContent = { "center" }
        alignItems = { "center" }
        justifyContent = { "center" }
        justifyItems = { "center" }
        textAlign = { "center" }
        w = {
            { base: "100%", md: "90%", lg: "90%" }
        }
        display = { "flex" }
        borderRadius = { "10px" }
        onClick = {
            () => {
                if (isLoading) {
                    return;
                }
                setShowPaystackModal(true);
                // if (
                //   !user?.details.email ||
                //   user?.details.email === ""
                // ) {
                //   setShowAddEmail(true);
                // } else {
                //   setShowPaystackModal(true);
                // }
                // toast({
                //   isClosable: true,
                //   duration: 5000,
                //   status: "info",
                //   title: "Coming soon!.",
                //   position: "top",
                // });
            }
        }
        _hover = {
            {
                cursor: "pointer",
                background: "darkgreen", // Change background color on hover

                transform: "scale(1.05)",
            }
        } >
        <
        Text fontWeight = { 700 }
        marginY = { "auto" }
        py = { "1rem" }
        fontSize = {
            { base: "0.8rem", md: "1.25rem" }
        }
        color = "white" >
        Fund with Paystack <
        /Text> < /
        Box > {
            /* <Button
                                        w="100%"
                                        bg="green"
                                        mt={"1rem"}
                                        onClick={() => {
                                          if (user?.details.kyc_approved === true) {
                                            setmethod("Virtual");
                                          } else {
                                            toast({
                                              isClosable: true,
                                              duration: 5000,
                                              status: "error",
                                              title:
                                                "Please verify your account to generate a virtual account number.",
                                              position: "top",
                                            });
                                            router.push("/agent_dashboard/editprofile");
                                          }
                                        }}
                                      >
                                        <Text
                                          fontWeight={500}
                                          color={"white"}
                                          fontSize="1.15rem"
                                        >
                                          Pay with Virtual Account
                                        </Text>
                                      </Button> */
        } <
        /SimpleGrid> < /
        Box >

        <
        Box mt = { "2rem" } >
        <
        Text textAlign = { "center" }
        margin = "0.5em 0" >
        Payment secured by <
        /Text> < /
        Box > <
        Box display = { "flex" }
        justifyContent = "space-between"
        gap = "0.5em" >
        <
        Box >
        <
        Image src = { monnifyLogo }
        // width={"75%"}
        // height={"50%"}
        alt = "monnify logo" /
        >
        { /* <Monnify/> */ } <
        /Box> <
        Box >
        <
        Image src = { paystackLogo }
        alt = "paystack logo" / >
        <
        /Box> < /
        Box > {
            /* <div>
                                    <p>
                                      <MonnifyButton
                                        text="Make Payment"
                                        className="payButton"
                                        onComplete={(res) => {
                                        }}
                                        close={(res) => {
                                        }}
                                        disabled={true}
                                        embed={true}
                                        customerFullName={props_monnify.customerFullName}
                                        customerEmail={props_monnify.customerEmail}
                                        customerMobileNumber={
                                          props_monnify.customerMobileNumber
                                        }
                                        amount={props_monnify.amount}
                                        apiKey={props_monnify.apiKey}
                                        contractCode={props_monnify.contractCode}
                                        reference={props_monnify.reference}
                                        paymentDescription="Testing monnify"
                                        tag="button"
                                      />
                                    </p>
                                  </div> */
        } <
        /Box> < /
        form > <
        /Box> < /
        Box > <
        /div> < /
        >
    )
}

{
    method === "Interswitch" && ( <
            Box display = { "flex" }
            flexDir = "column"
            alignItems = { "center" } >
            <
            Text fontWeight = { 500 }
            fontSize = "1.25rem" >
            Pay Directly Interswitch <
            /Text> <
            Box w = "100%" >
            <
            form onSubmit = {
                (e) => {
                    e.preventDefault();
                }
            } >
            <
            Box bg = "white"
            fontFamily = { "poppins" }
            margin = "auto"
            w = {
                { base: "100%", md: "70%" }
            }
            p = {
                { base: "1rem", md: "4rem" }
            }
            mt = "1rem"
            borderRadius = { "5px" }
            boxShadow = "md" >
            <
            FormLabel > Amount < /FormLabel> <
            Input autoFocus type = "number"
            focusBorderColor = "nairagreen"
            name = "amount"
            mb = "1rem"
            onChange = {
                (e) => {
                    setAmount(e.target.value);
                }
            }
            /> {
            Number(amount) < 500 && ( <
                Text fontWeight = { 500 }
                color = { "nairablue" }
                fontSize = "1rem" >
                Amount(Min.) 500.00 NGN <
                /Text>
            )
        } {
            amount !== "" && (
                // <Button w="100%" bg="white" onClick={initiatePayment}>
                //   <InterswitchPay {...props} />
                // </Button>

                <
                Button w = "100%"
                type = "submit"
                bgColor = { "nairagreen" }
                cursor = "pointer"
                color = "white"
                fontWeight = { 700 }
                mt = "2rem"
                _hover = {
                    { transform: "scale(1.05)" }
                }
                onClick = {
                    () => {
                        if (Number(amount) > 499) {
                            initiatePayment();
                        } else {
                            toast({
                                isClosable: true,
                                duration: 2000,
                                status: "error",
                                title: " Minimum Wallet Funding is 500.00 NGN",
                                position: "top",
                            });
                        }
                    }
                } > { isLoading === true ? < Spinner / > : "Proceed" } <
                /Button>
            )
        } <
        /Box> < /
        form > <
        /Box> < /
        Box >
)
}

{
    method === "Monnify" && ( <
        Box display = { "flex" }
        flexDir = "column"
        alignItems = { "center" } >
        <
        Text fontWeight = { 500 }
        fontSize = "1.25rem" >
        Pay Directly with Monnify <
        /Text> <
        Box w = "100%" >
        <
        form onSubmit = {
            (e) => {
                e.preventDefault();
            }
        } >
        <
        Box bg = "white"
        fontFamily = { "poppins" }
        margin = "auto"
        w = {
            { base: "100%", md: "70%" }
        }
        p = {
            { base: "1rem", md: "4rem" }
        }
        mt = "1rem"
        borderRadius = { "5px" }
        boxShadow = "md" >
        <
        FormLabel > Amount < /FormLabel> <
        Input autoFocus type = "number"
        focusBorderColor = "nairagreen"
        name = "amount"
        mb = "1rem"
        onChange = {
            (e) => {
                setAmount(e.target.value);
            }
        }
        value = { amount }
        />

        {
            Number(amount) < 500 && ( <
                Text fontWeight = { 500 }
                color = { "nairablue" }
                fontSize = "1rem" >
                Amount(Min.) 500.00 NGN <
                /Text>
            )
        } {
            amount !== "" && (
                // <Button w="100%" bg="white" onClick={initiatePayment}>
                //   <InterswitchPay {...props} />
                // </Button>

                <
                Button w = "100%"
                type = "submit"
                bgColor = { "nairagreen" }
                cursor = "pointer"
                color = "white"
                fontWeight = { 700 }
                mt = "2rem"
                _hover = {
                    { transform: "scale(1.05)" }
                }
                onClick = {
                    () => {
                        if (Number(amount) > 499) {
                            payWithMonnify();
                        } else {
                            toast({
                                isClosable: true,
                                duration: 2000,
                                status: "error",
                                title: " Minimum Wallet Funding is 500.00 NGN",
                                position: "top",
                            });
                        }
                    }
                } > { isLoading === true ? < Spinner / > : "Proceed" } <
                /Button>
            )
        } <
        /Box> < /
        form > <
        /Box> < /
        Box >
    )
} <
/Box> <
Modal isCentered isOpen = { interSwitchModal }
onClose = {
        () => {
            setinterSwitchModal(false);
        }
    } >
    <
    ModalOverlay / >
    <
    ModalContent fontFamily = { "poppins" }
w = {
    { base: "90%", md: "50%", lg: "40%" }
}
maxW = {
    { base: "80%", md: "60%" }
}
p = {
        { base: "1rem", md: "3rem" }
    } >
    <
    ModalHeader > Fund Account Details < /ModalHeader>

<
ModalCloseButton / >
    <
    ModalBody >
    <
    Text display = { "flex" }
color = "nairablue"
fontWeight = { 500 } >
    Amount:
    <
    Text marginLeft = { 3 }
fontWeight = { 700 } > { `₦ ${amount} ` } <
    /Text> < /
    Text > <
    Text mb = { "1rem" }
display = { "flex" }
color = "nairablue"
fontWeight = { 500 } >
    Method:
    <
    Text marginLeft = { 3 }
fontWeight = { 700 } >
    Interswitch <
    /Text> < /
    Text >

    <
    InterswitchPay {...props }
/> < /
ModalBody > <
    /ModalContent> < /
    Modal >

    { /* Add email modal here */ } <
    Modal isCentered isOpen = { showAddEmail }
onClose = {
        () => {
            setShowAddEmail(false);
        }
    } >
    <
    ModalOverlay / >
    <
    ModalContent fontFamily = { "poppins" }
w = {
    { base: "90%", md: "50%", lg: "40%" }
}
maxW = {
    { base: "80%", md: "60%" }
}
p = {
        { base: "1rem", md: "2rem" }
    } >
    <
    ModalHeader > Add Email to Activate Payment < /ModalHeader> <
ModalCloseButton / >
    <
    ModalBody >
    <
    Box w = "100%" >
    <
    form onSubmit = {
        (e) => {
            e.preventDefault();
        }
    }
style = {
        { width: "100%", flex: 1 }
    } >
    <
    Box bg = "white"
fontFamily = { "poppins" }
margin = "auto"
w = {
    { base: "100%", md: "100%", lg: "100%" }
}
p = {
    { base: "1rem", md: "0rem" }
}
mt = "1rem" >
    <
    FormLabel > Email < /FormLabel> <
Input autoFocus type = "email"
focusBorderColor = "nairagreen"
name = "amount"
mb = "1rem"
placeholder = "Enter email address"
w = { "100%" }
onChange = {
    (e) => {
        setUserEmail(e.target.value);
    }
}
/>

{
    paystackFundAmount !== "" && ( <
        Button w = "100%"
        type = "submit"
        bgColor = { "nairagreen" }
        cursor = "pointer"
        color = "white"
        fontWeight = { 700 }
        mt = "2rem"
        disabled = { paystackLoading }
        _hover = {
            { transform: "scale(1.05)" }
        }
        onClick = {
            () => {
                handleEmailUpdate();
            }
        } > { paystackLoading === true ? < Spinner / > : "Proceed" } <
        /Button>
    )
} <
/Box> < /
form > <
    /Box> < /
    ModalBody > <
    /ModalContent> < /
    Modal >

    { /* Paystack modal here */ } <
    Modal isCentered isOpen = { showPaystackModal }
onClose = {
        () => {
            setShowPaystackModal(false);
        }
    } >
    <
    ModalOverlay / >
    <
    ModalContent fontFamily = { "poppins" }
w = {
    { base: "90%", md: "50%", lg: "40%" }
}
maxW = {
    { base: "80%", md: "60%" }
}
p = {
        { base: "1rem", md: "2rem" }
    } >
    <
    ModalHeader > { " " }
Fund your wallet with Paystack < br / >
    <
    Text fontWeight = { 500 }
color = { "red" }
fontSize = "1rem" >
    While your transaction is in progress, keep the payment window open until complete. <
    br / >
    Thank you. <
    /Text>{" "} < /
    ModalHeader > <
    ModalCloseButton / >
    <
    ModalBody >
    <
    Box w = "100%"
bgColor = { "red" } >
    <
    form onSubmit = {
        (e) => {
            e.preventDefault();
        }
    }
style = {
        { width: "100%", flex: 1 }
    } >
    <
    Box bg = "white"
fontFamily = { "poppins" }
margin = "auto"
w = {
    { base: "100%", md: "100%", lg: "100%" }
}
p = {
    { base: "1rem", md: "0rem" }
}
mt = "1rem"
borderRadius = { "5px" } >
    <
    FormLabel > Amount < /FormLabel> <
Input autoFocus type = "number"
focusBorderColor = "nairagreen"
name = "amount"
mb = "1rem"
w = { "100%" }
onChange = {
    (e) => {
        setPaystackFundAmount(e.target.value);
    }
}
/> {
Number(paystackFundAmount) < 500 && ( <
    Text fontWeight = { 500 }
    color = { "red" }
    fontSize = "1rem" >
    Amount(Min.) 500.00 NGN <
    /Text>
)
} {
    paystackFundAmount !== "" && ( <
        Button w = "100%"
        type = "submit"
        bgColor = { "nairagreen" }
        cursor = "pointer"
        color = "white"
        fontWeight = { 700 }
        mt = "2rem"
        disabled = { paystackLoading }
        _hover = {
            { transform: "scale(1.05)" }
        }
        onClick = {
            () => {
                if (Number(paystackFundAmount) >= 500) {
                    // initiatePayment();
                    HandleFundPaystack();
                    // router.push('https://www.example.com');
                } else {
                    toast({
                        isClosable: true,
                        duration: 2000,
                        status: "error",
                        title: " Minimum Wallet Funding is 500.00 NGN",
                        position: "top",
                    });
                }
            }
        } > { paystackLoading === true ? < Spinner / > : "Proceed" } { /* Proceed */ } <
        /Button>
    )
} <
/Box> < /
form > <
    /Box> < /
    ModalBody > <
    /ModalContent> < /
    Modal > {
        /* Monnify modal here
                const [showMonnifyModal, setShowMonnifyModal] = useState(false);
          const [monnifyFundAmount, setMonnifyFundAmount] = useState();
               */
    } <
    Modal isCentered isOpen = { showMonnifyModal }
onClose = {
        () => {
            setShowMonnifyModal(false);
        }
    } >
    <
    ModalOverlay / >
    <
    ModalContent fontFamily = { "poppins" }
w = {
    { base: "90%", md: "50%", lg: "40%" }
}
maxW = {
    { base: "80%", md: "60%" }
}
p = {
        { base: "1rem", md: "2rem" }
    } >
    <
    ModalHeader > { " " }
Fund your wallet with Monnify < br / >
    <
    Text fontWeight = { 500 }
color = { "red" }
fontSize = "1rem" >
    While your transaction is in progress, keep the payment window open until complete. <
    br / >
    Thank you. <
    /Text>{" "} < /
    ModalHeader > <
    ModalCloseButton / >
    <
    ModalBody >
    <
    Box w = "100%" >
    <
    form onSubmit = {
        (e) => {
            e.preventDefault();
        }
    }
style = {
        { width: "100%", flex: 1, backgroundColor: "blue" }
    } >
    <
    Box bg = "white"
fontFamily = { "poppins" }
margin = "auto"
w = {
    { base: "100%", md: "100%", lg: "100%" }
}
p = {
    { base: "1rem", md: "0rem" }
}
mt = "1rem"
borderRadius = { "5px" } >
    <
    FormLabel > Amount < /FormLabel> <
Input autoFocus type = "number"
focusBorderColor = "nairagreen"
name = "amount"
mb = "1rem"
w = { "100%" }
onChange = {
    (e) => {
        setMonnifyFundAmount(e.target.value);
    }
}
/> {
Number(monnifyFundAmount) < 500 && ( <
    Text fontWeight = { 500 }
    color = { "red" }
    fontSize = "1rem" >
    Amount(Min.) 500.00 NGN <
    /Text>
)
} {
    monnifyFundAmount !== "" && ( <
        Button w = "100%"
        type = "submit"
        bgColor = { "nairagreen" }
        cursor = "pointer"
        color = "white"
        fontWeight = { 700 }
        mt = "2rem"
        disabled = { paystackLoading }
        _hover = {
            { transform: "scale(1.05)" }
        }
        onClick = {
            () => {
                if (Number(monnifyFundAmount) >= 500) {
                    // initiatePayment();
                    HandleFundMonnify();
                    // router.push('https://www.example.com');
                } else {
                    toast({
                        isClosable: true,
                        duration: 2000,
                        status: "error",
                        title: " Minimum Wallet Funding is 500.00 NGN",
                        position: "top",
                    });
                }
            }
        } > { paystackLoading === true ? < Spinner / > : "Proceed" } { /* Proceed */ } <
        /Button>
    )
} <
/Box> < /
form > <
    /Box> < /
    ModalBody > <
    /ModalContent> < /
    Modal >

    { /** Paystack */ } <
    Modal isCentered isOpen = { false }
onClose = {
        () => {
            setShowPaystackModal(false);
        }
    } >
    <
    ModalOverlay / >
    <
    ModalContent fontFamily = { "poppins" }
w = {
    { base: "90%", md: "50%", lg: "40%" }
}
maxW = {
    { base: "80%", md: "60%" }
}
p = {
        { base: "1rem", md: "2rem" }
    } >
    <
    ModalHeader > Verify Generate < /ModalHeader> <
ModalCloseButton / >
    <
    ModalBody >
    <
    Box w = "100%"
bgColor = { "red" } >
    <
    form onSubmit = {
        (e) => {
            e.preventDefault();
        }
    }
style = {
        { width: "100%", flex: 1, backgroundColor: "blue" }
    } >
    <
    Box bg = "white"
fontFamily = { "poppins" }
margin = "auto"
w = {
    { base: "100%", md: "100%", lg: "100%" }
}
p = {
    { base: "1rem", md: "0rem" }
}
mt = "1rem"
borderRadius = { "5px" } >
    <
    FormLabel > Email < /FormLabel> <
Input autoFocus type = "email"
focusBorderColor = "nairagreen"
name = "amount"
mb = "1rem"
w = { "100%" }
onChange = {
    (e) => {
        setverifyEmail(e.target.value);
        verifyEmail;
    }
}
/> < /
Box > <
    /form> < /
    Box > <
    /ModalBody> < /
    ModalContent > <
    /Modal>

{ /* monnify */ } {
    /* <Modal
            isCentered
            isOpen={interSwitchModal}
            onClose={() => {
              setinterSwitchModal(false);
            }}
          >
            <ModalOverlay />
            <ModalContent
              fontFamily={"poppins"}
              w={{ base: "90%", md: "50%", lg: "40%" }}
              maxW={{ base: "80%", md: "60%" }}
              p={{ base: "1rem", md: "3rem" }}
            >
              <ModalHeader>Fund Account Details</ModalHeader>

              <ModalCloseButton />
              <ModalBody>
                <Text display={"flex"} color="nairablue" fontWeight={500}>
                  Amount:
                  <Text marginLeft={3} fontWeight={700}>
                    {`₦ ${amount} `}
                  </Text>
                </Text>
                <Text
                  mb={"1rem"}
                  display={"flex"}
                  color="nairablue"
                  fontWeight={500}
                >
                  Method:
                  <Text marginLeft={3} fontWeight={700}>
                    Interswitch
                  </Text>
                </Text>

                <MonnifyHookExample className="btn" />
              </ModalBody>
            </ModalContent>
          </Modal> */
} <
/Wrapper>
);
};

export default FundAccount;
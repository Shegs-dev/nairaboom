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

const FundAccount = () => {
    // const [amount, setAmount] = useState("");
    const [amount, setAmount] = useState("500");
    const [isLoading, setIsLoading] = useState(false);
    const [virtualAcct, setVirtualAccount] = useState(null);
    const [isBvnValidated, setisBvnValidated] = useState(false);
    const [paystackLoading, setPaystackLoading] = useState(false);

    const [method, setmethod] = useState("");
    const [showPaystackModal, setShowPaystackModal] = useState(false);
    const [paystackFundAmount, setPaystackFundAmount] = useState();

    const [showMonnifyModal, setShowMonnifyModal] = useState(false);
    const [monnifyFundAmount, setMonnifyFundAmount] = useState();

    setShowMonnifyModal;

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
                }
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
                    return;
                }

                toast({
                    isClosable: true,
                    duration: 3000,
                    status: "success",
                    title: res ? .data.message,
                    position: "top",
                });
                router.push("/agent_dashboard/cashback");
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
    // redirectURL: "/agent_dashboard/fund_account",
    const props = {
        merchantCode: "MX19982",
        payItemID: "Default_Payable_MX19982",
        customerEmail: user ? .details ? .email,
        redirectURL: "/agent_dashboard/wallet",
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
                ref: response.txnref,
                amount: `${response.amount}`,
            });
            router.push("/agent_dashboard/cashback");
        },
    };

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
            const response = await axios(config);
            if (response ? .data.status === false) {
                toast({
                    duration: 3000,
                    isClosable: true,
                    status: "error",
                });
                return;
            }
        } catch (err) {
            toast({
                isClosable: true,
                duration: 5000,
                status: "error",
                title: "something went wrong, kindly check internet and try again",
                position: "top",
            });
        }
    };

    const HandleFundPaystack = async() => {
        setPaystackLoading(true);
        // const { user } = useUser();
        const data = {
            amount: paystackFundAmount,
        }
        if (user ? .details ? .email) {
            data.email = user ? .details ? .email
        }
        const paystackConfig = {
            method: "post",
            url: `${BASE_URL}/api/initiate_paystack`,
            headers: {
                "X-APP-KEY": NAIRABOOM_KEY,
                Authorization: `Bearer ${bearerToken}`,
            },
            data: data,
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
        }
    };

    const HandleFundMonnify = async() => {
        setPaystackLoading(true);
        // const { user } = useUser();
        const data = {
            amount: monnifyFundAmount,
        }
        if (user ? .details ? .email) {
            data.email = user ? .details ? .email
        }
        const paystackConfig = {
            method: "post",
            url: `${BASE_URL}/api/initiate_monnify`,
            headers: {
                "X-APP-KEY": NAIRABOOM_KEY,
                Authorization: `Bearer ${bearerToken}`,
            },
            data: data,
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
                title: err ? .message || "An error occured, try again later",
                position: "top",
            });
        } finally {
            setPaystackLoading(false);
        }
    };
    const [showAddEmail, setShowAddEmail] = useState(false);
    const [userEmail, setUserEmail] = useState("");

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
            // router.push("/customer_dashboard");
        } catch (err) {
            toast({
                isClosable: true,
                duration: 5000,
                status: "error",
                title: err ? .message || "An error occured, try again later",
                position: "top",
            });
        } finally {
            setupdateLoading(false);
            await fetchData2();
            setShowAddEmail(false);
            setShowAddEmail(false);
        }
    };

    return ( <
        Wrapper >
        <
        Head >
        <
        title > NairaBoom Agent Fund Account < /title> <
        meta name = "user dashboard"
        content = "nairaboom.ng agent dashboard" / >
        <
        /Head> <
        Box display = { "flex" }
        justifyContent = "space-between"
        alignItems = { "center" }
        pb = {
            { base: "2.5rem", md: "4rem" } } >
        <
        Text fontWeight = { 700 }
        fontSize = {
            { base: "1.25rem", md: "1.5rem" } }
        color = "nairablue" >
        Fund Wallet <
        /Text> <
        Box display = { "flex" }
        alignItems = "center"
        gap = "1.6rem" >
        <
        Box as = { NextLink }
        href = "/agent_dashboard/editprofile" >
        <
        Avatar name = { user ? .details ? .fullname }
        src = { user ? .details ? .customer_path }
        bg = "rgba(30, 215, 96, 0.19)"
        cursor = { "pointer" }
        /> <
        /Box> <
        /Box> <
        /Box> <
        Box > {
            method === "Virtual" && ( <
                >
                <
                Text fontWeight = { 500 }
                fontSize = "1.25rem"
                textAlign = { "center" } >
                Follow these steps to fund your wallet <
                br / >
                <
                /Text> <
                UnorderedList >
                <
                ListItem > Open your bank app < /ListItem> <
                ListItem >
                Copy the account details below and make payment <
                /ListItem> <
                ListItem >
                Upon successful payment, your Nairaboom wallet will be credited automatically. <
                /ListItem> <
                ListItem > Log in to your profile to Play Game. < /ListItem> <
                /UnorderedList> <
                Box mt = ".5rem"
                // display={"flex"}
                justifyContent = "center"
                alignItems = { "center" }
                cursor = "pointer"
                onClick = { onCopy } >
                <
                Text fontWeight = { 700 }
                fontSize = {
                    { base: "1.00rem", md: "1.25rem" } }
                color = "nairablue" >
                Bank Name <
                /Text> <
                Text fontWeight = { 400 }
                fontSize = {
                    { base: "1.00rem", md: "1.25rem" } }
                color = "nairablue" >
                { virtualAcct ? .bank_name } <
                /Text> <
                /Box> <
                Box mt = ".5rem"
                justifyContent = "center"
                alignItems = { "center" }
                cursor = "pointer"
                onClick = { onCopy } >
                <
                Text fontWeight = { 700 }
                fontSize = {
                    { base: "1.00rem", md: "1.25rem" } }
                color = "nairablue" >
                Account Number <
                /Text>

                <
                Box display = { "flex" } >
                <
                Text _hover = {
                    { color: "black" } }
                fontWeight = { 500 }
                fontSize = "1.5rem"
                textAlign = { "center" }
                color = "grey" >
                { virtualAcct ? .account_number } <
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
                /Box> <
                /Box>

                <
                Box mt = { "2rem" } >
                <
                Text fontWeight = { 400 }
                color = "nairablue" >
                Bank transfers generally credit within 10 minutes but
                if within 24 hours you are not credited, please contact your bank. <
                /Text> <
                /Box> <
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
                alignItems = { "center" } >
                <
                Text fontWeight = { 500 }
                fontSize = "1.25rem" >
                Choose wallet funding option <
                /Text> <
                Box w = "100%"
                mt = { "1.5rem" } >
                <
                form onSubmit = {
                    (e) => {
                        e.preventDefault();
                    }
                } >
                <
                Box >
                <
                SimpleGrid width = {
                    { base: "90%", md: "100%" } }
                // ml={{ base: "%", lg: "0%" }}
                mx = { "auto" }
                columns = {
                    { base: 2, md: 2 } }
                spacing = {
                    { base: 3, md: 5, lg: 10 } }
                // minChildWidth={{base: "120px", md: "90px"}}
                >
                { /* monnify Trigger button */ } <
                Box bg = "green"
                alignContent = { "center" }
                alignItems = { "center" }
                justifyContent = { "center" }
                justifyItems = { "center" }
                textAlign = { "center" }
                w = {
                    { base: "100%", md: "90%", lg: "90%" } }
                display = { "flex" }
                borderRadius = { "10px" }
                onClick = {
                    () => {
                        // if (user?.details.kyc_approved === true) {
                        // if (
                        //   user?.details.email &&
                        //   user?.details.email !== ""
                        // ) {
                        //   setmethod("Virtual");
                        // } else {
                        //   toast({
                        //     isClosable: true,
                        //     duration: 5000,
                        //     status: "error",
                        //     title:
                        //       // "Please verify your account to generate a virtual account number.",
                        //       "Please update your profile with an email address to proceed!.",
                        //     position: "top",
                        //   });
                        //   router.push("/agent_dashboard/editprofile");
                        // }
                        // if (
                        //   !user?.details.email ||
                        //   user?.details.email === ""
                        // ) {
                        //   setShowAddEmail(true);
                        // } else {
                        //   setShowMonnifyModal(true);
                        // }
                        setShowMonnifyModal(true);
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
                    { base: "0.8rem", md: "1.25rem" } }
                color = "white" >
                Fund with Monnify <
                /Text> <
                /Box> { /* Paystck trigger here */ } <
                Box bg = "green"
                alignContent = { "center" }
                alignItems = { "center" }
                justifyContent = { "center" }
                justifyItems = { "center" }
                textAlign = { "center" }
                w = {
                    { base: "100%", md: "90%", lg: "90%" } }
                display = { "flex" }
                borderRadius = { "10px" }
                onClick = {
                    () => {
                        // if (
                        //   !user?.details.email ||
                        //   user?.details.email === ""
                        // ) {
                        //   setShowAddEmail(true);
                        // } else {
                        //   setShowPaystackModal(true);
                        // }
                        setShowPaystackModal(true);
                        // toast({
                        //   isClosable: true,
                        //   duration: 5000,
                        //   status:"info",
                        //   title:
                        //     "Coming soon!.",
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
                    { base: "0.8rem", md: "1.25rem" } }
                color = "white" >
                Fund with Paystack <
                /Text> <
                /Box> <
                /SimpleGrid> <
                /Box>

                <
                Box mt = { "2rem" } >
                <
                Text textAlign = { "center" }
                margin = "0.5em 0" >
                Payment secured by <
                /Text> <
                /Box> <
                Box display = { "flex" }
                justifyContent = "space-between"
                gap = "0.5em" >
                <
                Box >
                <
                Image src = { monnifyLogo }
                alt = "monnify logo" / >
                <
                /Box> <
                Box >
                <
                Image src = { paystackLogo }
                alt = "paystack logo" / >
                <
                /Box> <
                /Box> <
                /form> <
                /Box> <
                /Box> <
                /div> <
                />
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
                Pay Directly <
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
                    { base: "100%", md: "70%" } }
                p = {
                    { base: "1rem", md: "4rem" } }
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
                    amount !== "" && ( <
                        Button w = "100%"
                        bg = "white"
                        onClick = { initiatePayment } >
                        <
                        InterswitchPay {...props }
                        /> <
                        /Button>
                    )
                } <
                /Box> <
                /form> <
                /Box> <
                /Box>
            )
        }

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
            { base: "90%", md: "50%", lg: "40%" } }
        maxW = {
            { base: "80%", md: "60%" } }
        p = {
            { base: "1rem", md: "3rem" } } >
        <
        ModalHeader > Fund your wallet with Paystack < br / >
        <
        Text fontWeight = { 500 }
        color = { "red" }
        fontSize = "1rem" >
        While your transaction is in progress, keep the payment window open until complete. <
        br / > Thank you. <
        /Text>{" "}</ModalHeader >
        <
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
            { width: "100%", flex: 1 } } >
        <
        Box bg = "white"
        fontFamily = { "poppins" }
        margin = "auto"
        w = {
            { base: "100%", md: "70%", lg: "100%" } }
        p = {
            { base: "1rem", md: "4rem" } }
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
                    { transform: "scale(1.05)" } }
                onClick = {
                    () => {
                        if (Number(paystackFundAmount) >= 500) {
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
                } >
                { paystackLoading === true ? < Spinner / > : "Proceed" } <
                /Button>
            )
        } <
        /Box> <
        /form> <
        /Box> <
        /ModalBody> <
        /ModalContent> <
        /Modal>

        {
            /* Monnify modal here
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
            { base: "90%", md: "50%", lg: "40%" } }
        maxW = {
            { base: "80%", md: "60%" } }
        p = {
            { base: "1rem", md: "3rem" } } >
        <
        ModalHeader > Fund your wallet with Monnify < br / >
        <
        Text fontWeight = { 500 }
        color = { "red" }
        fontSize = "1rem" >
        While your transaction is in progress, keep the payment window open until complete. <
        br / > Thank you. <
        /Text>{" "}</ModalHeader >
        <
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
            { width: "100%", flex: 1 } } >
        <
        Box bg = "white"
        fontFamily = { "poppins" }
        margin = "auto"
        w = {
            { base: "100%", md: "70%", lg: "100%" } }
        p = {
            { base: "1rem", md: "4rem" } }
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
                    { transform: "scale(1.05)" } }
                onClick = {
                    () => {
                        if (Number(monnifyFundAmount) >= 500) {
                            HandleFundMonnify();
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
                } >
                { paystackLoading === true ? < Spinner / > : "Proceed" } <
                /Button>
            )
        } <
        /Box> <
        /form> <
        /Box> <
        /ModalBody> <
        /ModalContent> <
        /Modal> { /* Add email modal here */ } <
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
            { base: "90%", md: "50%", lg: "40%" } }
        maxW = {
            { base: "80%", md: "60%" } }
        p = {
            { base: "1rem", md: "2rem" } } >
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
            { width: "100%", flex: 1, backgroundColor: "blue" } } >
        <
        Box bg = "white"
        fontFamily = { "poppins" }
        margin = "auto"
        w = {
            { base: "100%", md: "100%", lg: "100%" } }
        p = {
            { base: "1rem", md: "0rem" } }
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
                    { transform: "scale(1.05)" } }
                onClick = {
                    () => {
                        handleEmailUpdate();
                    }
                } >
                { paystackLoading === true ? < Spinner / > : "Proceed" } <
                /Button>
            )
        } <
        /Box> <
        /form> <
        /Box> <
        /ModalBody> <
        /ModalContent> <
        /Modal> <
        /Box> <
        /Wrapper>
    );
};

export default FundAccount;
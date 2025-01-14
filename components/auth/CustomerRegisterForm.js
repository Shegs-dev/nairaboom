import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    Spinner,
    Stack,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
    BsArrowRightCircle,
    BsChevronLeft,
    BsPerson
} from "react-icons/bs";
import {
    HiOutlineLockClosed,
    HiOutlineMail,
    HiOutlinePhone,
} from "react-icons/hi";
import { getAuthenticatedUser } from "../../lib/hooks/getAuthUser";
import useUser from "../../lib/hooks/useUser";
import { AUTH_API_ROUTES } from "../../utils/routes";
import CustomDatePicker from "../general/CustomDatePicker";
import PlayResponsibly from "../general/PlayResponsibly";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const CustomerRegisterForm = () => {
    const toast = useToast();
    const router = useRouter();
    const { r, t, type } = router.query;

    // Now, 'r' contains the value of the 'r' parameter

    const { user } = useUser();
    const [showAgent, setShowAgent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Redirect if authenticated.
    const redirectIfAuthenticated = async() => {
        const isUserAuthenticated = await getAuthenticatedUser();
        // if (isUserAuthenticated === false) {

        // }
        if (isUserAuthenticated ? .authenticated) {
            if (user ? .details ? .user_type === "customer") {
                router.push("/customer_dashboard");
            } else if (user ? .details ? .user_type === "agent") {
                router.push("/agent_dashboard");
            }
        }
    };
    useEffect(() => {
        redirectIfAuthenticated();
    });

    //View eye icons
    const [showRegPass, setShowRegPass] = useState(false);
    const [showRegConfirm, setshowRegConfirm] = useState(false);

    //Password Views
    const handleClick1 = (e) => {
        setShowRegPass(!showRegPass);
    };

    const handleClick2 = (e) => {
        setshowRegConfirm(!showRegConfirm);
    };

    //Handling Register Form data
    const [pass, setPass] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkValid = () => {
        if (pass.length >= 8 && confirmPassword === pass) {
            return false;
        } else {
            return true;
        }
    };
    const params = {
        fullname: "",
        phone_number: "",
        password: "",
        user_type: "customer",
        dob: "",
        email: "",
    };
    if (r !== undefined && r !== null) {
        params.referral_code = r;
    }

    if (t !== undefined && r !== null) {
        if (t === "share") {
            params.referral_type = "share_ads";
        }
    }
    const initialData = params;

    function formatDate(inputDate) {
        const inputDateObject = new Date(inputDate);

        const month = (inputDateObject.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDateObject.getDate().toString().padStart(2, "0");

        return `${month}/${day}`;
    }

    const [RegformData, updateData] = useState(initialData);

    const handleRegChange = (e) => {
        if (RegformData.email === "") {
            delete RegformData.email;
        }


        updateData({
            ...RegformData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const regconfig = {
        method: "post",
        url: `${BASE_URL}/api/signup`,
        headers: {
            "X-APP-KEY": NAIRABOOM_KEY,
        },
        data: RegformData,
    };

    const handleRegFormSubmit = async(e) => {
        try {
            // e.preventDefault();
            setIsLoading(true);
            if (r !== undefined && r !== null) {
                RegformData.referral_code = r;
            }

            if (t !== undefined && r !== null) {
                if (t === "share") {
                    RegformData.referral_type = "share_ads";
                }
                if (t === "normal") {
                    RegformData.referral_type = "normal";
                }
            }
            if (RegformData ? .dob) {
                RegformData.dob = formatDate(RegformData ? .dob);
            }
            if (!RegformData ? .email) {
                delete RegformData.email;
            }

            if (RegformData.password ? .length < 8) {
                toast({
                    isClosable: true,
                    duration: 5000,
                    status: "error",
                    title: "Password must be 8 characters long",
                    position: "top",
                });
            }

            const response = await axios(regconfig);

            //Error from server
            if (
                response ? .data ? .status === false &&
                response ? .data ? .payload === null
            ) {
                toast({
                    isClosable: true,
                    duration: 5000,
                    status: "error",
                    title: response.data.message,
                    position: "top",
                });
                return;
            }

            toast({
                isClosable: true,
                duration: 2000,
                status: "success",
                title: "Registration successful!",
                position: "top",
            });
            toast({
                isClosable: true,
                duration: 6000,
                status: "success",
                title: "Refer 10 people and start earning regular income with your Nairaboom account!",
                position: "top",
            });
            router.push("/auth?p=login");

            localStorage.setItem(
                "user_payload",
                JSON.stringify(response.data.payload)
            );
        } catch (err) {
            toast({
                isClosable: true,
                duration: 5000,
                status: "error",
                title: "Some error occurred! check your connection and try again.",
                position: "top",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formatDateyyy = (date) => {
        const options = { month: "2-digit", day: "2-digit" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    function formatDate2(inputDate) {
        const date = new Date(inputDate);

        // Get month and day
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const day = date.getDate().toString().padStart(2, "0");

        return `${month}/${day}`;
    }
    const [selectedDate, setSelectedDate] = useState(null);

    function formatDateString(dateString) {
        const [month, day] = dateString.split('/');
        const formattedMonth = month.length === 1 ? `0${month}` : month;
        const formattedDay = day.length === 1 ? `0${day}` : day;
        return `${formattedMonth}/${formattedDay}`;
    }


    return ( <
        >
        <
        Head >
        <
        title > Nairaboom | Sign Up < /title> <
        script async src = "https://www.googletagmanager.com/gtag/js?id=G-904C1779CP"
        strategy = "afterInteractive" /
        >
        <
        script strategy = "afterInteractive" > { `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-904C1779CP');
          ` } <
        /script> <
        /Head> <
        Stack alignItems = "center"
        pt = { 10 }
        spacing = { 5 }
        bgImage = "/redesign/generalbackground.svg"
        bgPos = "center"
        bgSize = "cover"
        pos = "relative" >
        <
        HStack w = "100%"
        justifyContent = "center"
        pos = "relative"
        pt = {
            { base: 10, md: 0 } } >
        <
        Box pos = "absolute"
        left = { 10 }
        top = {
            { base: 0, md: 3 } }
        cursor = "pointer"
        onClick = {
            () => router.replace("/") } >
        <
        BsChevronLeft size = { 30 }
        color = "white"
        onClick = {
            () => router.replace("/") }
        /> <
        /Box> <
        Image src = "/redesign/logo.png"
        alt = "Nairaboom logo"
        h = "3rem"
        w = "fit-content" /
        >
        <
        /HStack> {
            /* <Box
                          pos="absolute"
                          left={10}
                          top={{ base: 0, md: 3 }}
                          cursor="pointer"
                          onClick={() => router.back()}
                        >
                          <BsChevronLeft
                            size={30}
                            color="white"
                            onClick={() => router.back()}
                          />
                        </Box>
                    <Image
                      src="/redesign/logo.png"
                      alt="Nairaboom logo"
                      h="3rem"
                      w="fit-content"
                    /> */
        } <
        HStack color = "nairagreen"
        fontSize = {
            { md: "1.25rem" } } >
        <
        Text color = "white" > Sign Up to < /Text> <
        Text > Rollover < /Text> <
        Text > Accumulate < /Text> <
        Text > Cashout < /Text> <
        /HStack> <
        Flex justifyContent = "center"
        w = "100%"
        maxW = "85rem"
        px = { 10 }
        gap = { 5 }
        flexFlow = {
            { base: "column-reverse wrap", md: "nowrap" } } >
        <
        Flex w = {
            { base: "100%", md: "50%", lg: "70%" } }
        position = { "relative" }
        bottom = {
            { xs: "5rem", md: "0" } }
        alignItems = "flex-end"
        mt = {
            { xs: "6rem", md: "0" } } >
        <
        Image src = "/redesign/auth/signuppagemockup.png"
        alt = "" / >
        <
        /Flex> <
        Stack w = {
            { base: "100%", md: "sm" } }
        spacing = { 8 }
        alignItems = "center" >
        <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        InputLeftElement mt = { "0.4rem" }
        w = "3.6rem" >
        <
        BsPerson size = { 20 }
        color = "gray" / >
        <
        /InputLeftElement> <
        Input type = "text"
        h = "3.6rem"
        isRequired _placeholder = {
            { fontSize: "17.62px" } }
        name = "fullname"
        onChange = { handleRegChange }
        borderRadius = { 50 }
        focusBorderColor = "nairagreen"
        placeholder = "Full Name" /
        >
        <
        /InputGroup> <
        /FormControl> <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        InputLeftElement mt = { "0.4rem" }
        w = "3.6rem" >
        <
        HiOutlinePhone size = { 20 }
        color = "gray" / >
        <
        /InputLeftElement> <
        Input borderRadius = { 50 }
        placeholder = "Phone Number"
        h = "3.6rem"
        isRequired type = { "tel" }
        _placeholder = {
            { fontSize: "17.62px" } }
        focusBorderColor = "nairagreen"
        name = "phone_number"
        onChange = { handleRegChange }
        /> <
        /InputGroup> <
        /FormControl> <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        InputLeftElement mt = { "0.4rem" }
        w = "3.6rem" >
        <
        HiOutlineMail size = { 20 }
        color = "gray" / >
        <
        /InputLeftElement> <
        Input placeholder = "Email (this field is not compulsory)"
        w = "100%"
        h = "3.6rem"
        borderRadius = { 50 }
        border = { "none" }
        type = { "email" }
        _placeholder = {
            { fontSize: "13.62px" } }
        focusBorderColor = "nairagreen"
        name = "email"
        onChange = { handleRegChange }
        /> <
        /InputGroup> <
        /FormControl> <
        FormControl >
        <
        FormLabel px = { 5 }
        color = { "white" }
        fontWeight = { 500 }
        display = { "flex" } >
        Birthday { " " } <
        Text ml = { "0.2rem" }
        color = { "yellow" } > { " " }
        (Required
            for Birthday Boom) <
        /Text> <
        /FormLabel> <
        CustomDatePicker selected = { selectedDate }
        onChange = {
            (val) => {
                    // setSelectedDate(val);
                const data = RegformData;
                data.dob = formatDateString(val);
                updateData({...data });
            }
        }
        /> {
            /* <Input
                            px={8}
                            bg="white"
                            type="date"
                            h="3.6rem"
                            borderRadius={50}
                            color="gray"
                            name="dob"
                            w={{ base: "100%", md: "100%" }}
                            border={"none"}
                            bgColor="white"
                            focusBorderColor="nairagreen"
                            isRequired
                            onChange={handleRegChange}
                            // _before={{ content: "none" }}
                          /> */
        } <
        /FormControl> <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        InputLeftElement mt = { "0.4rem" }
        w = "3.6rem" >
        <
        HiOutlineLockClosed size = { 20 }
        color = "gray" / >
        <
        /InputLeftElement> <
        Input borderRadius = { 50 }
        onChange = {
            (e) => {
                handleRegChange(e);
                setPass(e.target.value);
            }
        }
        placeholder = "Password"
        w = "100%"
        h = "3.6rem"
        border = { "none" }
        bgColor = "white"
        type = { showRegPass ? "text" : "password" }
        _placeholder = {
            { fontSize: "17.62px" } }
        focusBorderColor = "nairagreen"
        isRequired name = "password" /
        >

        <
        InputRightElement w = "3rem"
        mt = { "0.4rem" } > {
            showRegPass ? ( <
                ViewIcon onClick = { handleClick1 }
                color = "gray" / >
            ) : ( <
                ViewOffIcon onClick = { handleClick1 }
                color = "gray" / >
            )
        } <
        /InputRightElement> <
        /InputGroup> <
        /FormControl> {
            RegformData.password ? .length < 8 && ( <
                Text style = {
                    { marginTop: 8 } }
                mb = "1.5rem"
                color = { "#FF0000" }
                fontSize = ".8rem" >
                Minimum of 8 characters <
                /Text>
            )
        } <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        InputLeftElement mt = { "0.4rem" }
        w = "3.6rem" >
        <
        HiOutlineLockClosed size = { 20 }
        color = "gray" / >
        <
        /InputLeftElement> <
        Input type = { showRegConfirm ? "text" : "password" }
        borderRadius = { 50 }
        placeholder = "Confirm Password"
        className = "passwordconfirm__input"
        w = "100%"
        h = "3.6rem"
        _placeholder = {
            { fontSize: "17.62px" } }
        focusBorderColor = "nairagreen"
        isRequired name = "confirmPassword"
        onChange = {
            (e) => {
                setConfirmPassword(e.target.value);
            }
        }
        /> <
        InputRightElement w = "3rem"
        mt = { "0.4rem" } > {
            showRegConfirm ? ( <
                ViewIcon onClick = { handleClick2 }
                color = "gray" / >
            ) : ( <
                ViewOffIcon onClick = { handleClick2 }
                color = "gray" / >
            )
        } <
        /InputRightElement> <
        /InputGroup> <
        /FormControl>

        {
            /* {confirmPassword.length !== RegformData.password.length && (
                          <Text mt=".3rem" mb="1.5rem" color={"red"} fontSize=".6rem">
                            {confirmPassword.length !== RegformData.password.length
                              ? "passwords must match"
                              : ""}
                          </Text>
                        )} */
        } <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        Input textAlign = "center"
        borderRadius = { 50 }
        placeholder = "Referral Link (Optional)"
        w = "100%"
        h = "3.6rem"
        border = { "none" }
        bgColor = "white"
        type = { "text" }
        _placeholder = {
            { fontSize: "17.62px" } }
        focusBorderColor = "nairagreen"
        name = "referral_code"
        value = {
            initialData.referral_code === undefined ?
            "" :
                initialData.referral_code
        }
        onChange = { handleRegChange }
        /> <
        /InputGroup> <
        /FormControl> <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        Input textAlign = "center"
        borderRadius = { 50 }
        placeholder = "Promo Code (Optional)"
        w = "100%"
        h = "3.6rem"
        border = { "none" }
        bgColor = "white"
        type = { "text" }
        _placeholder = {
            { fontSize: "17.62px" } }
        focusBorderColor = "nairagreen"
        name = "promo_code"
        value = { initialData.promo_code }
        // === undefined
        //     ? ""
        //     : initialData.promo_code
        onChange = { handleRegChange }
        /> <
        /InputGroup>

        <
        Box mt = { "1em" }
        display = { "flex" }
        justifyContent = { "center" }
        alignItems = { "center" }
        textAlign = "center" >
        <
        Checkbox colorScheme = "nairagreen"
        color = { "white" }
        p = { "0.5em" }
        display = {
            { base: "flex" } } >
        { /* I Agree to T & Cs */ }
        I Agree to { " " } <
        /Checkbox> <
        Link as = { Link }
        to = "/terms_conditions"
        href = "/terms_conditions"
        color = "blue.500" >
        { /* T & Cs */ } <
        Text color = { "nairagreen" }
        style = {
            { textDecoration: "underline" } } > T & Cs < /Text> <
        /Link> <
        /Box> <
        /FormControl> <
        Button w = "100%"
        colorScheme = "none"
        bg = "nairagreen"
        color = "white"
        h = "3.6rem"
        borderRadius = { 50 }
        pos = "relative"
        className = "submit__reg"
        border = { "none" }
        type = { "submit" }
        fontWeight = { 600 }
        fontSize = "lg"
        cursor = { "pointer" }
        _hover = {
            { transform: "scale(1.05)" } }
        isDisabled = { checkValid() }
        onClick = {
            () => handleRegFormSubmit() } >
        { /* SIGN UP */ } { isLoading === true ? < Spinner / > : "SIGN UP" } <
        Box pos = "absolute"
        right = { 3 } >
        <
        BsArrowRightCircle size = { 24 }
        /> <
        /Box> <
        /Button> <
        VStack spacing = { 1 } >
        <
        Text color = "white" > Already have an account ? < /Text> <
        Button variant = "outline"
        colorScheme = "green"
        color = "nairagreen"
        borderRadius = { 50 }
        borderWidth = { 2 }
        borderColor = "nairagreen"
        px = { 5 }
        h = "2rem"
        onClick = {
            () => router.push("/auth?p=login") } >
        Log in
        <
        /Button> <
        /VStack> <
        VStack w = "100%"
        py = {
            { base: 2, md: 14 } }
        pos = {
            { base: "absolute", md: "relative" } }
        bottom = { 0 }
        fontSize = {
            { base: "0.8rem", md: "1rem" } }
        background = {
            { base: "rgba( 255, 255, 255, 0.35 )", md: "none" } }
        boxShadow = {
            {
                base: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                md: "none",
            }
        }
        backdropFilter = {
            { base: "blur( 12px )", md: "none" } }
        borderRadius = {
            {
                base: "50% 50% 10% 10% / 40% 40% 0% 0%",
                md: "none",
            }
        } >
        <
        PlayResponsibly color = "white" / >
        <
        HStack >
        <
        Text textAlign = "center"
        color = "white"
        maxW = {
            { base: "18rem", md: "23rem" } } >
        Nairaboom is licensed and regulated by the National Lottery Regulatory Commission(NLRC). { "" }
        License number 00000060 <
        /Text> <
        Image w = "2rem"
        src = "/redesign/nlrclogo.png"
        alt = "" / >
        <
        /HStack> <
        /VStack> <
        /Stack> <
        /Flex> <
        /Stack> <
        />
    );
};

export default CustomerRegisterForm;
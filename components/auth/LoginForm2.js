import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import FormData from "form-data";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowRightCircle, BsChevronLeft } from "react-icons/bs";
import {
  storeTokenInLocalStorage,
  storeTokenInLocalStorage2,
} from "../../lib/hooks/getAuthUser";
import useUser from "../../lib/hooks/useUser";
import { AUTH_API_ROUTES } from "../../utils/routes";
import PlayResponsibly from "../general/PlayResponsibly";

// secret credentials
const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const LoginForm2 = () => {
    const router = useRouter();
    const toast = useToast();
    let formData = new FormData();

    const { user, authenticated } = useUser();
    const { p } = router.query;
    const user_type = user ? .details ? .user_type;

    //Remember me checked
    const [isChecked, setIsChecked] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

    //Form submission loading
    const [isLoading, setIsLoading] = useState(false);

    const handleTogglePasswordVisible = () =>
        setPasswordVisible(!passwordVisible);

    //Handling sign in form data
    const initialSignInFormData = Object.freeze({
        username: "",
        password: "",
        remember_me: isChecked,
        user_type: "agent",
    });
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const [signInformData, updateSignInFormData] = useState(
        initialSignInFormData
    );

    const handleSignInChange = (e) => {
        updateSignInFormData({
            ...signInformData,
            [e.target.name]: e.target.value,
        });
    };

    const signinconfig = {
        method: "post",
        url: `${BASE_URL}/api/auth`,
        headers: {
            "X-APP-KEY": NAIRABOOM_KEY,
        },
        data: signInformData,
    };

    const handleSignInFormSubmit = async(e) => {
        formData.append("username", username); //append the values with key, value pair
        formData.append("passsword", password);
        try {
            // e.preventDefault();
            setIsLoading(true);
            const response = await axios(signinconfig);

            if (response ? .data ? .status === false) {
                toast({
                    isClosable: true,
                    duration: 5000,
                    status: "error",
                    title: response.data.message,
                    position: "top",
                });
                return;
            }

            signInformData.remember_me === true &&
                storeTokenInLocalStorage(response.data.payload.remember_me.token);
            storeTokenInLocalStorage2(response.data.payload.remember_me.token);

            localStorage.setItem(
                "items",
                JSON.stringify(response.data.payload ? .remember_me.token)
            );

            toast({
                isClosable: true,
                duration: 3000,
                status: "success",
                title: "Log In Successful!",
                position: "top",
            });

            response ? .data ? .payload ? .details ? .user_type === "customer" &&
                router.push("/customer_dashboard");

            response ? .data ? .payload ? .details ? .user_type === "agent" &&
                router.push("/agent_dashboard");
        } catch (err) {
            toast({
                isClosable: true,
                duration: 5000,
                status: "error",
                title: err ? .response ? .data ? .message ?
                    err ? .response ? .data ? .message :
                    "Some error occurred! check your connection.",
                position: "top",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return ( <
        >
        <
        Head >
        <
        title > Nairaboom | Log In < /title> <
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
        Stack fontFamily = "Inter"
        alignItems = "center"
        pt = { 10 }
        spacing = { 10 }
        bgImage = "/redesign/generalbackground.svg"
        bgPos = "center"
        bgSize = "cover"
        pos = "relative" >
        <
        Stack w = "100%"
        maxW = "65rem"
        alignItems = "center"
        spacing = { 10 }
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
            () => router.push("/") } >
        <
        BsChevronLeft size = { 30 }
        color = "white"
        onClick = {
            () => router.back() }
        /> <
        /Box> <
        Image src = "/redesign/logo.png"
        alt = "Nairaboom logo"
        h = "3rem"
        w = "fit-content" /
        >
        <
        /HStack> <
        Text color = "white"
        fontWeight = { 600 } >
        Log In To Boom!(Agent) <
        /Text> <
        Stack alignSelf = {
            { md: "flex-end" } }
        justifySelf = {
            { md: "flex-end" } }
        w = {
            { base: "xs", md: "md" } }
        spacing = { 8 }
        alignItems = "center" >
        <
        FormControl >
        <
        InputGroup bg = "white"
        borderRadius = { 50 } >
        <
        Input type = "text"
        borderRadius = { 50 }
        placeholder = "Email/Phone Number"
        textAlign = "center"
        onChange = { handleSignInChange }
        name = "username"
        focusBorderColor = "nairagreen"
        h = "3.6rem"
        isRequired /
        >
        <
        /InputGroup> <
        /FormControl> <
        FormControl >
        <
        InputGroup bg = "white"
        justifyItems = { "center" }
        borderRadius = { 50 } >
        <
        Input textAlign = "center"
        type = { passwordVisible ? "text" : "password" }
        borderRadius = { 50 }
        placeholder = "Confirm Password"
        onChange = { handleSignInChange }
        focusBorderColor = "nairagreen"
        h = "3.6rem"
        name = "password"
        isRequired /
        >
        <
        InputRightElement w = "3rem"
        marginTop = { "8px" } > {
            passwordVisible ? ( <
                ViewIcon onClick = { handleTogglePasswordVisible }
                color = "gray" /
                >
            ) : ( <
                ViewOffIcon onClick = { handleTogglePasswordVisible }
                color = "gray" /
                >
            )
        } <
        /InputRightElement> <
        /InputGroup> <
        /FormControl> <
        HStack color = "white"
        w = "100%"
        px = { 4 }
        pb = { 8 } >
        <
        Checkbox defaultChecked value = { isChecked }
        name = "remember_me"
        onChange = { handleSignInChange }
        colorScheme = "green" >
        Remember Me <
        /Checkbox> <
        Spacer / >
        <
        Button variant = "link"
        color = "white"
        fontWeight = { 400 }
        textDecor = "underline"
        // mb="6rem"
        // float={"right"}
        // as={Link}
        // textDecoration={"underline"}
        href = "/forgot_password"
        onClick = {
            () => router.push("/forgot_password") } >
        Forgot Password ?
        <
        /Button> <
        /HStack> <
        Button w = "100%"
        colorScheme = "none"
        bg = "nairagreen"
        color = "white"
        borderRadius = { 50 }
        pos = "relative"
        h = "3.6rem"
        type = "submit"
        onClick = {
            () => handleSignInFormSubmit() } >
        {
            isLoading === true ? ( <
                Spinner / >
            ) : ( <
                >
                LOG IN <
                Box pos = "absolute"
                right = { 3 } >
                <
                BsArrowRightCircle size = { 24 }
                /> <
                /Box> <
                />
            )
        } <
        /Button> <
        Box h = "20rem" / >
        <
        Image w = "42rem"
        src = "/redesign/auth/login-mockup.png"
        pos = "absolute"
        bottom = {
            { xs: "4.5rem", md: "0" } }
        left = {
            { base: "auto", md: -10 } }
        alt = "" /
        >
        <
        VStack w = "100%"
        py = {
            { base: 4, md: 14 } }
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
        /Stack> <
        /Stack> <
        />
    );
};

export default LoginForm2;
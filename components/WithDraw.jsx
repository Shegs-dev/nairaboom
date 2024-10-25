import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import useUser from "../lib/hooks/useUser";
import frame from "../public/wallet/frame.png";
import { AUTH_API_ROUTES } from "../utils/routes";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const WithDraw = () => {
  const toast = useToast();
  const [bank, setBank] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  //debounced accout number
  const [acct, setAcct] = useState("");
  const [debounedText] = useDebounce(acct, 700);

  //Load state for validation
  const [validateLoading, setValidateLoading] = useState(false);

  //Is user validated
  const [valid, setValid] = useState(false);
  const [detailsExisted, setDetailsExisted] = useState(false);

  const [amountTyped, setAmountTyped] = useState("");

  //store response data from backend
  const [validateData, setValidateData] = useState("");
  const [bankData, setBankData] = useState([]);

  const { user } = useUser();
  const bearerToken = user?.token;
  const router = useRouter();
  const isCustomer = router.pathname.includes("customer_dashboard");

  //Fetch Bank list
  useEffect(() => {
    if (!bearerToken) return;
    const fetchBankList = async () => {
      const bankconfig = {
        method: "get",
        url: `${BASE_URL}/api/bank_lists?start=0&len=209&paging=1`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        const response = await axios(bankconfig);
        setBankData(response.data.payload.content);
      } catch (err) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: err?.response?.data?.message
            ? err?.response?.data?.message
            : "Some error occurred! check your connection.",
          position: "top",
        });
      }
    };
    if (debounedText) {
      validateAccountDetails(bank);
    }
    fetchBankList();

    if (
      user?.details.bank_name &&
      user?.details.bank_code &&
      user?.details.account_name &&
      user?.details.account_number
    ) {
      setValid(true);
      setDetailsExisted(true);
    }
  }, [bearerToken, debounedText, toast, user]);

  const initailWithData = {
    amount: "",
    bank_code: "",
    account_number: "",
    account_name: "",
  };

  const initailWithProcessedData = {
    amount: amountTyped,
    bank_code: user?.details.bank_code,
    account_number: user?.details.account_number,
    account_name: user?.details.account_name,
  };
  const [withdraw, setWithdraw] = useState(initailWithData);
  const handleChange = (e) => {
    setWithdraw({
      ...withdraw,
      [e.target.name]: e.target.value.trim(),
      account_name: validateData,
      // account_number: acct,
    });
    setAmountTyped(e.target.value.trim());
    if (e.target.name == "bank_code") {
      // validateAccountDetails(withdraw?.account_number);
      setValidateData("");
      setWithdraw({
        ...withdraw,
        account_number: "",
        bank_code: e.target.value.trim(),
      });
    }
    if (e.target.name == "account_number") {
      if (e.target.value?.length > 9) {
        validateAccountDetails(e.target.value);
      }
      if (e.target.value?.length < 10) {
        setValidateData("");
      }
    }
  };
  const validateAccountDetails = async (item) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/api/fetch_account_name`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        // account_number: withdraw?.account_number,
        account_number: item || withdraw?.account_number,
        // bank_code: withdraw?.bank_code,
        bank_code:
          withdraw?.bank_code?.length === 2
            ? `0${withdraw?.bank_code}`
            : withdraw?.bank_code,
      },
    };

    try {
      setValid(false);
      setValidateLoading(true);
      const res = await axios(config);
      
      if (res?.data?.status === false) {
        setValidateData("");
        return;
      }

      if (res?.data?.status === true) {
        setValidateData(res.data.payload.account_name);
        setValid(true);
        return;
      }
    } catch (error) {
      toast({
        isClosable: true,
        duration: 3000,
        status: "error",
        title: error.message
          ? `${error.message}`
          : "Some error occurred! check your connection and try again.",
        position: "top",
      });
    } finally {
      setValidateLoading(false);
    }
  };

  const checkValidAccount = () => {
    if (acct.length === 10) {
      validateAccountDetails();
    }

    if (acct.length < 10 || acct.length > 10) {
      setValid(false);
    }
  };

  const processWithDrawal = async (e) => {
    const payload = detailsExisted ? initailWithProcessedData : withdraw;

    if (validateData) {
      payload.account_name = validateData;
    }
    const config = {
      method: "post",
      // url: `${BASE_URL}/api/withdrawal`,
      url: `${BASE_URL}/api/initiate_withdrawal`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: payload,
    };

    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios(config);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: response.data.message,
        position: "top",
      });
      // router.push(
      //   isCustomer
      //     ? "/customer_dashboard/cashback"
      //     : "/agent_dashboard/cashback"
      // );
      router.push(isCustomer ? "/customer_dashboard" : "/agent_dashboard");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Some error occurred! check your connection.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const someFunc = () => {
    setValid(false);
    onClose();
  };

  return (
    <>
      <Button
        fontWeight={600}
        fontSize=".8rem"
        bgColor="nairagreen"
        color="white"
        borderRadius="3px"
        transition={"all ease-in-out .4s"}
        _hover={{}}
        textAlign="center"
        py={".8rem"}
        w="8.6rem"
        boxShadow={"inner"}
        bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
        onClick={() => {
          if (isLoading) {
            return;
          }
          if (user?.details.kyc_approved === true) {
            onOpen();
          } else {
            toast({
              isClosable: true,
              duration: 5000,
              status: "error",
              title: "Please Verify account to WithDraw Funds.",
              position: "top",
            });
            router.push(
              `/${
                isCustomer ? "customer_dashboard" : "agent_dashboard"
              }/editprofile`
            );
          }
        }}
      >
        Withdraw
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={someFunc}>
        <ModalOverlay />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "40%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
            Withdraw Funds
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={processWithDrawal}>
              <FormLabel>Amount</FormLabel>
              <Input
                autoFocus
                type="number"
                focusBorderColor="nairagreen"
                isRequired
                name="amount"
                onChange={(e) => {
                  handleChange(e);
                }}
                mb="1rem"
              />
              <FormLabel>Bank</FormLabel>
              <Select
                name="bank_code"
                mb="1rem"
                focusBorderColor="nairagreen"
                onChange={(e) => {
                  handleChange(e);
                  setBank(e.target.value);
                  handleChange(e);
                  if (acct.length !== 0 && acct.length > 8) {
                    validateAccountDetails(e.target.value);
                  }
                }}
                isRequired
              >
                <option>
                  {user?.details.bank_name ? user?.details.bank_name : "Bank"}
                </option>
                {user?.details.bank_name
                  ? null
                  : bankData.map((bank, index) => (
                      <option key={index} value={bank.bank_code}>
                        {bank.name}
                      </option>
                    ))}
              </Select>

              <FormLabel>Account Number</FormLabel>
              <Input
                type="number"
                focusBorderColor="nairagreen"
                isRequired
                contentEditable={user?.details.account_number ? false : true}
                name="account_number"
                mb="1rem"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={
                  user?.details.account_number
                    ? user?.details.account_number
                    : withdraw.account_number
                }
                // onChange={(e) => setAcct(e.target.value)}
              />
              <Box float={"right"} display="flex" alignItems={"center"}>
                <Image src={frame} alt="frame" />
                <Box fontSize={"1rem"}>
                  {user?.details.account_name ? (
                    user?.details.account_name
                  ) : valid ? (
                    validateData
                  ) : validateLoading ? (
                    <Spinner />
                  ) : (
                    "..."
                  )}
                </Box>
              </Box>
              <Button
                w="100%"
                type="submit"
                bgColor={"nairagreen"}
                cursor="pointer"
                color="white"
                fontWeight={700}
                mt="2rem"
                _hover={{ transform: "scale(1.05)" }}
                isDisabled={valid ? false : true}
              >
                {isLoading === true ? <Spinner /> : "Withdraw"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WithDraw;

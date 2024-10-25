/* eslint-disable react/prop-types */
import { Box, Text, Toast, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_API_ROUTES } from "../utils/routes";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const Clock = (props) => {
  const [data, setData] = useState(["22", "30", "50", "70"]);
  const toast = useToast();

  useEffect(() => {
    const config = {
      method: "get",
      url: `${BASE_URL}/api/fetch_clock`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
      },
    };

    const interval = setInterval(async () => {
      try {
        const response = await axios(config);

        if (response.data.status === false) {
          return;
        }
        const clock = response.data.payload;
        setData([
          clock.t_hour,
          clock.t_minute,
          clock.t_second
        ]);
      } catch (err) {
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [toast]);

  const times = ["Hour", "Minute", "Second"];
  const hour = data[0];
  const minute = data[1];
  const second = data[2];
  const percentage = data[3];

  return (
    <>
      <Text
        letterSpacing={"0.15em"}
        fontSize={{ base: "1.3rem", md: "1.8rem" }}
        fontWeight={700}
        w={"100%"}
        textAlign="center"
        color={props.clockcolor}
      
      >
        {`${hour}  :  ${minute}  :  ${second} `}
      </Text>
      <Box
        color={props.textcolor}
        display={"flex"}
        w="100%"
        justifyContent={{base:"center"}}
        flexWrap="wrap"
        gap={{ base: "1rem" }}
      >
        {times.map((time, index) => (
          <Text
            key={index}
            fontWeight={400}
            fontSize={{ base: ".8rem", md: "1rem" }}
          >
            {time}
          </Text>
        ))}
      </Box>
    </>
  );
};

export default Clock;

import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

const CustomDate = () => {
  const [maxDate, setMaxDate] = useState(getCurrentDate());

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Add leading zero if month or day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleChange = (event) => {
    // Your change handling logic
  };

  return (
    <FormControl>
      <FormLabel px={5} fontWeight={500}>
        Date You Received Alert
      </FormLabel>
      <Input
        name="date_received_alert"
        w={{ base: "100%", md: "28rem" }}
        h="3.25rem"
        border="none"
        color="#A7A7A7"
        bgColor="white"
        type="date"
        mb="1rem"
        focusBorderColor="nairagreen"
        isRequired
        borderRadius={50}
        onChange={handleChange}
        max={maxDate}
      />
    </FormControl>
  );
};

export default CustomDate;

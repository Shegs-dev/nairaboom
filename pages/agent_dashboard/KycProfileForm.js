/* eslint-disable react/prop-types */
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";

function KycProfileForm({
  setplace_of_birth,
  setstreet,
  setcity,
  setstate,
  setpostal_code,
  setcountry,
  setgender,
}) {
  return (
    <Box w={{ base: "100%", md: "90%" }} pt="2.35rem">
      {/* Place of birth */}
      <Box my="2">
        <FormLabel
          fontWeight={500}
          fontSize={{ base: "1rem", md: "lg" }}
          w="max-content"
          color="nairablue"
        >
          Place of Birth
        </FormLabel>
        <Input
          defaultValue="Port Harcourt"
          rounded="md"
          background="white"
          p="4"
          onChange={(e) => setplace_of_birth(e.target.value)}
        />
      </Box>

      <HStack>
        {/* Gender Input */}
        <HStack my="2">
          <FormLabel
            fontWeight={500}
            fontSize={{ base: "1rem", md: "lg" }}
            w="max-content"
            color="nairablue"
          >
            Gender
          </FormLabel>

          <Box>
            <Select
              placeholder="Gender"
              onChange={(e) => setgender(e.target.value)}
            >
              <option variant="filled" value="male">
                Male
              </option>
              <option variant="filled" value="male">
                Female
              </option>
            </Select>
          </Box>
        </HStack>
        {/* Country Input */}
        <HStack my="2">
          <FormLabel
            fontWeight={500}
            fontSize={{ base: "1rem", md: "lg" }}
            w="max-content"
            color="nairablue"
          >
            Country
          </FormLabel>

          <Box>
            <Select
              placeholder="Country"
              onChange={(e) => setcountry(e.target.value)}
            >
              <option variant="filled" value="nigeria">
                Nigeria
              </option>
              <option variant="filled" value="other">
                Others
              </option>
            </Select>
          </Box>
        </HStack>
      </HStack>

      {/* Address Fieldset */}
      <fieldset style={{border: '2px solid black', padding: '1em 2em', borderRadius: '10px'}}>
        <legend>Address</legend>
        {/* City and Street here */}
        <HStack>
          <Box my="2">
            <FormLabel
              fontWeight={500}
              fontSize={{ base: "1rem", md: "lg" }}
              w="max-content"
              color="nairablue"
            >
              Street
            </FormLabel>
            <Input
              defaultValue="Street Goes here"
              rounded="md"
              background="white"
              p="4"
              onChange={(e) => setstreet(e.target.value)}
            />
          </Box>

          <Box my="2">
            <FormLabel
              fontWeight={500}
              fontSize={{ base: "1rem", md: "lg" }}
              w="max-content"
              color="nairablue"
            >
              City
            </FormLabel>
            <Input
              defaultValue="City goes here"
              rounded="md"
              background="white"
              p="4"
              onChange={(e) => setcity(e.target.value)}
            />
          </Box>
        </HStack>

        {/* State and postal code here */}
        <HStack>
          <Box my="2">
            <FormLabel
              fontWeight={500}
              fontSize={{ base: "1rem", md: "lg" }}
              w="max-content"
              color="nairablue"
            >
              State
            </FormLabel>
            <Input
              defaultValue="State Goes here"
              rounded="md"
              background="white"
              p="4"
              onChange={(e) => setstate(e.target.value)}
            />
          </Box>

          <Box my="2">
            <FormLabel
              fontWeight={500}
              fontSize={{ base: "1rem", md: "lg" }}
              w="max-content"
              color="nairablue"
            >
              Postal Code
            </FormLabel>
            <Input
              defaultValue="City goes here"
              rounded="md"
              background="white"
              p="4"
              onChange={(e) => setpostal_code(e.target.value)}
            />
          </Box>
        </HStack>
      </fieldset>
    </Box>
  );
}

export default KycProfileForm;

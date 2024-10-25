/* eslint-disable react/prop-types */
import { Box, Heading, chakra } from "@chakra-ui/react";
import background from "../public/aboutpage/background.png";
const BackgroundTitle = (props) => {
    return (
        <Box
        backgroundImage={`url(${background.src})`}
        backgroundPosition={{base:"right", md:"center"}}
        backgroundRepeat="no-repeat"
        backgroundSize={"cover"}
        backgroundAttachment="fixed"
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        py={{base:"8rem",lg:"10rem"}}
      >
        <Heading
          color={"nairablue"}
          fontSize={{base:"2rem", md:"3.5rem"}}
          fontWeight={700}
          fontFamily={"poppins"}
          maxW="37rem"
          textAlign={"center"}
        >
          {props.longbit}
          <chakra.span
            borderRadius={"4px"}
            borderBottom="10px solid"
            borderColor="nairagreen"
          >
            {props.shortbit}
          </chakra.span>
        </Heading>
      </Box>
    );
}
 
export default BackgroundTitle;
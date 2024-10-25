import { Box, Center, Spinner } from '@chakra-ui/react';

function AudioFrequencyIndicator() {
  return (
    <Center h="100vh">
      <Box w="100px" h="100px" position="relative">
        <Spinner
          thickness="2px"
          speed="0.7s"
          emptyColor="transparent"
          color="blue.500"
          size="lg"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          animation="pulse 1.5s infinite"
          borderRadius="50%"
          opacity="0"
          boxShadow="0 0 10px 5px rgba(0, 0, 255, 0.5)"
        />
      </Box>
    </Center>
  );
}

export default AudioFrequencyIndicator;

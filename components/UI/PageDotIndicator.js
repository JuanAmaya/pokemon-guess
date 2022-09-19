import { Center, Container, Circle } from "@chakra-ui/react";

const PageDotIndicator = () => {
  let n = 6;
  return (
    <Center gap="1rem">
      {[...Array(n)].map((i) => (
        <Circle
          key={Math.random().toString()}
          w="10px"
          h="10px"
          bg="white"
          borderRadius="100%"
          pos="absolute"
          bottom="1rem"
        />
      ))}
    </Center>
  );
};

export default PageDotIndicator;

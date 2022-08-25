import { Center, Text } from "@chakra-ui/react";

const StartGameTimer = (props) => {
  return (
    <Center>
      <Text fontSize="6xl">{props.startTimer}</Text>
    </Center>
  );
};

export default StartGameTimer;

import { Center, Text } from "@chakra-ui/react";

const GameScore = (props) => {
  return (
    <Center mb="2rem">
      <Text fontSize="2xl">Score: {props.score}</Text>
    </Center>
  );
};

export default GameScore;

import { Center, Text, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ButtonDefault from "../UI/ButtonDefault";

const GameOverScreen = (props) => {
  useEffect(() => {
    const currentHighScore = JSON.parse(localStorage.getItem("highScore"));
    if (props.matchScore > currentHighScore || currentHighScore === undefined) {
      console.log("Nuevo record");
      localStorage.setItem("highScore", JSON.stringify(props.matchScore));
    }
  }, [props.matchScore]);

  const redText = useColorModeValue("red.500", "red.600");

  const playAgainHandler = () => {
    props.onGameOver(false);
    props.onPlayGame(true);
  };

  const menuHandler = () => {
    props.onGameOver(false);
    props.onPlayGame(false);
  };

  return (
    <Center pt="5rem" flexDir="column">
      <Image src="./img/psyduck.png" alt="Psyduck Game Over" width="100px" />
      <Text
        textTransform="uppercase"
        color={redText}
        fontSize="5xl"
        fontWeight="bold"
      >
        Game Over
      </Text>
      <Text fontSize="2xl" mb="2rem">
        Score: {props.matchScore}
      </Text>
      <Center flexDir="column" gap="1rem">
        <ButtonDefault onClick={playAgainHandler}>Play Again</ButtonDefault>
        <ButtonDefault onClick={menuHandler}>Menu</ButtonDefault>
      </Center>
    </Center>
  );
};

export default GameOverScreen;

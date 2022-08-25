import ButtonDefault from "../UI/ButtonDefault";

import { Container, Text, Center, Image } from "@chakra-ui/react";

import PokemonLogo from "../../public/img/pokemon-logo.png";
import GuessLogo from "../../public/img/guess-logo.png";
import { useEffect, useState } from "react";

const MenuScreen = (props) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("highScore") === null) {
      localStorage.setItem("highScore", JSON.stringify(highScore));
    } else {
      const currentHighScore = JSON.parse(localStorage.getItem("highScore"));
      setHighScore(currentHighScore);
    }
  }, []);

  return (
    <Container m="0 auto" pt="3rem">
      <Center flexDir="column">
        <Image src="./img/pokemon-logo.png" alt="Pokemon log" w="400px" />
        <Image src="./img/guess-logo.png" w="400px" />
      </Center>

      <Center>
        <Text fontSize="2xl">High Score: {highScore}</Text>
      </Center>
      <ButtonDefault
        onClick={() => props.onPlayGame(true)}
        style={{ marginTop: "2rem" }}
      >
        Play
      </ButtonDefault>
    </Container>
  );
};

export default MenuScreen;

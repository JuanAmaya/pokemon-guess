import ButtonDefault from "../UI/ButtonDefault";

import { Container, Text, Center, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import LevelBar from "../UI/LevelBar";

const MenuScreen = (props) => {
  const [highScore, setHighScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const pokemonTitleVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    leave: {
      width: 0,
    },
  };

  useEffect(() => {
    if (localStorage.getItem("highScore") === null) {
      localStorage.setItem("highScore", JSON.stringify(highScore));
    } else {
      const currentHighScore = JSON.parse(localStorage.getItem("highScore"));
      setHighScore(currentHighScore);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("totalScore") === null) {
      localStorage.setItem("totalScore", JSON.stringify(totalScore));
    } else {
      const currentTotalScore = JSON.parse(localStorage.getItem("totalScore"));
      setTotalScore((prevScore) => prevScore + currentTotalScore);
    }
  }, []);

  return (
    <Container m="0 auto" pt="3rem">
      <Center flexDir="column">
        <Image
          src="./img/pokemon-logo.png"
          alt="Pokemon log"
          w="400px"
          as={motion.img}
          variants={pokemonTitleVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        />
        <Image
          src="./img/guess-logo.png"
          w="400px"
          as={motion.img}
          variants={pokemonTitleVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        />
      </Center>

      {/* <Center>
        <Text fontSize="2xl">High Score: {highScore}</Text>
      </Center> */}
      <Center>
        <LevelBar scoreProgress={totalScore} />
      </Center>

      <ButtonDefault
        onClick={() => props.onPlayGame(true)}
        style={{ marginTop: "2rem" }}
        delayTime=".02"
      >
        Play
      </ButtonDefault>

      <ButtonDefault
        onClick={() => props.onInstructions(true)}
        style={{ marginTop: "1rem" }}
        delayTime=".08"
      >
        Instructions
      </ButtonDefault>
    </Container>
  );
};

export default MenuScreen;

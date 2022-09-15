import { Center, Text, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ButtonDefault from "../UI/ButtonDefault";
import { motion, AnimatePresence } from "framer-motion";

const GameOverScreen = (props) => {
  const psyduckVariants = {
    hidden: {
      x: -20,
      rotate: -10,
    },
    visible: {
      x: 20,
      rotate: 10,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
    leave: {
      width: 0,
    },
  };

  const gameOverTitleVariants = {
    hidden: {
      opacity: 0,
      fontSize: "20rem",
      position: "absolute",
    },
    visible: {
      opacity: 1,
      fontSize: "3rem",
      position: "relative",
      transition: {
        duration: 0.2,
      },
    },
    leave: {
      width: 0,
    },
  };

  const scoreVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
    leave: {
      width: 0,
    },
  };

  useEffect(() => {
    const currentHighScore = JSON.parse(localStorage.getItem("highScore"));
    const currentTotalScore = JSON.parse(localStorage.getItem("totalScore"));
    if (props.matchScore > currentHighScore || currentHighScore === undefined) {
      console.log("Nuevo record");
      localStorage.setItem("highScore", JSON.stringify(props.matchScore));
    }
    const addScore = 0;
    if (props.difficulty !== "easy") {
      addScore = props.matchScore * 2 + currentTotalScore;
    } else {
      addScore = props.matchScore + currentTotalScore;
    }
    localStorage.setItem("highScore", JSON.stringify(props.matchScore));
    localStorage.setItem("totalScore", JSON.stringify(addScore));
  }, [props.matchScore]);

  const redText = useColorModeValue("red.500", "red.600");

  const playAgainHandler = () => {
    props.onGameOver(false);
    {
      props.difficulty === "easy"
        ? props.onEasyMode(true)
        : props.onHardMode(true);
    }
  };

  const selectModeHandler = () => {
    props.onGameOver(false);
    props.onPlayGame(true);
  };

  const menuHandler = () => {
    props.onGameOver(false);
    props.onPlayGame(false);
  };

  return (
    <Center pt="5rem" flexDir="column">
      <Image
        src="./img/psyduck.png"
        alt="Psyduck Game Over"
        width="100px"
        as={motion.img}
        variants={psyduckVariants}
        initial="hidden"
        animate="visible"
        exit="leave"
      />
      <Text
        textTransform="uppercase"
        color={redText}
        fontSize="5xl"
        fontWeight="bold"
        as={motion.p}
        variants={gameOverTitleVariants}
        initial="hidden"
        animate="visible"
        exit="leave"
        whiteSpace="nowrap"
      >
        Game Over
      </Text>
      <Text
        fontSize="2xl"
        mb="2rem"
        as={motion.p}
        variants={scoreVariants}
        initial="hidden"
        animate="visible"
        exit="leave"
        textAlign="center"
      >
        Score: {props.matchScore}{" "}
        {props.difficulty !== "easy" && (
          <Text textAlign="center">Bonus x 2 = {props.matchScore * 2}</Text>
        )}
      </Text>
      <Center flexDir="column" gap="1rem">
        <ButtonDefault onClick={playAgainHandler} delayTime=".2">
          Play Again
        </ButtonDefault>
        <ButtonDefault onClick={selectModeHandler} delayTime=".3">
          Select Mode
        </ButtonDefault>
        <ButtonDefault onClick={menuHandler} delayTime=".4">
          Menu
        </ButtonDefault>
      </Center>
    </Center>
  );
};

export default GameOverScreen;

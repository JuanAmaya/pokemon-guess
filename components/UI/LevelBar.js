import { Container, Text, Image, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const LevelBar = (props) => {
  const progressBG = useColorModeValue("arceusSand.500", "arceusBlue.200");
  const progressFont = useColorModeValue("arceusBlue.200", "arceusSand.500");
  const levelBG = useColorModeValue("#E3E4E7", "#282929");

  const [level, setLevel] = useState(1);
  const [scoreConverted, setScoreConverted] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("totalScore") === null) {
      localStorage.setItem("totalScore", JSON.stringify(totalScore));
    } else {
      const currentTotalScore = JSON.parse(localStorage.getItem("totalScore"));
      setTotalScore((prevScore) => prevScore + currentTotalScore);
    }
  }, []);

  useEffect(() => {
    if (totalScore < 10) {
      setScoreConverted((totalScore * 100) / 10);
    } else if (totalScore < 50) {
      setScoreConverted((totalScore * 100) / 50);
      setLevel(2);
    } else if (totalScore < 100) {
      setScoreConverted((totalScore * 100) / 100);
      setLevel(3);
    } else if (totalScore < 200) {
      setScoreConverted((totalScore * 100) / 200);
      setLevel(4);
    } else if (totalScore < 500) {
      setScoreConverted((totalScore * 100) / 500);
      setLevel(5);
    } else if (totalScore < 1000) {
      setScoreConverted((totalScore * 100) / 1000);
      setLevel(6);
    } else if (totalScore < 2000) {
      setScoreConverted((totalScore * 100) / 2000);
      setLevel(7);
    } else if (totalScore < 3000) {
      setScoreConverted((totalScore * 100) / 3000);
      setLevel(8);
    } else if (totalScore < 5000) {
      setScoreConverted((totalScore * 100) / 5000);
      setLevel(9);
    } else if (totalScore < 10000) {
      setScoreConverted((totalScore * 100) / 10000);
      setLevel(10);
    } else if (totalScore > 10000) {
      setScoreConverted(100);
      setLevel("MAX");
    }
  }, [totalScore]);

  const levelBarVariants = {
    hidden: {
      width: 0,
    },
    visible: {
      width: "90%",
    },
    leave: {
      width: 0,
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  };

  const scoreBarVariants = {
    hidden: {
      width: 0,
    },
    visible: {
      width: `${scoreConverted}%`,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.6,
      },
    },
    leave: {
      width: 0,
    },
  };

  return (
    <Container p="0" pt="2rem">
      <Container
        p="0"
        w="90%"
        h="50px"
        borderRadius="10px"
        bg={levelBG}
        position="relative"
        left=".7rem"
        as={motion.div}
        variants={levelBarVariants}
        initial="hidden"
        animate="visible"
        exit="leave"
      >
        <Image
          src={`./img/level-profile/${level}.png`}
          alt={`Level ${level}`}
          w="100px"
          position="absolute"
          bg={levelBG}
          borderRadius="50%"
          left="-2rem"
          top="-1.5rem"
          as={motion.img}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        />
        <Text
          m="0"
          pt=".7rem"
          pl="4.5rem"
          w={`${scoreConverted}%`}
          h="50px"
          bg={progressBG}
          borderRadius="10px"
          color={progressFont}
          whiteSpace="nowrap"
          fontWeight="bold"
          fontSize="1.2rem"
          as={motion.p}
          variants={scoreBarVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        >
          Lvl. {level}
        </Text>
      </Container>
    </Container>
  );
};

export default LevelBar;

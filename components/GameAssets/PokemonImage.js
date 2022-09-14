import { Center, Container, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const PokemonImage = (props) => {
  const imageBG = useColorModeValue("arceusSand.500", "arceusBlue.200");

  const backgroundVariants = {
    hidden: {
      width: 0,
      height: 0,
      borderRadius: "50%",
    },
    visible: {
      width: "150px",
      height: "150px",
      borderRadius: "3rem",
      transition: {
        delay: 0.2,
      },
    },
    leave: {
      width: 0,
    },
  };

  const spriteVariants = {
    hidden: {
      x: "10rem",
      width: "10px",
    },
    visible: {
      x: 0,
      width: "150px",
      transition: {
        delay: 0.3,
      },
    },
    leave: {
      x: "-10rem",
      width: "10px",
    },
  };

  return (
    <Center
    bg={imageBG}
    borderRadius="3rem"
    w="150px"
    h="150px"
    m="2rem auto"
    overflow="hidden"
    as={motion.div}
    variants={backgroundVariants}
    initial="hidden"
    animate="visible"
    exit="leave"
    >
      <AnimatePresence>
        <Image
          key={props.pokemonSprite}
          src={props.pokemonSprite}
          alt="Guess"
          w="150px"
          filter={props.difficulty === "easy" ? "" : "brightness(0%)"}
          as={motion.img}
          variants={spriteVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        />
      </AnimatePresence>
    </Center>
  );
};

export default PokemonImage;

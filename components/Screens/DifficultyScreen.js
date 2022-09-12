import { Container, Center, Text, useColorModeValue } from "@chakra-ui/react";
import ButtonDefault from "../UI/ButtonDefault";
import { motion, AnimatePresence } from "framer-motion";

const DifficultyScreen = (props) => {
  const difficultyBG = useColorModeValue("arceusSand.500", "#1A1B16");

  const difficultyTitleVariants = {
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

  const easyDifficultySelected = () => {
    props.onEasyMode(true);
    props.onPlayGame(false);
  };

  const hardDifficultySelected = () => {
    props.onHardMode(true);
    props.onPlayGame(false);
  };

  const menuHandler = () => {
    props.onPlayGame(false);
  };

  return (
    <Center pt="9rem" flexDir="column" gap="1rem">
      <Text
        fontSize="4xl"
        as={motion.p}
        variants={difficultyTitleVariants}
        initial="hidden"
        animate="visible"
        exit="leave"
        bg={difficultyBG}
        py="1rem"
        px="2rem"
        borderRadius="10px"
      >
        Select the difficulty
      </Text>

      <Container mb="2rem">
        <ButtonDefault
          onClick={easyDifficultySelected}
          style={{ marginTop: "1rem" }}
          colorSch="easyMode"
        >
          Easy
        </ButtonDefault>

        <ButtonDefault
          onClick={hardDifficultySelected}
          style={{ marginTop: "1rem" }}
          colorSch="hardMode"
        >
          Hard
        </ButtonDefault>
      </Container>

      <ButtonDefault onClick={menuHandler} style={{ marginTop: "1rem" }}>
        Menu
      </ButtonDefault>
    </Center>
  );
};

export default DifficultyScreen;

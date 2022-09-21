import { Container, Center, Text, useColorModeValue } from "@chakra-ui/react";
import ButtonDefault from "../UI/ButtonDefault";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import en from "../locales/en";
import es from "../locales/es";

const DifficultyScreen = (props) => {
  const router = useRouter();
  const { locale } = router;
  const l = locale === "en" ? en : es;

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
        py="1rem"
        px="2rem"
        borderRadius="10px"
      >
        {l.selectDiff}
      </Text>

      <Container mb="2rem">
        <ButtonDefault
          onClick={easyDifficultySelected}
          style={{ marginTop: "1rem" }}
          colorSch="easyMode"
        >
          {l.easyButton}
        </ButtonDefault>

        <ButtonDefault
          onClick={hardDifficultySelected}
          style={{ marginTop: "1rem" }}
          colorSch="hardMode"
        >
          {l.hardButton}
        </ButtonDefault>
      </Container>

      <ButtonDefault onClick={menuHandler} style={{ marginTop: "1rem" }}>
        {l.menuButton}
      </ButtonDefault>
    </Center>
  );
};

export default DifficultyScreen;

import { Container, Text, Center, Progress } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import Lives from "../GameAssets/Lives";
import PokemonImage from "../GameAssets/PokemonImage";
import ButtonDefault from "../UI/ButtonDefault";
import { motion, AnimatePresence } from "framer-motion";
import PageDotIndicator from "../UI/PageDotIndicator";
import ProgressBar from "../UI/ProgressBar";
import { useRouter } from "next/router";
import en from "../locales/en";
import es from "../locales/es";

const InstructionScreen = (props) => {
  const router = useRouter();
  const { locale } = router;
  const l = locale === "en" ? en : es;

  const titleBG = useColorModeValue("arceusSand.500", "arceusBlue.200");
  const textColor = useColorModeValue("arceusBlue.200", "arceusSand.500");
  const instructionsBG = useColorModeValue("#E3E4E7", "#282929");

  const [instructionPage, setInstructionPage] = useState(0);
  const [instructionTitle, setInstructionTitle] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [gameTimer, setGameTimer] = useState(60);
  const [barPage, setBarPage] = useState(false);
  const [instructionsDirection, setInstructionsDirection] = useState(500);

  useEffect(() => {
    if (gameTimer <= 0) {
      setGameTimer(60);
    }

    if (!gameTimer) return;

    const intervalId = setInterval(() => {
      if (barPage) {
        setGameTimer(gameTimer - 0.02);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [gameTimer, barPage]);

  useEffect(() => {
    switch (instructionPage) {
      case 0:
        setBarPage(false);
        setInstructionTitle(`${l.pokemonTitle}`);
        setPageContent(
          <Container pb="2rem">
            <PokemonImage
              pokemonSprite="./img/psyduck.png"
              difficulty="easy"
              differentH="100px"
              style={{ maxWidth: "50px" }}
            />

            <Center flexDir="column" gap="1rem">
              <ButtonDefault
                style={{
                  fontSize: "1.2rem",
                  maxHeight: "2.3rem",
                  pointerEvents: "none",
                }}
              >
                Ditto
              </ButtonDefault>
              <ButtonDefault
                style={{
                  fontSize: "1.2rem",
                  maxHeight: "2.3rem",
                  pointerEvents: "none",
                }}
              >
                Psyduck
              </ButtonDefault>
              <ButtonDefault
                style={{
                  fontSize: "1.2rem",
                  maxHeight: "2.3rem",
                  pointerEvents: "none",
                }}
              >
                Torchic
              </ButtonDefault>
            </Center>
          </Container>
        );
        break;

      case 1:
        setBarPage(true);
        setInstructionTitle(`${l.timeTitle}`);
        setPageContent(
          <Center>
            {/* <ProgressBar GameTimer={gameTimer} diffTop="" /> */}
          </Center>
        );
        break;

      case 2:
        setBarPage(false);
        setInstructionTitle(`${l.livesTitle}`);
        setPageContent(<Lives GameLives={3} />);
        break;

      case 3:
        setInstructionTitle(`${l.diffTitle}`);
        setPageContent(
          <Container mb="2rem">
            <ButtonDefault
              style={{ marginTop: "1rem", pointerEvents: "none" }}
              colorSch="easyMode"
            >
              {l.easyButton}
            </ButtonDefault>

            <ButtonDefault
              style={{ marginTop: "1rem", pointerEvents: "none" }}
              colorSch="hardMode"
            >
              {l.hardButton}
            </ButtonDefault>
          </Container>
        );
        break;

      case 4:
        setInstructionTitle(`${l.easyButton}`);
        setPageContent(
          <PokemonImage
            pokemonSprite="./img/psyduck.png"
            difficulty="easy"
            style={{ "max-width": "75px" }}
          />
        );
        break;

      case 5:
        setInstructionTitle(`${l.hardButton}`);
        setPageContent(
          <PokemonImage
            pokemonSprite="./img/psyduck.png"
            difficulty="hard"
            style={{ "max-width": "75px" }}
          />
        );
        break;
    }
  }, [instructionPage]);

  const backwardsHandler = () => {
    if (instructionPage > 0) {
      setInstructionsDirection(-500);
      setInstructionPage((prevPage) => prevPage - 1);
    }
  };

  const forwardHandler = () => {
    if (instructionPage < 5) {
      setInstructionsDirection(500);
      setInstructionPage((prevPage) => prevPage + 1);
    }
  };

  const instructionsVariants = {
    hidden: {
      x: `${instructionsDirection}`,
    },
    visible: {
      x: 0,
      display: "flex",
      transition: {
        delay: 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.6,
      },
    },
    leave: {
      x: -500,
      display: "none",
    },
  };

  return (
    <Container>
      <Center
        bg={titleBG}
        w="100%"
        h="4rem"
        borderRadius="5px"
        mt="4rem"
        overflow="hidden"
      >
        <AnimatePresence>
          <Text
            key={instructionTitle}
            fontSize="3xl"
            whiteSpace="nowrap"
            color={textColor}
            as={motion.p}
            variants={instructionsVariants}
            initial="hidden"
            animate="visible"
            exit="leave"
          >
            {instructionTitle}
          </Text>
        </AnimatePresence>
      </Center>
      <Center
        bg={instructionsBG}
        mt="1rem"
        h="55vh"
        w="100%"
        borderRadius="5px"
        overflow="hidden"
        flexDir="column"
        gap=".5rem"
        pos="relative"
      >
        <Center
          key={instructionTitle}
          as={motion.div}
          variants={instructionsVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        >
          {pageContent}
          {instructionPage === 1 && (
            <ProgressBar GameTimer={gameTimer} diffTop="" />
          )}
        </Center>
        {/* <PageDotIndicator /> */}
      </Center>
      <Center gap="1rem" mt="1rem">
        <ButtonDefault onClick={backwardsHandler}>
          <ArrowLeftIcon />
        </ButtonDefault>
        <ButtonDefault onClick={() => props.onInstructions(false)}>
          {/* <CheckIcon /> */}
          {l.menuButton}
        </ButtonDefault>
        <ButtonDefault onClick={forwardHandler}>
          <ArrowRightIcon />
        </ButtonDefault>
      </Center>
    </Container>
  );
};

export default InstructionScreen;

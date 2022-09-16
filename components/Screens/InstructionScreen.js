import { Container, Text, Center, Progress } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import Lives from "../GameAssets/Lives";
import PokemonImage from "../GameAssets/PokemonImage";
import ButtonDefault from "../UI/ButtonDefault";

const InstructionScreen = (props) => {
  const titleBG = useColorModeValue("arceusSand.500", "arceusBlue.200");
  const textColor = useColorModeValue("arceusBlue.200", "arceusSand.500");
  const instructionsBG = useColorModeValue("#E3E4E7", "#282929");

  const [instructionPage, setInstructionPage] = useState(0);
  const [instructionTitle, setInstructionTitle] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [GameTimer, setGameTimer] = useState(60);
  const [barPage, setBarPage] = useState(false);

  useEffect(() => {
    if (GameTimer <= 0) {
      setGameTimer(60);
    }

    if (!GameTimer) return;

    const intervalId = setInterval(() => {
      if (barPage) {
        setGameTimer(GameTimer - 0.02);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [GameTimer, barPage]);

  useEffect(() => {
    switch (instructionPage) {
      case 0:
        setBarPage(false);
        setInstructionTitle("Guess all the Pokemon");
        setPageContent(
          <Container>
            <PokemonImage
              pokemonSprite="./img/psyduck.png"
              difficulty="easy"
              differentH="100px"
              style={{ "max-width": "50px" }}
            />

            <Center flexDir="column" gap="1rem">
              <ButtonDefault
                style={{
                  "font-size": "1.2rem",
                  "max-height": "2.3rem",
                }}
              >
                Ditto
              </ButtonDefault>
              <ButtonDefault
                style={{
                  "font-size": "1.2rem",
                  "max-height": "2.3rem",
                }}
              >
                Psyduck
              </ButtonDefault>
              <ButtonDefault
                style={{
                  "font-size": "1.2rem",
                  "max-height": "2.3rem",
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
        setInstructionTitle("You have 1 minute");
        setPageContent(
          <Progress
            max="60"
            value={GameTimer}
            colorScheme="yellow"
            w="90%"
            display="flex"
            justifyContent="center"
            borderRadius="0 0 20px 20px"
            h="1rem"
          />
        );
        break;

      case 2:
        setBarPage(false);
        setInstructionTitle("And 3 lives");
        setPageContent(<Lives GameLives={3} />);
        break;

      case 3:
        setInstructionTitle("There are two difficulties");
        setPageContent(
          <Container mb="2rem">
            <ButtonDefault style={{ marginTop: "1rem" }} colorSch="easyMode">
              Easy
            </ButtonDefault>

            <ButtonDefault style={{ marginTop: "1rem" }} colorSch="hardMode">
              Hard
            </ButtonDefault>
          </Container>
        );
        break;

      case 4:
        setInstructionTitle("Easy");
        setPageContent(
          <PokemonImage
            pokemonSprite="./img/psyduck.png"
            difficulty="easy"
            style={{ "max-width": "75px" }}
          />
        );
        break;

      case 5:
        setInstructionTitle("Hard");
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
      setInstructionPage((prevPage) => prevPage - 1);
    }
  };

  const forwardHandler = () => {
    if (instructionPage < 5) {
      setInstructionPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Container>
      <Center bg={titleBG} w="100%" h="4rem" borderRadius="5px" mt="4rem">
        <Text fontSize="3xl" textAlign="center" color={textColor}>
          {instructionTitle}
        </Text>
      </Center>
      <Center bg={instructionsBG} mt="1rem" h="55vh" borderRadius="5px">
        {pageContent}
      </Center>
      <Center gap="1rem" mt="1rem">
        <ButtonDefault onClick={backwardsHandler}>Atras</ButtonDefault>
        <ButtonDefault onClick={forwardHandler}>Adelante</ButtonDefault>
      </Center>
      <ButtonDefault
        onClick={() => props.onInstructions(false)}
        style={{ marginTop: "1rem" }}
      >
        Menu
      </ButtonDefault>
    </Container>
  );
};

export default InstructionScreen;

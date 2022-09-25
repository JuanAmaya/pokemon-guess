import ButtonDefault from "../UI/ButtonDefault";

import { Container, Center, Image, Select } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LevelBar from "../UI/LevelBar";

import en from "../locales/en";
import es from "../locales/es";

const MenuScreen = (props) => {
  const router = useRouter();
  const { locale } = router;
  const l = locale === "en" ? en : es;

  const [highScore, setHighScore] = useState(0);

  const changeLanguage = (e) => {
    e.preventDefault();
    const locale = e.target.value;
    router.push("/", "/", { locale: locale });
  };

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
        <LevelBar />
      </Center>

      <ButtonDefault
        onClick={() => props.onPlayGame(true)}
        style={{ marginTop: "2rem" }}
        delayTime=".02"
      >
        {l.playButton}
      </ButtonDefault>

      <ButtonDefault
        onClick={() => props.onInstructions(true)}
        style={{ marginTop: "1rem" }}
        delayTime=".08"
      >
        {l.instructionsButton}
      </ButtonDefault>
      <Center>
        <Select
          onChange={changeLanguage}
          defaultValue={locale}
          mt="3rem"
          w="10rem"
          size="md"
          variant="filled"
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
        </Select>
      </Center>
    </Container>
  );
};

export default MenuScreen;

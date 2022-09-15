import { Progress, Container, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

const LevelBar = (props) => {
  const progressBG = useColorModeValue("arceusSand.500", "arceusBlue.200");
  const progressFont = useColorModeValue("arceusBlue.200", "arceusSand.500");
  const levelBG = useColorModeValue("#E3E4E7", "#282929");

  const [level, setLevel] = useState(1);
  const [scoreConverted, setScoreConverted] = useState(0);

  useEffect(() => {
    if (props.scoreProgress < 10) {
      setScoreConverted((props.scoreProgress * 100) / 10);
    } else if (props.scoreProgress < 50) {
      setScoreConverted((props.scoreProgress * 100) / 50);
      setLevel(2);
    } else if (props.scoreProgress < 100) {
      setScoreConverted((props.scoreProgress * 100) / 100);
      setLevel(3);
    } else if (props.scoreProgress < 200) {
      setScoreConverted((props.scoreProgress * 100) / 200);
      setLevel(4);
    } else if (props.scoreProgress < 500) {
      setScoreConverted((props.scoreProgress * 100) / 500);
      setLevel(5);
    } else if (props.scoreProgress < 1000) {
      setScoreConverted((props.scoreProgress * 100) / 1000);
      setLevel(6);
    } else if (props.scoreProgress < 2000) {
      setScoreConverted((props.scoreProgress * 100) / 2000);
      setLevel(7);
    } else if (props.scoreProgress < 3000) {
      setScoreConverted((props.scoreProgress * 100) / 3000);
      setLevel(8);
    } else if (props.scoreProgress < 5000) {
      setScoreConverted((props.scoreProgress * 100) / 5000);
      setLevel(9);
    } else if (props.scoreProgress < 10000) {
      setScoreConverted((props.scoreProgress * 100) / 10000);
      setLevel(10);
    } else if (props.scoreProgress > 10000) {
      setScoreConverted(100);
      setLevel("MAX");
    }
  }, [props.scoreProgress]);

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
        />
        <Text
          m="0"
          pt=".7rem"
          pl="6rem"
          w={`${scoreConverted}%`}
          h="50px"
          bg={progressBG}
          borderRadius="10px"
          color={progressFont}
          whiteSpace="nowrap"
          fontWeight="bold"
          fontSize="1.2rem"
        >
          Lvl. {level}
        </Text>
      </Container>
    </Container>
  );
};

export default LevelBar;

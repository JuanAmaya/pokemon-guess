import { Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import en from "../locales/en";
import es from "../locales/es";

const GameScore = (props) => {
  const router = useRouter();
  const { locale } = router;
  const l = locale === "en" ? en : es;

  return (
    <Center mb="2rem">
      <Text fontSize="2xl">
        {l.score}: {props.score}
      </Text>
    </Center>
  );
};

export default GameScore;

import { Center } from "@chakra-ui/react";
import Corazon from "../SVG/Corazon";

const Lives = (props) => {
  return (
    <Center mb="1rem">
      {[...Array(props.GameLives)].map(() => (
        <Corazon key={Math.random()} />
      ))}
    </Center>
  );
};

export default Lives;

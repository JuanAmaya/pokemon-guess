import { Center, Container, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const PokemonImage = (props) => {
  const imageBG = useColorModeValue("#EEF2F7", "#2D313D");

  return (
    <Center bg={imageBG} borderRadius="50%" w="150px" m="2rem auto">
      <Image
        src={props.pokemonSprite}
        alt="Guess"
        w="150px"
        filter="brightness(0%)"
      />
    </Center>
  );
};

export default PokemonImage;

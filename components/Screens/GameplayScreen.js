import { useCallback, useEffect, useState } from "react";
import { Center, Container, Text } from "@chakra-ui/react";
import ButtonDefault from "../UI/ButtonDefault";
import ProgressBar from "../UI/ProgressBasr";
import Lives from "../GameAssets/Lives";
import PokemonImage from "../GameAssets/PokemonImage";
import GameScore from "../GameAssets/GameScore";
import StartGameTimer from "../GameAssets/StartGameTimer";
import useHttp from "../../pages/api/use-http";

const GameplayScreen = (props) => {
  const [pokemonFetch, setPokemonFetch] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [wrongPokemon1, setWrongPokemon1] = useState("");
  const [wrongPokemon2, setWrongPokemon2] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [startTimer, setStartTimer] = useState(3);
  const [GameTimer, setGameTimer] = useState(12);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answersOrder, setAnswersOrder] = useState([]);

  // Fetch905 Pokemon
  const { sendRequest: fetchPokemonHandler } = useHttp();

  useEffect(() => {
    const transformPokemon = (pokemonObj) => {
      const filteredData = pokemonObj.results;
      const loadedPokemon = [];

      for (const key in filteredData) {
        loadedPokemon.push({
          name: filteredData[key].name,
          url: filteredData[key].url,
        });
      }

      setPokemonFetch(loadedPokemon);
    };

    fetchPokemonHandler(
      {
        url: "https://pokeapi.co/api/v2/pokemon/?limit=905",
      },
      transformPokemon
    );
  }, [fetchPokemonHandler]);

  // Fetch Pokemon Data options
  // Checar si se puede obtener todas las respyestas aqui incluyendo las incorrectas
  const correctOptionFetch = () => {
    const transformPokemonDataOptions = (pokemonObj) => {
      console.log("dentro", pokemonObj);
      const randomNumShiny = Math.floor(Math.random() * (100 - 1) + 1);
      let pokemonSprite = "";

      if (randomNumShiny === 1) {
        pokemonSprite = pokemonObj.sprites["front_shiny"];
      } else {
        pokemonSprite = pokemonObj.sprites["front_default"];
      }

      const loadedPokemon = [];

      loadedPokemon.push({
        id: pokemonObj.id,
        name: pokemonObj.name,
        sprite: pokemonSprite,
      });

      setPokemonData(loadedPokemon[0]);

      setAnswers((answers) => [
        loadedPokemon[0].name,
        loadedPokemon[0].name,
        loadedPokemon[0].name,
      ]);
    };

    const correctRand = Math.floor(
      Math.random() * (pokemonFetch.length - 0) + 0
    );
    const correctPokemonUrl = pokemonFetch[correctRand].url;

    fetchPokemonDataHandler(
      {
        url: correctPokemonUrl,
      },
      transformPokemonDataOptions
    );
  };

  const { sendRequest: fetchPokemonDataHandler } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      correctOptionFetch();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fetchPokemonDataHandler, pokemonFetch]);

  const fetchPokemonSpritesHandler = useCallback(async (dataFetch) => {
    setIsLoading(true);

    // let correctRand = 0;
    let wrongRand1 = 0;
    let wrongRand2 = 0;

    if (wrongRand1 === wrongRand2) {
      // correctRand = Math.floor(Math.random() * (dataFetch.length - 0) + 0);
      wrongRand1 = Math.floor(Math.random() * (dataFetch.length - 0) + 0);
      wrongRand2 = Math.floor(Math.random() * (dataFetch.length - 0) + 0);
    }

    try {
      // const correctPokemon = dataFetch[correctRand].url;
      const wrongPokemon1 = dataFetch[wrongRand1].url;
      const wrongPokemon2 = dataFetch[wrongRand2].url;

      // const responseCorrect = await fetch(correctPokemon);
      const responseWrong1 = await fetch(wrongPokemon1);
      const responseWrong2 = await fetch(wrongPokemon2);

      if (!responseWrong1.ok || !responseWrong2.ok) {
        throw new Error("Fetching Pokemon data went wrong!");
      }

      // Get the Correct pokemon data
      // const data = await responseCorrect.json();

      // while (data.sprites["front_default"] === null) {
      //   correctRand = Math.floor(Math.random() * (dataFetch.length - 0) + 0);
      //   const correctPokemon = dataFetch[correctRand].url;
      //   const responseCorrect = await fetch(correctPokemon);

      //   if (!responseCorrect.ok) {
      //     throw new Error("Fetching Pokemon data went wrong!");
      //   }
      //   data = await responseCorrect.json();
      //   console.log("Sprite Null");
      // }

      // const loadedPokemon = [];

      // const randomNumShiny = Math.floor(Math.random() * (100 - 1) + 1);
      // let pokemonSprite = "";

      // if (randomNumShiny === 1) {
      //   pokemonSprite = data.sprites["front_shiny"];
      // } else {
      //   pokemonSprite = data.sprites["front_default"];
      // }

      // loadedPokemon.push({
      //   id: data.id,
      //   name: data.name,
      //   sprite: pokemonSprite,
      // });

      // setPokemonData(loadedPokemon[0]);

      // Get the Wrong Pokemon data 1
      const dataWrongPokemon1 = await responseWrong1.json();

      const loadedWrongPokemon1 = [];

      loadedWrongPokemon1.push({
        id: dataWrongPokemon1.id,
        name: dataWrongPokemon1.name,
      });

      setWrongPokemon1(loadedWrongPokemon1[0]);

      // Get the Wrong Pokemon data 2
      const dataWrongPokemon2 = await responseWrong2.json();

      const loadedWrongPokemon2 = [];

      loadedWrongPokemon2.push({
        id: dataWrongPokemon2.id,
        name: dataWrongPokemon2.name,
      });

      setWrongPokemon2(loadedWrongPokemon2[0]);
      // setAnswers((answers) => [
      //   loadedPokemon[0].name,
      //   loadedWrongPokemon1[0].name,
      //   loadedWrongPokemon2[0].name,
      // ]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  // Start game timer
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPokemonSpritesHandler(pokemonFetch);
    }, 3000);
    return () => clearTimeout(timer);
  }, [pokemonFetch]);

  // Start game countdown
  useEffect(() => {
    if (startTimer === 0) {
      setStartTimer(null);
    }

    if (!startTimer) return;

    const intervalId = setInterval(() => {
      setStartTimer(startTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTimer]);

  const endOfTheMatch = () => {
    console.log("game over");
    props.onMatchScore(score);
    props.onGameOver(true);
    props.onPlayGame(false);
  };

  const loadNextGuess = () => {
    correctOptionFetch();
    setGameTimer(10);
  };

  useEffect(() => {
    if (GameTimer <= 0) {
      setLives(lives - 1);
      if (lives <= 1) {
        endOfTheMatch();
      }

      loadNextGuess();
    }

    if (!GameTimer) return;

    const intervalId = setInterval(() => {
      setGameTimer(GameTimer - 0.02);
    }, 20);

    return () => clearInterval(intervalId);
  }, [GameTimer]);

  const answerHandler = (answer) => {
    if (pokemonData.name === answer && GameTimer > 0) {
      setScore(score + 1);
      loadNextGuess();
    } else {
      setLives(lives - 1);
      if (lives <= 1) {
        endOfTheMatch();
      }
    }
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setAnswersOrder(array);
  }

  useEffect(() => {
    shuffle(answers);
  }, [pokemonData]);

  return (
    <Container pt="3rem" px="0" maxW="100%">
      <StartGameTimer startTimer={startTimer} />

      {!isLoading && (
        <Container p="0" maxW="100%">
          <ProgressBar GameTimer={GameTimer} />
          <Lives GameLives={lives} />

          <GameScore score={score} />

          <PokemonImage pokemonSprite={pokemonData.sprite} />

          <Center flexDir="column" gap="1rem">
            <ButtonDefault onClick={() => answerHandler(answersOrder[0])}>
              {answersOrder[0]}
            </ButtonDefault>
            <ButtonDefault onClick={() => answerHandler(answersOrder[1])}>
              {answersOrder[1]}
            </ButtonDefault>
            <ButtonDefault onClick={() => answerHandler(answersOrder[2])}>
              {answersOrder[2]}
            </ButtonDefault>
          </Center>
        </Container>
      )}
    </Container>
  );
};

export default GameplayScreen;

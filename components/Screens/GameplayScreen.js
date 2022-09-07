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
  const [isLoading, setIsLoading] = useState(true);
  const [startTimer, setStartTimer] = useState(3);
  const [GameTimer, setGameTimer] = useState(12);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [adjustAnswers, setAdjustAnswers] = useState([]);
  const [finalAnswers, setFinalAnswers] = useState([]);
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
  const { sendRequest: fetchPokemonDataHandler } = useHttp();

  const secondWrongOptionFetch = () => {
    const transformPokemonDataOptions = (pokemonObj) => {
      const loadedPokemon = [];

      loadedPokemon.push({
        id: pokemonObj.id,
        name: pokemonObj.name,
        sprite: pokemonObj.sprites["front_default"],
      });

      console.log("incorrecto", loadedPokemon[0]);
      setAnswers((ans) => [...ans, loadedPokemon[0].name]);
    };

    const randomNum = Math.floor(Math.random() * (pokemonFetch.length - 0) + 0);
    const wrongPokemonUrl = pokemonFetch[randomNum].url;

    fetchPokemonDataHandler(
      {
        url: wrongPokemonUrl,
      },
      transformPokemonDataOptions
    );
  };

  const firstWrongOptionFetch = () => {
    const transformPokemonDataOptions = (pokemonObj) => {
      const loadedPokemon = [];

      loadedPokemon.push({
        id: pokemonObj.id,
        name: pokemonObj.name,
        sprite: pokemonObj.sprites["front_default"],
      });

      console.log("incorrecto", loadedPokemon[0]);
      setAnswers((ans) => [...ans, loadedPokemon[0].name]);
    };

    const randomNum = Math.floor(Math.random() * (pokemonFetch.length - 0) + 0);
    const wrongPokemonUrl = pokemonFetch[randomNum].url;

    fetchPokemonDataHandler(
      {
        url: wrongPokemonUrl,
      },
      transformPokemonDataOptions
    );
  };

  const correctOptionFetch = () => {
    const transformPokemonDataOptions = (pokemonObj) => {
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
      setAnswers((ans) => [...ans, loadedPokemon[0].name]);
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

  // Poner las respuestas en los botones
  useEffect(() => {
    if (answers.length % 3 === 0 && answers.length !== 0) {
      for (let i = answers.length - 3; i < answers.length; i++) {
        console.log("pasando", answers[i]);
        setAdjustAnswers((ans) => [...ans, answers[i]]);
      }
    }
  }, [answers]);

  useEffect(() => {
    if (adjustAnswers.length === 3) {
      setFinalAnswers(adjustAnswers);
      setAdjustAnswers([]);
    }
  }, [adjustAnswers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      firstWrongOptionFetch();
      secondWrongOptionFetch();
      correctOptionFetch();
      setIsLoading(false);
      console.log(answers);
    }, 3000);

    return () => clearTimeout(timer);
  }, [fetchPokemonDataHandler, pokemonFetch]);

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
    // setAnswers([]);
    firstWrongOptionFetch();
    secondWrongOptionFetch();
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

    while (currentIndex !== 0) {
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
    shuffle(finalAnswers);
  }, [finalAnswers]);

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

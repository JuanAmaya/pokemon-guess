import { useCallback, useEffect, useState } from "react";
import { Center, Container, Text } from "@chakra-ui/react";
import ButtonDefault from "../UI/ButtonDefault";
import ProgressBar from "../UI/ProgressBasr";
import Lives from "../GameAssets/Lives";
import PokemonImage from "../GameAssets/PokemonImage";
import GameScore from "../GameAssets/GameScore";
import StartGameTimer from "../GameAssets/StartGameTimer";

const TestScreen = (props) => {
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
  const [allPokemonData, setAllPokemonData] = useState([]);

  // 905 Pokemon
  //   const fetchPokemonHandler = useCallback(async () => {
  //     try {
  //       const response = await fetch(
  //         "https://pokeapi.co/api/v2/pokemon/?limit=905"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Pokemon fetching went wrong!");
  //       }

  //       const data = await response.json();

  //       const filteredData = data.results;

  //       const loadedPokemon = [];

  //       for (const key in filteredData) {
  //         loadedPokemon.push({
  //           name: filteredData[key].name,
  //           url: filteredData[key].url,
  //         });
  //       }

  //       setPokemonFetch(loadedPokemon);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  //   const fetchPokemonSpritesHandler = useCallback(async (dataFetch) => {
  //     setIsLoading(true);

  //     let correctRand = 0;
  //     let wrongRand1 = 0;
  //     let wrongRand2 = 0;

  //     if (
  //       correctRand === wrongRand1 ||
  //       correctRand === wrongRand1 ||
  //       wrongRand1 === wrongRand2
  //     ) {
  //       correctRand = Math.floor(Math.random() * (dataFetch.length - 0) + 0);
  //       wrongRand1 = Math.floor(Math.random() * (dataFetch.length - 0) + 0);
  //       wrongRand2 = Math.floor(Math.random() * (dataFetch.length - 0) + 0);
  //     }

  //     try {
  //       const correctPokemon = dataFetch[correctRand].url;
  //       const wrongPokemon1 = dataFetch[wrongRand1].url;
  //       const wrongPokemon2 = dataFetch[wrongRand2].url;

  //       const responseCorrect = await fetch(correctPokemon);
  //       const responseWrong1 = await fetch(wrongPokemon1);
  //       const responseWrong2 = await fetch(wrongPokemon2);

  //       if (!responseCorrect.ok || !responseWrong1.ok || !responseWrong2.ok) {
  //         throw new Error("Fetching Pokemon data went wrong!");
  //       }

  //       // Get the Correct pokemon data
  //       const data = await responseCorrect.json();

  //       const loadedPokemon = [];

  //       const randomNumShiny = Math.floor(Math.random() * (100 - 1) + 1);
  //       let pokemonSprite = "";

  //       if (randomNumShiny === 1) {
  //         pokemonSprite = data.sprites["front_shiny"];
  //       } else {
  //         pokemonSprite = data.sprites["front_default"];
  //       }

  //       loadedPokemon.push({
  //         id: data.id,
  //         name: data.name,
  //         sprite: pokemonSprite,
  //       });

  //       setPokemonData(loadedPokemon[0]);

  //       // Get the Wrong Pokemon data 1
  //       const dataWrongPokemon1 = await responseWrong1.json();

  //       const loadedWrongPokemon1 = [];

  //       loadedWrongPokemon1.push({
  //         id: dataWrongPokemon1.id,
  //         name: dataWrongPokemon1.name,
  //       });

  //       setWrongPokemon1(loadedWrongPokemon1[0]);

  //       // Get the Wrong Pokemon data 2
  //       const dataWrongPokemon2 = await responseWrong2.json();

  //       const loadedWrongPokemon2 = [];

  //       loadedWrongPokemon2.push({
  //         id: dataWrongPokemon2.id,
  //         name: dataWrongPokemon2.name,
  //       });

  //       setWrongPokemon2(loadedWrongPokemon2[0]);
  //       setAnswers((answers) => [
  //         loadedPokemon[0].name,
  //         loadedWrongPokemon1[0].name,
  //         loadedWrongPokemon2[0].name,
  //       ]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //   }, []);

  // PROBANDO
  const newFetchPokemonSpritesHandler = useCallback(async (dataFetch) => {
    setIsLoading(true);
    const pokemonDataArray = [];
    for (let i = 1; i <= 905; i++) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

        if (!response.ok) {
          throw new Error("Fetching Pokemon data went wrong!");
        }

        // Get the Correct pokemon data
        const data = await response.json();

        const loadedPokemon = [];

        const randomNumShiny = Math.floor(Math.random() * (100 - 1) + 1);
        let pokemonSprite = "";

        if (randomNumShiny === 1) {
          pokemonSprite = data.sprites["front_shiny"];
        } else {
          pokemonSprite = data.sprites["front_default"];
        }

        loadedPokemon.push({
          id: data.id,
          name: data.name,
          sprite: pokemonSprite,
        });

        pokemonDataArray.push(loadedPokemon[0]);
        console.log(pokemonDataArray);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    setAllPokemonData(pokemonDataArray);
  }, []);

  const getPokemonOptions = (pokedata) => {
    console.log(pokedata);
    let correctRand = 1;
    let wrongRand1 = 1;
    let wrongRand2 = 1;

    if (
      correctRand === wrongRand1 ||
      correctRand === wrongRand1 ||
      wrongRand1 === wrongRand2
    ) {
      correctRand = Math.floor(Math.random() * (allPokemonData.length - 1) + 1);
      wrongRand1 = Math.floor(Math.random() * (allPokemonData.length - 1) + 1);
      wrongRand2 = Math.floor(Math.random() * (allPokemonData.length - 1) + 1);
    }

    const loadedCorrectPokemon = [];
    const loadedWrongPokemon1 = [];
    const loadedWrongPokemon2 = [];

    loadedCorrectPokemon.push({
      id: allPokemonData[correctRand].id,
      name: allPokemonData[correctRand].name,
      sprite: allPokemonData[correctRand].sprite,
    });

    loadedWrongPokemon1.push({
      id: allPokemonData[wrongRand1].id,
      name: allPokemonData[wrongRand1].name,
    });

    loadedWrongPokemon2.push({
      id: allPokemonData[wrongRand2].id,
      name: allPokemonData[wrongRand2].name,
    });

    setAnswers((answers) => [
      loadedCorrectPokemon[0].name,
      loadedWrongPokemon1[0].name,
      loadedWrongPokemon2[0].name,
    ]);
  };

  useEffect(() => {
    newFetchPokemonSpritesHandler();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     //   fetchPokemonSpritesHandler(pokemonFetch);
  //     getPokemonOptions();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [pokemonFetch]);

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
    // fetchPokemonSpritesHandler(pokemonFetch);
    getPokemonOptions();
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
  }, [wrongPokemon2]);

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

export default TestScreen;

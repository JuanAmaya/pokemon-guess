import { Progress, Container, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const LevelBar = (props) => {
    const [scoreProgress, setScoreProgress] = useState(0);
    const [level, setLevel] = useState(1);
    const [pointsToLevelUp, setPointsToLevelUp] = useState(10);

    useEffect(() => {
        let res = 0;
        
        if(props.scoreProgress >= 10 && props.scoreProgress <= 20){
            res = props.scoreProgress - 10;
            setLevel(prevLevel => prevLevel + 1);
            setPointsToLevelUp(50)
        } else if(props.scoreProgress <= 100){
            res = props.scoreProgress - 20;
            setLevel(prevLevel => prevLevel + 1);
            setPointsToLevelUp(100)
        }

        setScoreProgress(res)
        console.log(scoreProgress);
    }, [props.scoreProgress]);

    return (<Container p="0">
         <Progress max={pointsToLevelUp} value={scoreProgress} w="100%" h="2rem" borderRadius="10px" />
         <Text>{level}</Text>
    </Container>)
}

export default LevelBar;
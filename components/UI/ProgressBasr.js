import { Progress } from "@chakra-ui/react";

const ProgressBar = (props) => {
  return (
    <Progress
      max="10"
      value={props.GameTimer}
      colorScheme="yellow"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="0"
      borderRadius="0 0 20px 20px"
    />
  );
};

export default ProgressBar;

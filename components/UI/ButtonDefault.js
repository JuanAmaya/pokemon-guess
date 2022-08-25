import { Button } from "@chakra-ui/react";

const ButtonDefault = (props) => {
  return (
    <Button
      margin="0 auto"
      display="flex"
      w="250px"
      fontSize="1.2rem"
      size="lg"
      fontWeight="bold"
      bg={props.bg !== null ? props.bg : ""}
      onClick={props.onClick}
      style={props.style}
      textTransform="capitalize"
      _active={
        props.wrong
          ? {
              bg: "red.800",
            }
          : props.correct
          ? {
              bg: "green.500",
            }
          : ""
      }
    >
      {props.children}
    </Button>
  );
};

export default ButtonDefault;

import { Button } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ButtonDefault = (props) => {
  const btnColor = useColorModeValue("arceusSand", "arceusBlue");
  const textColor = useColorModeValue("arceusBlue.200", "arceusSand.500");

  const buttonVariants = {
    hidden: {
      opacity: 0,
      width: 0,
    },
    visible: {
      opacity: 1,
      width: "250px",
      transition: {
        delay: `${props.delayTime !== undefined ? props.delayTime : ""}`,
      },
    },
  };

  return (
    <Button
      key={props.children}
      margin="0 auto"
      display="flex"
      w="250px"
      fontSize="1.2rem"
      size="lg"
      fontWeight="bold"
      onClick={props.onClick}
      style={props.style}
      textTransform="capitalize"
      colorScheme={props.colorSch !== undefined ? props.colorSch : btnColor}
      color={textColor}
      as={motion.button}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
    >
      {props.children}
    </Button>
  );
};

export default ButtonDefault;

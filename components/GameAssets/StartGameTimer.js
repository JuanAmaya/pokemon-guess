import { Center, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const StartGameTimer = (props) => {
  const counterVariants = {
    hidden: {
      opacity: 0,
      y: "10rem",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: "100",
        delay: 0.2,
      },
    },
    leave: {
      type: "spring",
      opacity: 0,
      y: "-10rem",
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      <Center key={props.startTimer} mt="10rem">
        <Text
          fontSize="8rem"
          as={motion.p}
          variants={counterVariants}
          initial="hidden"
          animate="visible"
          exit="leave"
        >
          {props.startTimer}
        </Text>
      </Center>
    </AnimatePresence>
  );
};

export default StartGameTimer;

import { Progress } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const ProgressBar = (props) => {
  const timerVariants = {
    hidden: {
      width: 0,
    },
    visible: {
      width: "100%",
      transition: {
        delay: 0.2,
      },
    },
    leave: {
      width: 0,
    },
  };

  return (
    <AnimatePresence>
      <Progress
        as={motion.div}
        max="60"
        value={props.GameTimer}
        colorScheme="yellow"
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="0"
        borderRadius="0 0 20px 20px"
        variants={timerVariants}
        initial="hidden"
        animate="visible"
        exit="leave"
      />
    </AnimatePresence>
  );
};

export default ProgressBar;

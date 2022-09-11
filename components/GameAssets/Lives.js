import { Center } from "@chakra-ui/react";
import Corazon from "../SVG/Corazon";
import { AnimatePresence, motion } from "framer-motion";

const Lives = (props) => {
  // NO CONVENCIDO
  const livesVariants = {
    hidden: {
      opacity: 0,
      x: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
      },
    },
    leave: {
      x: 10,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      <Center
        mb="1rem"
        // as={motion.div}
        // variants={livesVariants}
        // initial="hidden"
        // animate="visible"
        // exit="leave"
      >
        {[...Array(props.GameLives)].map(() => (
          <Corazon key={Math.random()} />
        ))}
      </Center>
    </AnimatePresence>
  );
};

export default Lives;

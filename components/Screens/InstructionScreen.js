import { Container } from "@chakra-ui/react";
import ButtonDefault from "../UI/ButtonDefault";

const InstructionScreen = (props) => {
  return (
    <Container>
      <ButtonDefault
        onClick={() => props.onInstructions(false)}
        style={{ marginTop: "1rem" }}
      >
        Menu
      </ButtonDefault>
    </Container>
  );
};

export default InstructionScreen;

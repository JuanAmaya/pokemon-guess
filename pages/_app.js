import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";

const theme = extendTheme({
  colors: {
    arceusBlue: {
      200: "#2B3E53",
      300: "#394B60",
    },
    arceusSand: {
      500: "#F8EFD5",
      600: "#FAF6EA",
    },
    easyMode: {
      200: "#468E76",
      300: "#52AB8D",
      500: "#5DC1A0",
      600: "#66D4B0",
    },
    hardMode: {
      200: "#8E4646",
      300: "#AC5555",
      500: "#C76262",
      600: "#E97070",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

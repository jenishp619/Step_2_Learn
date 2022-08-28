/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./data/Context";
import Routes from "./Routes";
import theme from "./utils/theme";
import SplashScreen from "./pages/SplashScreen";

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  /**
   *
   * Below code will show splash screen for 3.5 seconds and set show splash screen to false
   */

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3500);
  }, []);

  /**
   *
   * Render Splash screen unitl showSplashScreen shows true
   */

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  /**
   *
   * Entire React application is wrapped between React Context and other higher order components.
   * Other Higher Order Components are
   * 1. ChakraProvider for theme
   * 2. Routes
   * 3. ToastContainer for toast notifications
   *
   */
  return (
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
      <ToastContainer />
    </ContextProvider>
  );
};

export default App;

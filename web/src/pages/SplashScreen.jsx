/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SplashGif from "../images/splash.gif";

const SplashScreen = () => {
  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Image src={SplashGif} w="250px" h="250px" />
    </Flex>
  );
};

export default SplashScreen;

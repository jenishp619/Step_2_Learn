/**
 *
 * Author: Janvi Nayanbhai Patel
 * Banner ID: B00893747
 * Email: jn498641@dal.ca
 */
import { Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import SignIn from "../components/SignIn";
import { motion } from "framer-motion";
import SignUp from "../components/SignUp";

const BackDropVariant = {
  expanded: {
    width: "200%",
    height: "100vh",
    borderRadius: "20%",
    zIndex: 10,
    transition: {
      type: "spring",
      duration: 1.5,
      stiffness: 30,
    },
  },
  collapsed: {
    width: "160%",
    height: "40vh",
    borderRadius: "50%",
    zIndex: 0,
  },
};

const Auth = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(true);

  const handleAnimate = () => {
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, BackDropVariant.expanded.transition.duration * 1000);
  };

  const handleToggle = () => {
    handleAnimate();
    setTimeout(() => {
      setIsSignInOpen((old) => !old);
    }, 500);
  };

  const { colorMode } = useColorMode();

  return (
    <Flex height="100vh" width="100vw" justify="center" align="center">
      <Flex
        w={["100%", "75%", "50%", "40%", "30%"]}
        h={["100vh", "90vh"]}
        background="white"
        boxShadow="lg"
        position="relative"
        overflow="hidden"
        borderRadius={["none", "xl"]}
        padding="10"
        flexDirection="column"
        bg={colorMode === "light" ? "" : "grey.50"}
      >
        <Flex
          as={motion.div}
          position="absolute"
          flexDirection="column"
          borderRadius="50%"
          w="160%"
          h="40vh"
          background="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
          top="-10%"
          left="-35%"
          variants={BackDropVariant}
          animate={isExpanded ? "expanded" : "collapsed"}
          initial={false}
        />

        <Flex zIndex="2" flexDirection="column" h="40vh">
          <Heading color="white">{isSignInOpen ? "Welcome" : "Create"}</Heading>
          <Heading color="white">{isSignInOpen ? "Back" : "Account"}</Heading>
          <Text color="white" mt="3" textTransform="capitalize">
            Please Sign {isSignInOpen ? "In" : " Up"} to continue
          </Text>
        </Flex>
        <Flex h="50vh" w="100%">
          {isSignInOpen ? (
            <SignIn handleToggle={handleToggle} />
          ) : (
            <SignUp handleToggle={handleToggle} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Auth;

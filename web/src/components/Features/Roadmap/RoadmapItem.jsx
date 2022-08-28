/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */

import { Box, Flex, Text, Textarea, useColorMode } from "@chakra-ui/react";
import React from "react";

//React functional component for the individual steps in the roadmap
// this file is responsible for the the alternative steps in the roadmap
export default function RoadmapItem({
  itr,
  text,
  sendContent,
  align,
  children,
}) {
  const { colorMode } = useColorMode();

  //this condition triggers the states for children
  if (!text) {
    return align === "left" ? (
      <Flex
        mt="6"
        ml="-10"
        p="2"
        height="15vh"
        justify={"center"}
        //   bg={'red.300'}
        w={["90%", "85%", "80%"]}
      >
        <Box
          shadow={"md"}
          bg={colorMode === "dark" ? "gray.400" : "gray.50"}
          // bg="orange.200"
          p={2}
          width="50%"
          minHeight="100%"
          borderRadius="5"
          overflow={"auto"}
          maxWidth={"15rem"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
        >
          <Text color={colorMode === "dark" ? "white" : "black"}>
            {children}
          </Text>
        </Box>
      </Flex>
    ) : (
      <Flex
        mt="6"
        height="15vh"
        p="2"
        justify={"flex-end"}
        //   bg={'red.100'}
        w={["90%", "85%", "80%"]}
      >
        <Box
          bg={colorMode === "dark" ? "gray.400" : "gray.50"}
          width="50%"
          minHeight="100%"
          shadow={"md"}
          maxWidth={"15rem"}
          // bg={"gray.50"}
          p={2}
          borderRadius="5"
          overflow={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
        >
          <Text color={colorMode === "dark" ? "white" : "black"}>
            {children}
          </Text>
        </Box>
      </Flex>
    );
  }

  // this renders the steps left or right based on the props passed.
  return align === "left" ? (
    <Flex
      mt="6"
      ml="-10"
      p="2"
      height="15vh"
      justify={"center"}
      //   bg={'red.300'}
      w={["90%", "85%", "80%"]}
    >
      <Textarea
        bg={colorMode === "dark" ? "gray.400" : "gray.50"}
        placeholder="Write a step.."
        size="sm"
        variant={"filled"}
        resize={"none"}
        borderRadius="5"
        p={2}
        width="50%"
        minHeight="100%"
        maxWidth={"15rem"}
        shadow={"md"}
        css={{
          ":focus": {
            background: colorMode === "dark" ? "#BDBDBD" : "#7f7f7f",
          },
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "24px",
          },
        }}
        onChange={(event) =>
          sendContent((prevState) => {
            var steps = prevState.itr;
            steps[itr].content = event.target.value;
            return { ...prevState, itr: steps };
          })
        }
      />
    </Flex>
  ) : (
    <Flex
      mt="6"
      height="15vh"
      p="2"
      justify={"flex-end"}
      //   bg={'red.100'}
      w={["90%", "85%", "80%"]}
    >
      <Textarea
        placeholder="Write a step.."
        size="sm"
        variant={"filled"}
        resize={"none"}
        borderRadius="5"
        p={2}
        width="50%"
        minHeight="100%"
        maxWidth={"15rem"}
        shadow={"md"}
        css={{
          ":focus": {
            background: colorMode === "dark" ? "#BDBDBD" : "#7f7f7f",
          },
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "24px",
          },
        }}
        onChange={(event) =>
          sendContent((prevState) => {
            var steps = prevState.itr;
            steps[itr].content = event.target.value;
            return { ...prevState, itr: steps };
          })
        }
      />
    </Flex>
  );
}

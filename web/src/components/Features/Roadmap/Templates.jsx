/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useRoadmap, useRoadmapDispatch } from "./context/RoadmapContext";
import { ReactSession } from "react-client-session";
import RoadmapItem from "./RoadmapItem";

// functional component for the templates
export default function Templates() {
  //roadmap context for the feature state
  const roadmap = useRoadmap();
  const dispatch = useRoadmapDispatch();
  const [index, setIndex] = useState(0);
  const sessionInfo = JSON.parse(ReactSession.get("user"));
  const navigate = useNavigate();
  //JSX for the template
  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    //Main wrapper flex for the templates
    <Flex direction={"column"} w="100%" alignItems={"center"}>
      <Heading
        as="h1"
        my={5}
        size="xl"
        noOfLines={1}
        color={"#717171"}
        // position="fixed"
      >
        Grab a template
      </Heading>

      <Box
        bg={roadmap.availableThemes[index].bgColor}
        borderRadius={"5"}
        maxHeight={["50vh", "60vh", "70vh"]}
        w={["80%", "60%", "45%"]}
        overflow={"auto"}
        css={{
          ":focus": {
            background: "#FFFFFF",
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
        // transform="scale(.9) translateY(-120px)"
      >
        <Flex
          direction={"column"}
          width="90%"
          bgGradient={`url('/${roadmap.availableThemes[index].bgImage}')`}
          backgroundRepeat="repeat-y"
          backgroundPosition="50% 0%"
          justifyItems={"center"}
          alignItems={"center"}
          // mt={79}
        >
          {roadmap.defaultData.map((item, i) =>
            (i + 1) % 2 === 0 ? (
              <RoadmapItem key={i + 1} align="right" text={false}>
                {item.content}
              </RoadmapItem>
            ) : (
              <RoadmapItem key={i + 1} align="left" text={false}>
                {item.content}
              </RoadmapItem>
            )
          )}
        </Flex>
      </Box>

      <Center
        my="10"
        bottom={"0"}
        marginLeft="auto"
        marginRight="auto"
        left={"0"}
        right={"0"}
        width={"auto"}
      >
        <Flex wrap={"wrap"}>
          <IconButton
            size={"40px"}
            onClick={() =>
              setIndex((prev) => {
                return prev === 0
                  ? roadmap.availableThemes.length - 1
                  : prev - 1;
              })
            }
          >
            <ChevronLeftIcon width={"30px"} height={"30px"} />
          </IconButton>
          <Link to="/roadmap/generate">
            <Button
              m={2}
              colorScheme="blue"
              size={["sm", "md"]}
              width={["10rem", "12rem", "15rem"]}
              onClick={() => {
                dispatch({
                  type: "setTheme",
                  data: roadmap.availableThemes[index],
                });
              }}
            >
              Select
            </Button>
          </Link>
          <IconButton
            size={"40px"}
            onClick={() =>
              setIndex((prev) => {
                return prev === roadmap.availableThemes.length - 1
                  ? 0
                  : prev + 1;
              })
            }
          >
            <ChevronRightIcon width={"30px"} height={"30px"} />
          </IconButton>
        </Flex>
      </Center>
    </Flex>
  );
}

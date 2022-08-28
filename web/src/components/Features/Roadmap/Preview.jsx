/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */

import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRoadmap } from "./context/RoadmapContext";
import { ReactSession } from "react-client-session";
import RoadmapItem from "./RoadmapItem";
import { useState } from "react";

//functional components for the Preview component in the roadmap
// this is fynamic component which gets used by feed and other services
// this component works with the props and renders accordingly

export default function Preview({ data, feed }) {
  // sortes the roadmap
  var _roadmap = useRoadmap();
  const roadmap = _roadmap.SelectedRoadmapData;

  // gets logged in users from the local storage
  const sessionInfo = JSON.parse(ReactSession.get("user"));

  // the function that triggers the submit event and the backend API call.

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(
        "https://group-18.herokuapp.com/roadmap",
        {
          title: roadmap.metaData.title,
          description: roadmap.metaData.desc,
          data: JSON.stringify(roadmap),
          categoryId: parseInt(roadmap.metaData.category.split(" ")[1]),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionInfo.accessToken}`,
          },
        }
      )
      .then(() => {})
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  //render JSX for te preview
  return (
    <Flex w="100%" direction="column" alignItems="center" spacing={6}>
      {!feed ? (
        <Heading
          as="h1"
          my={5}
          size="xl"
          noOfLines={1}
          color={"#717171"}
          // position="fixed"
        >
          Take a final look
        </Heading>
      ) : null}

      <Box
        w={["80%", "60%", "50%"]}
        bg={"teal.50"}
        borderRadius={"5"}
        maxHeight={["50vh", "60vh", "70vh"]}
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
          bg={`${roadmap.theme.bgColor}`}
          direction={"column"}
          borderColor="gray.400"
          width="100%"
          bgGradient={`url('/${roadmap.theme.bgImage}')`}
          backgroundRepeat="repeat-y"
          backgroundPosition="50% 0%"
          // alignContent={'center'}
          justifyItems={"center"}
          alignItems={"center"}
        >
          {roadmap.data.map((item, i) =>
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
      {!feed ? (
        <>
          <Flex mt={5} direction="column">
            <p>
              <strong>Title:</strong> {roadmap.metaData.title}
            </p>
            <p>
              {" "}
              <strong>Category:</strong>{" "}
              {roadmap.metaData.category.split(" ")[0]}
            </p>

            <p>
              {" "}
              <strong>Description:</strong> {roadmap.metaData.desc}
            </p>
          </Flex>

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
              <Link to="/roadmap/details">
                <Button m={2} colorScheme="red">
                  Reset
                </Button>
              </Link>
              <Link to="/">
                <Button
                  m={2}
                  colorScheme="blue"
                  onClick={() => {
                    handleSubmit();
                  }}
                  isLoading={isLoading}
                >
                  Share it with the world
                </Button>
              </Link>
            </Flex>
          </Center>
        </>
      ) : null}
    </Flex>
  );
}

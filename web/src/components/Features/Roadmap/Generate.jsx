/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */

import { Button, Center, Flex, Heading, useToast } from "@chakra-ui/react";
import { useRoadmap, useRoadmapDispatch } from "./context/RoadmapContext";
import { useState } from "react";
import { Link } from "react-router-dom";

import RoadmapItem from "./RoadmapItem";

// React functional component, for building the roadmap
// This component handles the swiggly steps in the roadmap generation
// This perficular components gets rerenderd on multiple pages whith
// the readonly and writeonly functionality
export default function Generate() {
  //Roadmap contexta
  const roadmap = useRoadmap();
  const dispatch = useRoadmapDispatch();

  const [data, setData] = useState({
    theme: {
      bgColor: "teal.50",
    },
    itr: [
      {
        content: "",
      },
    ],
  });

  const toast = useToast({
    position: "top",
    title: "Fill the current step first",
    containerStyle: {
      width: "800px",
      maxWidth: "100%",
    },
  });

  return (
    <Flex w="100%" direction={"column"} alignItems={"center"}>
      <Heading
        as="h1"
        my="6"
        size={["lg", "xl", "xl"]}
        noOfLines={1}
        color={"#717171"}
        // position="fixed"
      >
        Share your journey
      </Heading>

      <Flex
        bg={`${roadmap.SelectedRoadmapData.theme.bgColor}`}
        borderRadius={"5"}
        pb={10}
        direction={"column"}
        borderColor="gray.400"
        width={["80%", "60%", "50%"]}
        bgGradient={`url('/${roadmap.SelectedRoadmapData.theme.bgImage}')`}
        backgroundRepeat="repeat-y"
        backgroundPosition="50% 0%"
        // alignContent={'center'}
        justifyItems={"center"}
        alignItems={"center"}
      >
        {data.itr.map((item, i) =>
          (i + 1) % 2 === 0 ? (
            <RoadmapItem
              itr={i}
              key={i + 1}
              align="right"
              text={true}
              sendContent={setData}
            >
              {item.content}
            </RoadmapItem>
          ) : (
            <RoadmapItem
              itr={i}
              key={i + 1}
              align="left"
              text={true}
              sendContent={setData}
            >
              {item.content}
            </RoadmapItem>
          )
        )}
      </Flex>

      <Center
        my="10"
        position={"sticky"}
        bottom={"0"}
        marginLeft="auto"
        marginRight="auto"
        left={"0"}
        right={"0"}
        width={"auto"}
        // bg={'gray.100'}
      >
        <Flex wrap={"wrap"}>
          <Button
            m={2}
            colorScheme="red"
            onClick={() =>
              setData({
                theme: {
                  bgColor: "teal.50",
                },
                itr: [
                  {
                    content: "",
                  },
                ],
              })
            }
          >
            Reset
          </Button>
          <Button
            m={2}
            colorScheme="blue"
            onClick={() => {
              if (!data.itr[data.itr.length - 1].content) {
                toast();
              } else {
                setData((prevState) => ({
                  ...prevState,
                  itr: [
                    ...prevState.itr,
                    {
                      content: "",
                    },
                  ],
                }));
              }
            }}
          >
            Add step
          </Button>

          <Link to="/roadmap/details">
            <Button
              m={2}
              colorScheme="green"
              onClick={() => {
                dispatch({ type: "finalizeContent", data: data.itr });
              }}
            >
              Finalize
            </Button>
          </Link>
        </Flex>
      </Center>
    </Flex>
  );
}

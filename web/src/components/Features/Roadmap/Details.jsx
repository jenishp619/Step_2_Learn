/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */

import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRoadmapDispatch } from "./context/RoadmapContext";

export default function Details() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useRoadmapDispatch();
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
        Add some details
      </Heading>

      <Flex
        borderRadius={"5"}
        pb={10}
        direction={"column"}
        borderColor="gray.400"
        width={["80%", "60%", "50%"]}
        // alignContent={'center'}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <br />
        <Select
          my="5"
          placeholder="Select option"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="cooking 1">cooking</option>
          <option value="learning 2">learning</option>
          <option value="reading 3">reading</option>
          <option value="coding 4">coding</option>
          <option value="writing 5">writing</option>
        </Select>
        {/* cooking, learning, reading, coding,  writing  */}
        <br />
        <Textarea
          placeholder="description...."
          onChange={(e) => setDesc(e.target.value)}
        />
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
          <Link to="/roadmap/generate">
            <Button m={2} colorScheme="red">
              Reset
            </Button>
          </Link>

          <Link to="/roadmap/preview">
            <Button
              m={2}
              colorScheme="blue"
              onClick={() => {
                dispatch({
                  type: "finalizeMetaData",
                  data: {
                    title: title,
                    category: category,
                    desc: desc,
                  },
                });
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

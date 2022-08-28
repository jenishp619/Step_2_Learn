/*
 * Author: Jay Kirankumar Patel
 * Banner: B00906433
 * E-mail: jaykiranpatel@dal.ca
 */

import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Feed from "../../../pages/Feed";
import Blog from "../Blog/Blog";
import Event from "../../../pages/Event";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
const BACKEND_URL = "https://group-18.herokuapp.com";

export default function Search() {
  const [category, setCategory] = useState("blog");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const sessionInfo = JSON.parse(ReactSession.get("user"));
  // Hit search API if search query or category is changed
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/search?search=${search}&type=${category}`
        );
        setResults(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category, search]);

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" direction={"column"} alignItems="center">
      <Flex
        w="100%"
        direction={["column", "row"]}
        alignItems="center"
        justifyContent={"center"}
        py="10"
      >
        <Select
          w={["90%", "auto"]}
          mb={[2, 0]}
          flexBasis={"20%"}
          onChange={(e) => {
            setCategory(e.target.value);
            setResults([]);
          }}
          value={category}
        >
          <option value="blog">Blog</option>
          <option value="event">Event</option>
          <option value="roadmap">Roadmap</option>
          <option value="user">User</option>
        </Select>

        <Stack spacing={4} w={["90%", "auto"]} flexBasis={"45%"}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FiSearch color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Stack>
      </Flex>

      <Flex direction="column" py="10" w="100%" alignItems={"center"}>
        {searchExt(category, results)}
      </Flex>
    </Flex>
  );
}

// Function to render search results
function searchExt(searchCategory, data) {
  if (data.length === 0) {
    return <Text fontSize="2xl">No results found</Text>;
  }

  switch (searchCategory) {
    case "user":
      return data.map((u, i) => (
        <Flex
          key={i}
          w={["70%", "60%", "40%", "25%"]}
          alignItems={"center"}
          shadow="xl"
          borderRadius="xl"
          p="2"
          my="2"
        >
          <Link to={`/profile/${u.id}`}>
            <Avatar
              src={u.profileUrl}
              size={["md", "md", "lg"]}
              name={`${u.firstName} ${u.lastName}`}
            />
          </Link>
          <Text ml={4} noOfLines={2}>{`${u.firstName} ${u.lastName}`}</Text>
        </Flex>
      ));
    case "roadmap":
      return <Feed searchedData={data} />;
    case "blog":
      return <Blog searchedData={data} addButton={false} />;
    case "event":
      return <Event searchedData={data} addButton={false} />;
    default:
      return <></>;
  }
}

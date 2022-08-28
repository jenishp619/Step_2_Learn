/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";

export default function Blog({ searchedData, addButton }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  let location = useLocation();
  const sessionInfo = JSON.parse(ReactSession.get("user"));
  useEffect(() => {
    if (searchedData) {
      setBlogs([...searchedData]);
    } else {
      axios
        .get("https://group-18.herokuapp.com/blog")
        .then((data) => setBlogs(data.data.data))
        .catch((err) => console.log(err));
    }
  }, [searchedData, location]);

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" direction={"column"} alignItems={"center"}>
      {addButton ? (
        <Flex w="100%" justifyContent="flex-end" align="center" p="5">
          <IconButton
            colorScheme="blue"
            icon={<FiPlus />}
            onClick={() => {
              navigate("/blog/new");
            }}
          />
        </Flex>
      ) : null}

      {blogs.map((b, i) => (
        <Flex
          key={i}
          direction="column"
          // borderRadius="2xl"
          overflow={"hidden"}
          my="10"
          cursor={"pointer"}
          onClick={() => navigate(`/blog/${b.id}`)}
        >
          <Box w={["90vw", "80vw", "50vw"]} h={["40vh"]} overflow={"hidden"}>
            <Image
              h={["100%", "50vh"]}
              w="100%"
              objectFit={["contain", "cover"]}
              mb="5"
              cursor="pointer"
              src={b.displayImage}
            />
          </Box>

          <Box w={["90vw", "80vw", "50vw"]} p={"1"}>
            {new Date(b.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Box>
          <Box w={["90vw", "80vw", "50vw"]} p={"1"}>
            <Text fontSize="2xl" fontWeight="bold">
              {b.title}
            </Text>
          </Box>
          <Box w={["90vw", "80vw", "50vw"]} p={"1"}>
            <Text fontSize="lg">
              {b.description.length < 250
                ? b.description
                : b.description.substring(0, 250) + " . . ."}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
}

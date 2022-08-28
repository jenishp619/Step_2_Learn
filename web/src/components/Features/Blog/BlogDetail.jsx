/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { ReactSession } from "react-client-session";
import { toast } from "react-toastify";
export default function BlogDetail() {
  const navigate = useNavigate();
  let { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const sessionInfo = JSON.parse(ReactSession.get("user"));
  // console.log(sessionInfo);
  useEffect(() => {
    axios
      .get(`https://group-18.herokuapp.com/blog/${blogId}`)
      .then((data) => setBlog(data.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBlog = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
    };

    axios
      .delete(`https://group-18.herokuapp.com/blog/${blogId}`, config)
      .then((data) => {
        toast.success("blog deleted succesfully");
        navigate("/blog");
      })
      .catch((err) => toast.error(err.message));
  };
  // console.log(blog);
  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex
      direction="column"
      overflow={"hidden"}
      alignItems="center"
      w={["90vw", "80vw", "90vw"]}
    >
      {sessionInfo && sessionInfo.user.id === blog.userId ? (
        <Flex justifyContent={"space-between"} alignItems="center" w="90%">
          <Box w="90%" p={"1"} mb="5">
            <Text fontSize="3xl" fontWeight="bold" my="5">
              {blog.title}
            </Text>
          </Box>
          <Button colorScheme={"red"} onClick={() => deleteBlog(blog.id)}>
            <RiDeleteBinLine />
          </Button>
        </Flex>
      ) : (
        <Box w="90%" p={"1"} mb="5">
          <Text fontSize="3xl" fontWeight="bold" my="5">
            {blog.title}
          </Text>
        </Box>
      )}
      <Box
        w={["90vw", "80vw", "90vw"]}
        h={["50vh"]}
        overflow={"hidden"}
        mb="10"
      >
        <Center>
          <Image
            h="50vh"
            maxW="800px"
            w="100%"
            objectFit="cover"
            mb="5"
            src={blog.displayImage}
          />
        </Center>
      </Box>
      <Flex
        w="90%"
        p={"1"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Text>
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Link to={`/profile/${blog.user?.id}`}>
          <Avatar
            name={`${blog.user?.firstName} ${blog.user?.lastName}`}
            src={blog.user?.profileUrl}
          ></Avatar>
        </Link>
        {/* <Avatar name={`K P`}></Avatar> */}
      </Flex>

      <Box w="90%" p={"1"}>
        <Text fontSize="lg">{blog.description}</Text>
      </Box>
    </Flex>
  );
}

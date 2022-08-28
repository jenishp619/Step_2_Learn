/**
 *
 * Author: Jenish Girish Patel
 * Banner ID: B00897765
 * Email: jenish.patel@dal.ca
 */
import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useMemo } from "react";

const Notes = () => {
  const { colorMode } = useColorMode();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const sessionInfo = JSON.parse(ReactSession.get("user"));

  const axiosConfig = useMemo(() => {
    return {
      headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
    };
  }, [sessionInfo]);

  useEffect(() => {
    axios
      .get("https://group-18.herokuapp.com/note", axiosConfig)
      .then((response) => {
        setNotes(response.data.data);
        // navigate("/notes");
      })
      .catch((error) => {
        toast.error("Error fetching notes");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createMarkup(desc) {
    return { __html: desc };
  }

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" flexDirection="column" p="3">
      <Flex w="100%" justify="flex-end" my="5">
        <Link to="/note/new">
          <Button colorScheme="yellow">Take New Note</Button>
        </Link>
      </Flex>
      <Flex w="100%" minH="100vh" flexWrap="wrap">
        {notes.map((item, index) => {
          return (
            <Flex
              w="30%"
              h="350px"
              m="3"
              shadow="lg"
              borderRadius="2xl"
              bg={colorMode === "light" ? "" : "#2d3436"}
              key={index}
            >
              <Link
                key={index}
                to={`/note/${item.id}`}
                style={{ width: "100%" }}
              >
                <Flex flexDirection="column" w="100%">
                  <Flex
                    w="100%"
                    h="50px"
                    background="gold"
                    align="center"
                    justify="space-between"
                    p="5"
                  >
                    <Text fontWeight="bold">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Box
                      cursor="pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const noteItem = notes.find(
                          (note) => note.id === item.id
                        );
                        axios
                          .delete(
                            `https://group-18.herokuapp.com/note/${item.id}`,
                            axiosConfig
                          )
                          .then(() => {
                            const newNotes = notes.filter(
                              (note) => note.id !== noteItem.id
                            );
                            setNotes([...newNotes]);
                          })
                          .catch(() => {
                            toast.error("Error deleting notes");
                          });
                      }}
                    >
                      <AiOutlineClose size={25} />
                    </Box>
                  </Flex>
                  <Flex w="100%" h="250px" p="5">
                    <Text
                      dangerouslySetInnerHTML={createMarkup(item.description)}
                    ></Text>
                  </Flex>
                </Flex>
              </Link>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Notes;

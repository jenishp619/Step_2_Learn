/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineStar,
} from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ReactSession } from "react-client-session";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RoadmapItem from "./Features/Roadmap/RoadmapItem";

const FeedItem = ({ index }) => {
  const { colorMode } = useColorMode();

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [fav, setFav] = useState(false);
  const [feedDetails, setFeedDetails] = useState({});
  const [roadmap, setRoadmap] = useState({});
  const { id } = useParams();
  const [totalLikes, setTotalLikes] = useState(0);

  /**
   *
   * Author: Janvi Patel
   * Banner ID: B00896196
   * Email: jn398689@dal.ca
   */
  // maintaining the session for autehntication
  const sessionInfo = JSON.parse(ReactSession.get("user"));
  const config = {
    headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
  };

  useEffect(() => {
    /**
     *
     * Author: Janvi Patel
     * Banner ID: B00896196
     * Email: jn398689@dal.ca
     */
    // rendering the roadmap
    axios
      .get(`https://group-18.herokuapp.com/roadmap/${id}`)
      .then((response) => {
        setRoadmap(JSON.parse(response.data.data));
        setFeedDetails(response.data);

        axios
          .get(`https://group-18.herokuapp.com/favorite/users/${id}`, {
            headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
          })
          .then((res) => setFav(res.data))
          .catch(() => {});

        axios
          .get(`https://group-18.herokuapp.com/reaction/user/${id}`, config)
          .then(() => {
            setLiked(true);
          })
          .catch(() => {});

        axios
          .get(`https://group-18.herokuapp.com/reaction/${id}`)
          .then((data) => setTotalLikes(data.data.totalCount))
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch(() => {});

    axios
      .get(`https://group-18.herokuapp.com/comment/roadmap/${id}`)
      .then((response) => {
        setmessages(response.data);
      })
      .catch(() => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLikeClick = (newState) => {
    if (newState) {
      axios
        .post(
          `https://group-18.herokuapp.com/reaction/${id}`,
          { emoji: "❤" },
          config
        )
        .then(() => {
          setTotalLikes((prev) => prev + 1);
          setLiked(true);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .delete(`https://group-18.herokuapp.com/reaction/${id}`, config)
        .then(() => {
          setTotalLikes((prev) => prev - 1);
          setLiked(false);
        })
        .catch((err) => {
          toast.error(err.message);
          console.error(err);
        });
    }
  };

  const handleClick = () => {
    if (!message.trim().length) {
      setErrorMessage("Please write valid comment message");
      return;
    }

    const postData = {
      content: message,
      roadmapId: +id,
    };

    axios
      .post(`https://group-18.herokuapp.com/comment`, postData, config)
      .then((response) => {
        const newlyAddedComment = {
          ...response.data,
          user: sessionInfo.user,
        };
        setMessage("");
        setmessages((old) => [newlyAddedComment, ...old]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   *
   * Author: Janvi Patel
   * Banner ID: B00896196
   * Email: jn398689@dal.ca
   */
  // handling the favourite click
  const handleFavClick = async (oldState) => {
    if (oldState) {
      try {
        await axios.delete(
          `https://group-18.herokuapp.com/favorite/${id}`,
          config
        );
        setFav(false);
        toast.warning("We removed from favourite it !!! 👎");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post(
          `https://group-18.herokuapp.com/favorite/${id}`,
          {},
          config
        );
        setFav(true);
        toast("Yeah, You favourite it !!! 👍");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCommentDelete = (id) => {
    try {
      axios
        .delete(`https://group-18.herokuapp.com/comment/${id}`, config)
        .then((data) => {
          setmessages([...messages.filter((comment) => comment.id !== id)]);
          toast("Comment deleted!");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * Author: Janvi Patel, Ferin Patel
   * Banner ID: B00896196, B00891975
   * Email: jn398689@dal.ca, ferin@dal.ca
   */

  return (
    <Flex my="5" justify="center" w="100%">
      <Flex
        w="100%"
        h="100%"
        maxW="800px"
        flexDirection="column"
        p="5"
        shadow="2xl"
        borderRadius="2xl"
        align="center"
        bg={colorMode === "dark" ? "#2d3436" : "white"}
      >
        <Flex w="100%" align="center" my="5">
          <Link to="/profile">
            <Avatar
              name={`${feedDetails?.user?.firstName} ${feedDetails?.user?.lastName}`}
              src={feedDetails?.user?.profileUrl}
              size={["md", "md", "lg"]}
            />
          </Link>
          <Heading fontSize={"2xl"} m="3">
            {feedDetails.title}
          </Heading>
        </Flex>

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
        >
          <Flex
            bg={`${roadmap.theme ? roadmap.theme.bgColor : ""}`}
            direction={"column"}
            borderColor="gray.400"
            width="100%"
            bgGradient={`url('/${roadmap.theme ? roadmap.theme.bgImage : ""}')`}
            backgroundRepeat="repeat-y"
            backgroundPosition="50% 0%"
            justifyItems={"center"}
            alignItems={"center"}
          >
            {roadmap.data
              ? roadmap.data.map((item, i) =>
                  (i + 1) % 2 === 0 ? (
                    <RoadmapItem key={i + 1} align="right" text={false}>
                      {item.content}
                    </RoadmapItem>
                  ) : (
                    <RoadmapItem key={i + 1} align="left" text={false}>
                      {item.content}
                    </RoadmapItem>
                  )
                )
              : null}
          </Flex>
        </Box>

        <Flex w="100%" h="5vh" justify="space-evenly" align="center" p="3">
          <Box cursor="pointer">
            {!liked ? (
              <Flex>
                <AiOutlineHeart
                  color="red"
                  size={25}
                  onClick={() => {
                    handleLikeClick(true);
                  }}
                />
                <p>{totalLikes}</p>
              </Flex>
            ) : (
              <Flex>
                <AiFillHeart
                  color="red"
                  size={25}
                  onClick={() => {
                    handleLikeClick(false);
                  }}
                />
                <p>{totalLikes}</p>
              </Flex>
            )}
          </Box>

          {fav ? (
            <AiFillStar
              cursor="pointer"
              color="#ffd700"
              size={25}
              onClick={() => {
                handleFavClick(true);
              }}
            />
          ) : (
            <AiOutlineStar
              cursor="pointer"
              color="#ffd700"
              size={25}
              onClick={() => {
                handleFavClick(false);
              }}
            />
          )}

          <Box cursor="pointer">
            <CopyToClipboard
              text={window.location.href}
              onCopy={() => toast("Share link copied to clipboard")}
            >
              <AiOutlineShareAlt size={25} color="#0AF" />
            </CopyToClipboard>
          </Box>
        </Flex>

        <Flex w="100%" flexDirection="column" my="5">
          <Flex w="100%" mb="50px" justify="space-evenly" align="center">
            <FormControl isInvalid={errorMessage.length} mx={["2", "10"]}>
              <Input
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            </FormControl>
            <Button colorScheme="blue" onClick={handleClick}>
              Comment
            </Button>
          </Flex>
          <Box borderLeft="2px solid #dedede" w="100%">
            {messages.map((item, index) => {
              return (
                <div key={item.id}>
                  <Flex justifyContent={"space-between"} align="center" w="90%">
                    <Text marginLeft="50px">
                      {`${item?.user?.firstName} ${item?.user?.lastName}`}{" "}
                      commented on {new Date(item.updatedAt).toDateString()}
                    </Text>

                    {sessionInfo.user.id === item.userId ? (
                      <IconButton
                        colorScheme="red"
                        onClick={() => handleCommentDelete(item.id)}
                        icon={<AiFillDelete />}
                      />
                    ) : (
                      <span />
                    )}
                  </Flex>
                  <Box
                    key={index}
                    position="relative"
                    margin="0 0 50px 30px"
                    padding="20px"
                    color="gray"
                    borderRadius="2xl"
                    maxW="90%"
                    shadow="xl"
                  >
                    <Text
                      _before={{
                        content: '""',
                        position: "absolute",
                        width: "25px",
                        height: "25px",
                        background: "white",
                        borderRadius: "50%",
                        left: "-43px",
                        backgroundColor: "#0AF",
                      }}
                    >
                      {item.content}
                    </Text>
                  </Box>
                </div>
              );
            })}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FeedItem;

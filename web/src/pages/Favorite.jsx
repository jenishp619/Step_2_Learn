import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import IndividualFeed from "../components/IndividualFeed";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */
const Favorite = () => {
  const sessionInfo = JSON.parse(ReactSession.get("user"));
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
  };
  let [feedList, setFeedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roadmapListResponse = await axios.get(
          "https://group-18.herokuapp.com/favorite/user",
          config
        );
        let listRoadmaps = roadmapListResponse.data;

        const likes = await Promise.all(
          listRoadmaps.map(async (item) => {
            var individualLikes = await axios
              .get(`https://group-18.herokuapp.com/reaction/${item.roadmap.id}`)
              .then((data) => data.data.totalCount);
            return { id: item.roadmap.id, likes: individualLikes };
          })
        );

        const roadmapWithLikes = listRoadmaps.map((item) => {
          var like = likes.filter((like) => like.id === item.roadmap.id);
          return { ...item.roadmap, likes: like[0].likes };
        });
        setFeedList(roadmapWithLikes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeClick = (index, roadmapId, newState) => {
    const list = [...feedList];
    list[index].isLiked = newState;

    if (newState) {
      axios
        .post(
          `https://group-18.herokuapp.com/reaction/${roadmapId}`,
          { emoji: "❤" },
          config
        )
        .then(() => setFeedList(list))
        .error((err) => console.error(err));
    } else {
      axios
        .delete(`https://group-18.herokuapp.com/reaction/${roadmapId}`, config)
        .then(() => setFeedList(list))
        .error((err) => console.error(err));
    }
  };

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" h="100%" flexDirection="column" p="5">
      {feedList.length ? (
        feedList.map((item, index) => {
          return (
            <IndividualFeed
              key={index}
              index={index}
              feedDetails={item}
              userDetails={item.user}
              handleLikeClick={handleLikeClick}
            />
          );
        })
      ) : (
        <Flex w="100%" minH="100vh" justify="center" align="center">
          <Text fontSize="xl">No Favorite. Keep exploring.</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Favorite;

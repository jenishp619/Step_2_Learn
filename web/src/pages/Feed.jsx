/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import IndividualFeed from "../components/IndividualFeed";
import axios from "axios";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Feed = ({ searchedData }) => {
  let [feedList, setFeedList] = useState([]);
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      /**
       *
       * Author: Janvi Patel
       * Banner ID: B00896196
       * Email: jn398689@dal.ca
       */
      try {
        let listRoadmaps = [];
        if (searchedData) {
          listRoadmaps = [...searchedData];
        } else {
          const roadmapListResponse = await axios.get(
            "https://group-18.herokuapp.com/roadmap"
          );

          listRoadmaps = roadmapListResponse.data.data;
          // console.log(listRoadmaps);
        }

        const likes = await Promise.all(
          listRoadmaps.map(async (item) => {
            var individualLikes = await axios
              .get(`https://group-18.herokuapp.com/reaction/${item.id}`)
              .then((data) => data.data.totalCount);
            return { id: item.id, likes: individualLikes };
          })
        );

        /**
         *
         * Author: Janvi Patel
         * Banner ID: B00896196
         * Email: jn398689@dal.ca
         */
        // dynamic rendering of feedpost based on most liked feed
        const roadmapWithLikes = listRoadmaps.map((item) => {
          var like = likes.filter((like) => like.id === item.id);
          return { ...item, likes: like[0].likes };
        });

        // console.log(roadmapWithLikes);
        /**
         *
         * Author: Janvi Patel
         * Banner ID: B00896196
         * Email: jn398689@dal.ca
         */
        // mostliked roadmap will sorted first
        roadmapWithLikes.sort((rd1, rd2) => rd2.likes - rd1.likes);

        setFeedList(roadmapWithLikes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchedData, location]);

  const sessionInfo = JSON.parse(ReactSession.get("user"));

  const config = {
    headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
  };

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
        .catch((err) => toast.error(err.message));
    } else {
      axios
        .delete(`https://group-18.herokuapp.com/reaction/${roadmapId}`, config)
        .then(() => setFeedList(list))
        .catch((err) => toast.error(err.message));
    }
  };

  /**
   *
   * Author: Janvi Patel, Ferin Patel
   * Banner ID: B00896196, B00891975
   * Email: jn398689@dal.ca, ferin@dal.ca
   */
  return (
    <Flex w="100%" h="100%" flexDirection="column" p="5">
      {feedList.map((item, index) => {
        return (
          <IndividualFeed
            key={index}
            index={index}
            feedDetails={item}
            userDetails={item.user}
            handleLikeClick={handleLikeClick}
          />
        );
      })}
      {}
    </Flex>
  );
};

export default Feed;

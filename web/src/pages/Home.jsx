/**
 * 
 * Author: Janvi Nayanbhai Patel
 * Banner ID: B00893747 
 * Email: jn498641@dal.ca
 */import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import Tour from "reactour";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    selector: "#name",
    content: "Welcome to Step To Learn",
  },
  {
    selector: "#feed",
    content: "Feed Screen will show roadmap based on your interest.",
  },
  {
    selector: "#search",
    content: "You can search anything, however it's not google search.",
  },
  {
    selector: "#profile",
    content: "Tell us about yourself. Edit. Manage. Shine.",
  },
  {
    selector: "#roadmap",
    content: "Share your guidance by creating roadmaps.",
  },
  {
    selector: "#fav",
    content: "Save later. Read later.",
  },
  {
    selector: ".feedItem",
    content: "This is how roadmap looks like.",
  },
  {
    selector: "#darkmodelabel",
    content: "Looking for dark mode toogle ? Here it is.",
  },
  {
    content: "That's it. Enjoy 😁",
  },
];

const Home = () => {
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate();

  const [isOpenSteps, setIsOpenSteps] = useState(
    ReactSession.get("ftux") ? JSON.parse(ReactSession.get("ftux")) : true
  );
  const user = ReactSession.get("user");
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  });

  if (user) {
    return (
      <Flex w={["100%", "100%", "100%", "80%"]} minH="100vh">
        <Tour
          steps={steps}
          isOpen={isOpenSteps}
          onRequestClose={() => {
            ReactSession.set("ftux", "false");
            setIsOpenSteps(false);
          }}
        />
        <Feed />
      </Flex>
    );
  }
};
export default Home;

import { Avatar, Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { FiDelete } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const sessionInfo = JSON.parse(ReactSession.get("user"));
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
  };
  useEffect(() => {
    axios
      .get("https://group-18.herokuapp.com/notification", config)
      .then((response) => {
        // console.log(response);
        setNotifications(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNotificationDelete = (id) => {
    axios
      .delete(`https://group-18.herokuapp.com/notification/${id}`, config)
      .then((response) => {
        setNotifications((prev) => prev.filter((noti) => noti.id !== id));
        toast.success("Notification deleted sucessfully");
        // console.log(response);
      });
  };

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex m="5" justify="center" w="100%">
      <Flex
        w="100%"
        h="fit-content"
        maxW="800px"
        flexDirection="column"
        p="5"
        // shadow="2xl"
        borderRadius="2xl"
        align="center"
        // bg={colorMode === "dark" ? "#2d3436" : "white"}
      >
        <Stack direction={"column"} spacing={3}>
          {notifications.length ? (
            notifications.map((notification) => {
              return (
                <Box shadow="xl" key={notification.id}>
                  <Flex w="100%" justifyContent={"flex-end"}>
                    <IconButton
                      onClick={() => handleNotificationDelete(notification.id)}
                      icon={<FiDelete />}
                      colorScheme="red"
                    />
                  </Flex>
                  <Flex
                    key={notification.id}
                    w="100%"
                    align="center"
                    my="5"
                    p="5"
                  >
                    <Link to="/profile">
                      <Avatar
                        src={notification?.user?.profileUrl}
                        name={`${notification?.user?.firstName} ${notification?.user?.lastName}`}
                        size={["md", "md", "lg"]}
                      />
                    </Link>
                    <Text m="3">{notification.content}</Text>
                  </Flex>
                </Box>
              );
            })
          ) : (
            <Flex w="100%" minH="100vh" justify="center" align="center">
              <Text fontSize="xl">No Notifications</Text>
            </Flex>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Notification;

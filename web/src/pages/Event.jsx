/*
 * Author: Jay Kirankumar Patel
 * Banner: B00906433
 * E-mail: jaykiranpatel@dal.ca
 */

import { Box, Button, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ReactSession } from "react-client-session";

// Random int  generator for deciding the size of event's card
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Random color generator for deciding the color of event's card
function getRandomColors() {
  const rgb = [255, 0, 0];
  rgb[0] = Math.round(Math.random() * 255);
  rgb[1] = Math.round(Math.random() * 255);
  rgb[2] = Math.round(Math.random() * 255);

  const brightness = Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000
  );
  const textColour = brightness > 125 ? "black" : "white";
  const backgroundColour = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  return { textColour, backgroundColour };
}

const BACKEND_URL = "https://group-18.herokuapp.com";

const Event = ({ searchedData, addbutton }) => {
  const navigate = useNavigate();

  const sessionInfo = JSON.parse(ReactSession.get("user"));

  const axiosConfig = {
    headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
  };

  useEffect(() => {
    // Fetch all events from backend if no searchData is passed
    const fetchData = async () => {
      try {
        let eventList = [];
        if (searchedData) {
          eventList = [...searchedData];
        } else {
          const eventListResponse = await axios.get(
            `${BACKEND_URL}/event?per_page=10000`
          );
          eventList = eventListResponse.data.data;
        }

        let registeredEventsIds = [];
        if (eventList.length > 0) {
          const currentUsersRegisteredEventsResponse = await axios.get(
            `${BACKEND_URL}/user-event/user/${sessionInfo.user.id}?per_page=10000`
          );
          registeredEventsIds =
            currentUsersRegisteredEventsResponse.data.data.map(
              (event) => event.eventId
            );
        }

        setEvents(
          eventList.map((event) => {
            const displaySize = randomIntFromInterval(1, 3);
            const { textColour, backgroundColour } = getRandomColors();

            return {
              ...event,
              isRegistered: registeredEventsIds.includes(event.id),
              displaySize,
              textColour,
              backgroundColour,
            };
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedData]);

  const [events, setEvents] = useState([]);

  // Function to register for an event
  const registerHandler = (id, index) => {
    axios
      .post(`${BACKEND_URL}/user-event`, { eventId: id }, axiosConfig)
      .then((res) => {
        const list = [...events];
        list[index].isRegistered = true;
        setEvents(list);
        toast.success("Registered for event successfully");
      })
      .catch((err) => console.error(err));
  };

  // Function to delete an event
  const deleteHandler = (id) => {
    axios
      .delete(`${BACKEND_URL}/event/${id}`, axiosConfig)
      .then(() => {
        setEvents(events.filter((event) => event.id !== id));
        toast.warning("Event deleted successfully");
      })
      .catch((err) => console.error(err));
  };

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" minH="100vh" flexDirection="column" align="center">
      {addbutton ? (
        <Flex w="100%" justifyContent="flex-end" align="center" p="5">
          <IconButton
            colorScheme="blue"
            icon={<FiPlus />}
            onClick={() => {
              navigate("/event/new");
            }}
          />
        </Flex>
      ) : null}

      {events.length === 0 && (
        <Text fontSize="2xl" margin={"auto"}>
          No events found
        </Text>
      )}

      <Grid
        w="90%"
        gridTemplateColumns="repeat(auto-fill, 250px)"
        gridAutoRows="10px"
      >
        {events.map((item, index) => {
          return (
            <Box
              key={item.id}
              rounded="lg"
              shadow="lg"
              gridRowEnd={
                item.displaySize === 1
                  ? "span 35"
                  : item.displaySize === 2
                  ? "span 40"
                  : "span 50"
              }
              margin="15px 10px"
              bg={item.backgroundColour}
              color={item.textColour}
              border="1px solid black"
            >
              <Flex
                w="100%"
                h="100%"
                p="3"
                flexDirection="column"
                justify="space-between"
              >
                <Flex flexDirection={"column"}>
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                  >{`Created by :  ${item.user.firstName} ${item.user.lastName}`}</Text>
                  <Text noOfLines={2} fontSize="xl" mb="3" fontWeight="bold">
                    {item.title}
                  </Text>
                  <Text
                    noOfLines={
                      item.displaySize === 1
                        ? 3
                        : item.displaySize === 2
                        ? 4
                        : 9
                    }
                  >
                    {item.description}
                  </Text>
                </Flex>

                <Flex flexDirection={"column"} mt="5">
                  <Flex>
                    <AiTwotoneCalendar size={20} />
                    <Text fontSize="md" mx={3}>
                      {new Date(item.eventDate).toDateString()}
                    </Text>
                  </Flex>
                  <Flex align="center" mt="2">
                    <GoLocation size={20} />
                    <Text noOfLines={1} mx="3">
                      {item.address}
                    </Text>
                  </Flex>

                  {/* Show delete button to the creator of the event */}
                  {item.userId === sessionInfo.user.id && (
                    <Button
                      mt={3}
                      color={item.textColour}
                      bg={item.backgroundColour}
                      border={`1px solid ${item.textColour}`}
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          deleteHandler(item.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  )}

                  {/* Show registered button for all users other then the creator. Hide it if already registered */}
                  {!item.isRegistered && item.userId !== sessionInfo.user.id && (
                    <Button
                      mt={3}
                      color={item.textColour}
                      bg={item.backgroundColour}
                      border={`1px solid ${item.textColour}`}
                      onClick={() => registerHandler(item.id, index)}
                    >
                      Register
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default Event;

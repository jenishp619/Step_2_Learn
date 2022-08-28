/**
 *
 * Author: Janvi Nayanbhai Patel
 * Banner ID: B00893747
 * Email: jn498641@dal.ca
 */
import { Avatar, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const user = JSON.parse(ReactSession.get("user"));

  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [file, setFile] = useState(null);
  const [userFromId, setUserFromId] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { uid } = useParams();
  const token = user.accessToken;

  useEffect(() => {
    if (parseInt(uid) !== user.user.id) {
      axios
        .get(`https://group-18.herokuapp.com/users/${uid}`)
        .then((data) => {
          setUserFromId(data.data);
          setFirstName(data.data.firstName);
          setLastName(data.data.lastName);
        })
        .catch((err) => console.log(err));
    } else {
      setUserFromId(user.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      axios({
        method: "post",
        url: "https://group-18.herokuapp.com/media-uploader/upload/image",
        data: formData,
      })
        .then((data) => {
          // setImageUrl(data.data.secure_url);
          axios
            .patch(
              "https://group-18.herokuapp.com/users",
              {
                firstName: firstName,
                lastName: lastName,
                profileUrl: data.data.secure_url,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((_data) => {
              user.user = _data.data;
              setUserFromId(_data.data);
              ReactSession.set("user", JSON.stringify(user));
              toast.success("profile saved succesfully");
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleChange = (field) => {
    switch (field.name) {
      case "firstName":
        setFirstName(field.value);
        break;
      case "lastName":
        setLastName(field.value);
        break;
      case "img":
        setFile(field.files[0]);
        break;
      default:
        break;
    }
  };

  const handleConnect = () => {
    // console.log(userFromId);
    axios
      .post(
        "https://group-18.herokuapp.com/users/connect",
        {
          email: userFromId.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((_data) => {
        user.user = _data.data;
        toast.success("Connection mail sent successfully");
      })
      .catch((err) => console.log(err));
  };

  const handlePaymentLink = () => {
    axios
      .post("https://group-18.herokuapp.com/payment")
      .then((response) => {
        localStorage.setItem("stripe_session_id", response.data.id);
        window.location = response.data.url;
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Flex w="100vw" minH="100vh" align="center" flexDirection="column">
      {parseInt(uid) === user.user.id && !userFromId.isPaidUser ? (
        <Flex
          w="100%"
          h="7vh"
          bg="linear-gradient(to right, #0987A0, #805AD5)"
          justify="center"
          align="center"
        >
          <Text color="white" cursor="pointer" onClick={handlePaymentLink}>
            Unlock all features? Grab our subscription. Its just 24.99 CAD
            Yearly.
          </Text>
        </Flex>
      ) : (
        <span />
      )}
      <Flex w="60%" h="auto" flexDirection="column" mt="50px">
        <Heading mb="50px">Profile</Heading>
        <Flex w="100%" flexDirection={["column", "column", "row"]}>
          <Flex w={["90%", "90%", "30%"]}>
            {/* {console.log(userFromId)} */}
            <Avatar
              size="2xl"
              name={`${userFromId.firstName} ${userFromId.lastName}`}
              src={userFromId.profileUrl}
            />
          </Flex>
          <Flex
            w={["90%", "90%", "60%"]}
            flexDirection={"column"}
            justify="space-evenly"
            minH="50vh"
          >
            <Heading size="sm" textTransform="uppercase">
              Profile Information
            </Heading>

            {parseInt(uid) === user.user.id ? (
              <Input
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => handleChange(e.target)}
              />
            ) : (
              <Input
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => handleChange(e.target)}
                readOnly
              />
            )}
            {parseInt(uid) === user.user.id ? (
              <Input
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => handleChange(e.target)}
              />
            ) : (
              <Input
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => handleChange(e.target)}
                readOnly
              />
            )}

            {parseInt(uid) === user.user.id ? (
              <>
                <Input
                  placeholder="Profile image"
                  type="file"
                  name="img"
                  onChange={(e) => handleChange(e.target)}
                />
                <Button
                  colorScheme="cyan"
                  onClick={() => handleSubmit()}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button colorScheme="cyan" onClick={() => handleConnect()}>
                Connect
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;

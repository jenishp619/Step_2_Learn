/**
 *
 * Author: Jenish Girish Patel
 * Banner ID: B00897765
 * Email: jenish.patel@dal.ca
 */

import { Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import success from "../images/payment-success.gif";

const PaymentSuccess = () => {
  const sessionInfo = JSON.parse(ReactSession.get("user"));

  useEffect(() => {
    if (!sessionInfo || !sessionInfo.accessToken) {
      return;
    }
    const id = localStorage.getItem("stripe_session_id");
    if (!id) {
      return;
    }
    axios
      .post(
        "https://group-18.herokuapp.com/payment/success/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionInfo.accessToken}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("stripe_session_id");
        sessionInfo.user.isPaidUser = true;
        ReactSession.set("user", JSON.stringify(sessionInfo));
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      w="100%"
      minH="100vh"
      flexDirection="column"
      justify="center"
      align="center"
    >
      <Image src={success} h="350px" />
      <Text mt="10" fontSize="3xl">
        Payment Completed
      </Text>
      <Link to="/">
        <Text color="#0AF" mt="5">
          Return Home
        </Text>
      </Link>
    </Flex>
  );
};

export default PaymentSuccess;

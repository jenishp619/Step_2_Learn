/**
 *
 * Author: Jenish Girish Patel
 * Banner ID: B00897765
 * Email: jenish.patel@dal.ca
 */
import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import failed from "../images/payment-failed-error.gif";

const PaymentFailure = () => {
  useEffect(() => {
    localStorage.removeItem("stripe_session_id");
  }, []);

  return (
    <Flex
      w="100%"
      minH="100vh"
      flexDirection="column"
      justify="center"
      align="center"
    >
      <Image src={failed} h="350px" />
      <Text mt="10" fontSize="3xl">
        Payment Failed
      </Text>
      <Link to="/">
        <Text color="#0AF" mt="5">
          Return Home
        </Text>
      </Link>
    </Flex>
  );
};

export default PaymentFailure;

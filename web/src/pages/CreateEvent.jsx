/*
 * Author: Jay Kirankumar Patel
 * Banner: B00906433
 * E-mail: jaykiranpatel@dal.ca
 */

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ReactSession } from "react-client-session";

// Set time to zero
const today = new Date();
today.setHours(0, 0, 0, 0);

// Handle validation for the form
const validation = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  eventDate: yup.date().required().min(today, "Date cannot be in the past"),
});

const CreateEvent = () => {
  const navigate = useNavigate();

  const sessionInfo = JSON.parse(ReactSession.get("user"));
  const axiosConfig = {
    headers: { Authorization: `Bearer ${sessionInfo.accessToken}` },
  };

  // Handles the form controls and its validation
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
      eventDate: "",
    },
    validationSchema: validation,
    onSubmit: (values, action) => {
      action.setSubmitting(true);

      // Posting the event to backend
      axios
        .post("https://group-18.herokuapp.com/event", values, axiosConfig)
        .then((res) => {
          toast("Event created successfully");
          action.resetForm();
          navigate(`/event`);
        })
        .catch((err) => console.error(err))
        .finally(() => action.setSubmitting(false));
    },
  });

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" minH="100vh" justify="center" align="center">
      <Flex w="90%" flexDirection="column" p="5" shadow="2xl">
        <Text fontSize="2xl" mb="5">
          Create Event
        </Text>
        <FormControl isInvalid={formik.touched.title && formik.errors.title}>
          <FormLabel>Title</FormLabel>
          <Input {...formik.getFieldProps("title")} />
          <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.touched.description && formik.errors.description}
        >
          <FormLabel>Description</FormLabel>
          <Textarea {...formik.getFieldProps("description")} />
          <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.touched.address && formik.errors.address}
        >
          <FormLabel>Address</FormLabel>
          <Input {...formik.getFieldProps("address")} />
          <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.touched.eventDate && formik.errors.eventDate}
        >
          <FormLabel>Event Time</FormLabel>
          <Input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...formik.getFieldProps("eventDate")}
          />
          <FormErrorMessage>{formik.errors.eventDate}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={formik.handleSubmit}
          mt="5"
          w="250px"
        >
          Create
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateEvent;

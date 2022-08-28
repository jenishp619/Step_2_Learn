/**
 *
 * Author: Janvi Nayanbhai Patel
 * Banner ID: B00893747
 * Email: jn498641@dal.ca
 */
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
});

export default function ResetPasswordGetLink() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      axios
        .get(
          `https://group-18.herokuapp.com/auth/reset-password/${values.email}`
        )
        .then((data) => {
          toast("Password reset link sent succesfully");
          navigate("/auth");
        })
        .catch((err) => toast(err.response.data.message));
    },
    validationSchema,
  });
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Flex
        w={["100%", "100%", "50%"]}
        shadow="md"
        rounded="xl"
        flexDirection="column"
        p="5"
      >
        <Link to="/auth">
          <Flex>
            <AiOutlineArrowLeft size={25} />
            <Text mx="1">Back</Text>
          </Flex>
        </Link>
        <Flex flexDirection={["column", "column", "row"]}>
          <Flex direction={"column"} p={3} w={["100%", "100%", "60%"]}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textTransform="uppercase"
              my="3"
            >
              Do not worry
            </Text>
            <Text fontSize="md" textAlign={"left"} mb={4}>
              We're here to help you. To recover your password, enter the email
              address you used while registration.
            </Text>
            <FormControl
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <Input
                placeholder="Email"
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              <FormErrorMessage>
                {formik.touched && formik.errors.email}
              </FormErrorMessage>
            </FormControl>
            <Flex
              justifyContent={"space-between"}
              mt={10}
              alignItems={"center"}
            >
              <Button
                colorScheme="blue"
                isLoading={formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
                Send Link
              </Button>
            </Flex>
          </Flex>
          <Flex w={["100%", "100%", "40%"]}>
            <Image
              src="https://www.paymentsjournal.com/wp-content/uploads/2020/09/forgot-password-concept-illustration_114360-1123.jpg"
              alt="Dan Abramov"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

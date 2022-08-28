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
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactSession } from "react-client-session";
import axios from "axios";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
  firstName: Yup.string()
    .required()
    .matches(/^[a-zA-Z\s]+$/, "Name must be a valid name.")
    .min(2, "Name is too short - should be more than one character."),
  lastName: Yup.string()
    .required()
    .matches(/^[a-zA-Z\s]+$/, "Name must be a valid name.")
    .min(2, "Name is too short - should be more than one character."),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const SignUp = ({ handleToggle }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values, actions) => {
      ReactSession.set("ftux", "true");
      actions.setSubmitting(true);
      axios
        .post("https://group-18.herokuapp.com/auth/register", {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          profileUrl: "https://source.unsplash.com/random",
        })
        .then((data) => {
          ReactSession.set("user", JSON.stringify(data.data));
          actions.resetForm();
          actions.setSubmitting(false);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          actions.setSubmitting(false);
        });
    },
    validationSchema,
  });

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-evenly"
      align="center"
      w="100%"
    >
      <FormControl
        isInvalid={formik.touched.firstName && formik.errors.firstName}
      >
        <Input
          placeholder="First name"
          type="text"
          name="firstName"
          {...formik.getFieldProps("firstName")}
        />
        <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.touched.lastName && formik.errors.lastName}
      >
        <Input
          placeholder="Last name"
          type="text"
          name="lastName"
          {...formik.getFieldProps("lastName")}
        />
        <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={formik.touched.email && formik.errors.email}>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          {...formik.getFieldProps("email")}
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.touched.password && formik.errors.password}
      >
        <Input
          placeholder="Password"
          type="password"
          name="password"
          {...formik.getFieldProps("password")}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={
          formik.touched.repeatPassword && formik.errors.repeatPassword
        }
      >
        <Input
          placeholder="Repeat password"
          type="password"
          name="repeatPassword"
          {...formik.getFieldProps("repeatPassword")}
        />
        <FormErrorMessage>{formik.errors.repeatPassword}</FormErrorMessage>
      </FormControl>

      <Button
        background="#4facfe"
        color="white"
        mt="5"
        w="100%"
        _hover={{
          background: "rgba(79, 172, 254,0.8)",
        }}
        isLoading={formik.isSubmitting}
        onClick={formik.handleSubmit}
      >
        Sign Up
      </Button>
      <Text color="#4facfe" cursor="pointer" onClick={handleToggle}>
        Already have an account ? Sign In
      </Text>
    </Flex>
  );
};

export default SignUp;

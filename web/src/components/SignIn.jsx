/**
 *
 * Author: Janvi Nayanbhai Patel
 * Banner ID: B00893747
 * Email: jn498641@dal.ca
 */ import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

ReactSession.setStoreType("localStorage");

const SignIn = ({ handleToggle }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);

      axios
        .post("https://group-18.herokuapp.com/auth/login", {
          email: values.email,
          password: values.password,
        })
        .then((data) => {
          // Clear the session before setting the new one.
          ReactSession.remove("user");
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
    <>
      <Flex
        flexDirection="column"
        justifyContent="space-evenly"
        align="center"
        w="100%"
      >
        <FormControl isInvalid={formik.touched.email && formik.errors.email}>
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
        <Link to="/auth/reset">Forgot Password?</Link>
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
          Sign In
        </Button>
        <Text color="#4facfe" cursor="pointer" onClick={handleToggle}>
          Don't have an account ? Sign Up
        </Text>
      </Flex>
    </>
  );
};

export default SignIn;

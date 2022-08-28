import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      axios
        .post(`https://group-18.herokuapp.com/auth/reset-password`, {
          token: token,
          password: values.password,
        })
        .then((data) => {
          toast("Password reset succesfully");
          navigate("/auth");
        })
        .catch((err) => toast(err.message));
    },
    validationSchema,
  });
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      minHeight="100vh"
    >
      <Flex
        flexDirection="column"
        justifyContent="space-evenly"
        align="center"
        w="50%"
      >
        <FormControl
          isInvalid={formik.touched.password && formik.errors.password}
          mb="5"
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
          mb="5"
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
          colorScheme="blue"
          isLoading={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          Reset Password
        </Button>
      </Flex>
    </Flex>
  );
}

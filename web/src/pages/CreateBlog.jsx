/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
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
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

const validation = yup.object({
  title: yup.string().required(),
  content: yup.mixed().required(),
});

const CreateBlog = () => {
  const [file, setFile] = useState(null);
  const user = JSON.parse(ReactSession.get("user"));
  const sessionInfo = user;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: validation,
    onSubmit: (values, action) => {
      action.setSubmitting(true);
      const token = user.accessToken;
      const formData = new FormData();
      formData.append("file", file);

      axios({
        method: "post",
        url: "https://group-18.herokuapp.com/media-uploader/upload/image",
        data: formData,
      })
        .then((data) => {
          axios
            .post(
              "https://group-18.herokuapp.com/blog",
              {
                title: values.title,
                description: values.content,
                displayImage: data.data.secure_url,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((data) => {
              user.user = data.data;
              toast("New Blog Created");
              navigate("/blog");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      action.setSubmitting(false);
    },
  });

  const handleChange = (field) => {
    setFile(field.files[0]);
  };

  return !sessionInfo.user.isPaidUser ? (
    navigate("/")
  ) : (
    <Flex w="100%" minH="100vh" justify="center" align="center">
      <Flex w="90%" flexDirection="column" p="5" shadow="2xl">
        <Text fontSize="2xl" mb="5">
          Create Blog
        </Text>

        <FormControl isInvalid={formik.touched.title && formik.errors.title}>
          <FormLabel>Title</FormLabel>
          <Input {...formik.getFieldProps("title")} />
          <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.touched.content && formik.errors.content}
        >
          <FormLabel>Content</FormLabel>
          <Textarea {...formik.getFieldProps("content")} />
          <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.touched.headerImage && formik.errors.headerImage}
        >
          <FormLabel>Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e.target)}
          />
          <FormErrorMessage>{formik.errors.headerImage}</FormErrorMessage>
        </FormControl>
        <Button
          my="5"
          w="250px"
          colorScheme="blue"
          onClick={formik.handleSubmit}
        >
          Create
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateBlog;

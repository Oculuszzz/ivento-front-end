import React, { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Title,
  TextInput,
  Select,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons";
import { showNotification, updateNotification } from "@mantine/notifications";
import { validateInput, validateSelect } from "../../utils/FormUtils";
import { useParams, useNavigate } from "react-router-dom";
import ErrorFetch from "../error-fetch";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { userAxiosInstance } from "../../services/AxiosService";
import AuthHeader from "../../services/AuthHeader";

const roles = ["ROLE_ADMIN", "ROLE_USER"]; // Temporary Hardcoded, later fetch from server

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const formProps = useForm({
    initialValues: {
      username: "",
      email: "",
      role: "",
    },
    validate: {
      username: (value) => validateInput("username", value).error,
      email: (value) => validateInput("email", value).error,
      role: (value) => validateSelect(value).error,
    },
  });

  const { data, isLoading, error } = useAxiosFetch("/users/find-user?id=" + id);

  useEffect(() => {
    if (data) {
      formProps.setValues({
        username: data.username,
        email: data.email,
        role: data.role,
      });
    }
  }, [data]);

  const submitHandler = (userData) => {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Updating user",
      message: "Please wait and don't close this yet.",
      autoClose: false,
      disallowClose: true,
    });

    setIsDisabled(true);

    const updatedUserData = {
      ...data,
      username: userData.username,
      role: userData.role,
      email: userData.email,
      lastUpdated: new Date().toISOString(),
    };

    console.log(updatedUserData);

    // Update user data
    userAxiosInstance.service
      .put("update-user", updatedUserData, {
        headers: AuthHeader.getAuthHeader(),
      })
      .then((response) => {
        // handle success
        if (!response.status === 200) {
          throw Error(`Error - ${response.status} - ${response.statusText}`);
        } else {
          console.log("User updated");
          updateNotification({
            id: "load-data",
            color: "teal",
            title: "Successfully updated user.",
            //   message: "Redirect to previous page in 5 seconds. Please wait...",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
            disallowClose: true,
          });
          navigate("/users");
        }
      })
      .catch((error) => {
        // Catch the error
        if (error.name === "AbortError") {
          console.log("fecth abort error");
        } else {
          updateNotification({
            id: "load-data",
            color: "red",
            title: "Failed to update user.",
            message:
              "Please try again, if reoccurring same problem please contact administrator.",
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
        }
      });

    setIsDisabled(false);
  };

  return (
    <React.Fragment>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {error && <ErrorFetch error={error} />}
      {data && (
        <Card p="lg" radius="md" withBorder>
          <Stack spacing="sm">
            <form
              onSubmit={formProps.onSubmit((values) => submitHandler(values))}
            >
              <Stack spacing="md">
                <Title order={4}>
                  Update User - Employee ID - {data.id} - {data.username}
                </Title>
                <TextInput
                  disabled={isDisabled}
                  component={"input"}
                  id="username"
                  label="Username"
                  placeholder="Username"
                  description="Username must not be 'root', 'admin' or test."
                  value={"LALALA"}
                  {...formProps.getInputProps("username")}
                />
                <TextInput
                  disabled={isDisabled}
                  id="email"
                  label="Email"
                  placeholder="your@email.com"
                  {...formProps.getInputProps("email")}
                />
                <Select
                  disabled={isDisabled}
                  withAsterisk
                  style={{ zIndex: 2 }}
                  data={roles}
                  placeholder="Select"
                  label="Role"
                  {...formProps.getInputProps("role")}
                />
                <Group position="apart" mt="md">
                  <Button
                    disabled={isDisabled}
                    component="a"
                    href="/users"
                    variant="subtle"
                  >
                    Cancel
                  </Button>
                  <Button disabled={isDisabled} type="submit">
                    Submit
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Card>
      )}
    </React.Fragment>
  );
};

export default UpdateUser;

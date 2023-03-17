import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Card,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Title,
  Select,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { validateInput, validateSelect } from "../../utils/FormUtils";

const roles = ["Admin", "User"]; // Temporary Hardcoded, later fetch from server

const AddNewUser = () => {
  const formProps = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
      role: "",
    },
    validate: {
      username: (value) => validateInput("username", value).error,
      password: (value) => validateInput("password", value).error,
      email: (value) => validateInput("email", value).error,
      role: (value) => validateSelect(value).error,
    },
  });
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const submitHandler = (values) => {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Creating new user",
      message: "Please wait and don't close this yet.",
      autoClose: false,
      disallowClose: true,
    });

    setIsDisabled(true);

    // Construct object for new user data
    const newUserData = {
      username: values.username,
      role: values.role,
      email: values.email,
      isBlocked: false,
      avatar: "G",
    };

    //Add new user
    fetch("http://localhost:8800/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData),
    })
      .then((response) => {
        // Do a checker from the response
        console.log(response.status + " - " + response.statusText);
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status + " - " + response.statusText);
        }
      })
      .then(() => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Successfully create user.",
          message: "Redirect to previous page. Please wait...",
          icon: <IconCheck size={16} />,
          autoClose: 5000,
          disallowClose: true,
        });
        navigate("/users");
      })
      .catch((error) => {
        // Catch the error
        if (error.name === "AbortError") {
          console.log("fecth abort error");
        } else {
          updateNotification({
            id: "load-data",
            color: "red",
            title: "Failed to create new user.",
            message:
              "Please try again, if reoccurring same problem please contact administrator.",
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
          setIsDisabled(false);
        }
      });
  };

  return (
    <React.Fragment>
      <Card p="lg" radius="md" withBorder>
        <Stack spacing="sm">
          <form
            onSubmit={formProps.onSubmit((values) => submitHandler(values))}
          >
            <Stack spacing="md">
              <Title order={4}>Add User - User Information and Role</Title>
              <TextInput
                disabled={isDisabled}
                id="username"
                label="Username"
                placeholder="Username"
                description="Username must not be 'root', 'admin' or test."
                {...formProps.getInputProps("username")}
              />
              <TextInput
                disabled={isDisabled}
                id="email"
                label="Email"
                placeholder="your@email.com"
                {...formProps.getInputProps("email")}
              />
              <PasswordInput
                disabled={isDisabled}
                id="password"
                label="Password"
                placeholder="Password"
                description="Password must include at least one letter, number and special character"
                {...formProps.getInputProps("password")}
              />
              <Select
                withAsterisk
                disabled={isDisabled}
                style={{ zIndex: 2 }}
                data={roles}
                placeholder="Select"
                label="Role"
                defaultValue={"User"}
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
    </React.Fragment>
  );
};

export default AddNewUser;

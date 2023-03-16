import React, { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Stack,
  Card,
  Title,
  LoadingOverlay,
  UnstyledButton,
  Text,
  Alert,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateInput } from "../utils/FormUtils";
import useAuthenticate from "./hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";
import { IconAlertCircle } from "@tabler/icons";

const Signin = () => {
  const formProps = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => validateInput("username", value).error,
      password: (value) => validateInput("password", value).error,
    },
  });

  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const {
    isLoggedIn: isSuccessfullyLoggedIn,
    isLoading: isSigninApiLoading,
    error: signinApiError,
    trigger: signinApiTrigger,
  } = useAuthenticate.useSignin();

  // Success
  useEffect(() => {
    if (!isSigninApiLoading && isSuccessfullyLoggedIn) {
      navigate(0);
    }
  }, [isSuccessfullyLoggedIn, isSigninApiLoading, navigate]);

  // Failed
  useEffect(() => {
    if (!isSigninApiLoading && signinApiError) {
      signinApiTrigger(false, "", "");
      setShowError(true);
      console.log("ERROR", signinApiError);
    }
  }, [isSigninApiLoading, signinApiError, signinApiTrigger]);

  const submitHandler = (values) => {
    const { username, password } = values;
    signinApiTrigger(true, username, password);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      sx={{
        minWidth: 350,
        width: 400,
        textAlign: "left",

        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // margin: "-50px 0 0 -50px",
      }}
    >
      <LoadingOverlay visible={isSigninApiLoading} overlayBlur={2} />
      <Stack spacing="xl">
        <Group position="center">
          <UnstyledButton>
            <Title
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
            >
              Ivento
            </Title>
          </UnstyledButton>
        </Group>
        <Group>
          <Text size="xs" opacity={0.65}>
            Please login to continue.
          </Text>
          {showError && (
            <Alert icon={<IconAlertCircle />} title="Error!" color="red">
              Invalid username/password.
              <Space h="xs" />
              To create new account please contact administrator.
            </Alert>
          )}
        </Group>
        <form onSubmit={formProps.onSubmit((values) => submitHandler(values))}>
          <Stack spacing="md">
            <TextInput
              withAsterisk
              id="username"
              label="Username"
              placeholder="Username"
              {...formProps.getInputProps("username")}
            />
            <PasswordInput
              withAsterisk
              id="password"
              label="Password"
              placeholder="Password"
              {...formProps.getInputProps("password")}
            />
            <Group position="right" mt="md">
              {/* <Button component="a" href="/signup" variant="subtle">
                  Create account
                </Button> */}
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
};

export default Signin;

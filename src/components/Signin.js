import React, { useEffect } from "react";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import AuthContext from "../context/Auth-context";
import { validateInput } from "../utils/FormUtils";

const Signin = () => {
  const authCtx = useContext(AuthContext);
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

  useEffect(() => {
    // Wait until login is success
    if (authCtx.isLoading) {
      return;
    }

    // Show error message login failed
    if (!authCtx.isLoggedIn) {
    }
  }, [authCtx.isLoading, authCtx.isLoggedIn]);

  const submitHandler = (values) => {
    const { username, password } = values;
    authCtx.onLogin(username, password);
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
      <LoadingOverlay visible={authCtx.isLoading} overlayBlur={2} />
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
        <Text size="xs" opacity={0.65}>
          Please login to continue.
        </Text>
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

  // return (
  //   <Paper shadow="md" radius="md" p="xl" withBorder>
  //     <Box sx={{ minWidth: 350, textAlign: "left" }} mx="auto">
  //       <Stack spacing="sm">
  //         <Text size="xl" fw={700}>
  //           Sign in
  //         </Text>
  //         <form
  //           onSubmit={formProps.onSubmit((values) => submitHandler(values))}
  //         >
  //           <Stack spacing="md">
  //             <TextInput
  //               id="username"
  //               label="Username"
  //               placeholder="Username"
  //               {...formProps.getInputProps("username")}
  //             />
  //             <PasswordInput
  //               id="password"
  //               label="Password"
  //               placeholder="Password"
  //               {...formProps.getInputProps("password")}
  //             />
  //             <Group position="apart" mt="md">
  //               <Button component="a" href="/signup" variant="subtle">
  //                 Create account
  //               </Button>
  //               <Button type="submit">Submit</Button>
  //             </Group>
  //           </Stack>
  //         </form>
  //       </Stack>
  //     </Box>
  //   </Paper>
  // );
};

export default Signin;

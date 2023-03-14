import React, { useState } from "react";

import {
  Text,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Box,
  Stack,
  Modal,
} from "@mantine/core";
import { IconPassword } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

import { validateInput } from "../utils/FormUtils";

const Signup = () => {
  const formProps = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },
    validate: {
      username: (value) => validateInput("username", value).error,
      email: (value) => validateInput("email", value).error,
      password: (value) => validateInput("password", value).error,
      confirmPassword: (value) => validateInput("confirmPassword", value).error,
    },
  });

  const [opened, setOpened] = useState(true);
  const [visible, { toggle }] = useDisclosure(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    setLoadingVisible(true);

    // Validates all fields with specified `validate` function or schema, sets form.errors
    formProps.validate();

    console.log(formProps.isValid());
    console.log(formProps.values);

    setOpened(false);

    return;
  };

  return (
    <Modal
      centered
      opened={opened}
      title="Sign up"
      closeOnClickOutside={false}
      closeOnEscape={false}
      shadow="md"
      withCloseButton={false}
    >
      <Box sx={{ minWidth: 350, textAlign: "left" }} mx="auto">
        <Stack spacing="sm">
          <form onSubmit={submitHandler}>
            <Stack spacing="md">
              <TextInput
                id="username"
                label="Username"
                placeholder="Username"
                {...formProps.getInputProps("username")}
              />
              <TextInput
                id="email"
                label="Email"
                placeholder="your@email.com"
                {...formProps.getInputProps("email")}
              />
              <PasswordInput
                visible={visible}
                onVisibilityChange={toggle}
                placeholder="Your password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                {...formProps.getInputProps("password")}
              />
              <PasswordInput
                visible={visible}
                onVisibilityChange={toggle}
                placeholder="Confirm password"
                label="Confirm Password"
                {...formProps.getInputProps("confirmPassword")}
              />
            </Stack>
            <Checkbox
              onChange={toggle}
              icon={IconPassword}
              label="Show password"
              mt="sm"
            />
            <Group position="apart" mt="md">
              <Button component="a" href="/" variant="subtle">
                Sign in instead
              </Button>
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Stack>
      </Box>
    </Modal>
  );

  // return (
  //   <React.Fragment>
  //     <LoadingOverlay visible={loadingVisible} overlayBlur={2} />
  //     <Paper shadow="md" radius="md" p="xl" withBorder>
  //       <Box sx={{ minWidth: 350, textAlign: "left" }} mx="auto">
  //         <Stack spacing="sm">
  //           <Text size="xl" fw={700}>
  //             Sign up
  //           </Text>
  //           <form onSubmit={submitHandler}>
  //             <Stack spacing="md">
  //               <TextInput
  //                 id="username"
  //                 label="Username"
  //                 placeholder="Username"
  //                 {...formProps.getInputProps("username")}
  //               />
  //               <TextInput
  //                 id="email"
  //                 label="Email"
  //                 placeholder="your@email.com"
  //                 {...formProps.getInputProps("email")}
  //               />
  //               <PasswordInput
  //                 visible={visible}
  //                 onVisibilityChange={toggle}
  //                 placeholder="Your password"
  //                 label="Password"
  //                 description="Password must include at least one letter, number and special character"
  //                 {...formProps.getInputProps("password")}
  //               />
  //               <PasswordInput
  //                 visible={visible}
  //                 onVisibilityChange={toggle}
  //                 placeholder="Confirm password"
  //                 label="Confirm Password"
  //                 {...formProps.getInputProps("confirmPassword")}
  //               />
  //             </Stack>
  //             <Checkbox
  //               onChange={toggle}
  //               icon={IconPassword}
  //               label="Show password"
  //               mt="sm"
  //             />
  //             <Group position="apart" mt="md">
  //               <Button component="a" href="/" variant="subtle">
  //                 Sign in instead
  //               </Button>
  //               <Button type="submit">Submit</Button>
  //             </Group>
  //           </form>
  //         </Stack>
  //       </Box>
  //     </Paper>
  //   </React.Fragment>
  // );
};

export default Signup;

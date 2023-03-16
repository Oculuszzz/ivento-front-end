import { Card, Title, Group, Space, Center } from "@mantine/core";
import React from "react";
import useAuthContext from "../context/Auth-context";
import TokenService from "../services/TokenService";
import Signin from "./Signin";

const Home = () => {
  const { authState } = useAuthContext();

  return (
    <React.Fragment>
      {!authState.isLoggedIn ? (
        <Center h="80%" mx="auto">
          <Group position="center">
            <Signin />
          </Group>{" "}
        </Center>
      ) : (
        <Card p="lg" radius="md" withBorder>
          <Group>
            <Title order={4}>Welcome back, </Title>
            <Title
              order={4}
              variant="gradient"
              gradient={{ from: "lime", to: "blue", deg: 105 }}
            >
              {TokenService.getUsername()}
            </Title>
          </Group>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Home;

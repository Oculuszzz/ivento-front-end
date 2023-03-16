import { Card, Title, Group } from "@mantine/core";
import React from "react";
import useAuthContext from "../context/Auth-context";
import TokenService from "../services/TokenService";
import Signin from "./Signin";

const Home = () => {
  const { authState } = useAuthContext();

  return (
    <React.Fragment>
      {!authState.isLoggedIn ? (
        <Group position="center">
          <Signin />
        </Group>
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

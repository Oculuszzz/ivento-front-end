import { Card, Title, Center, Box, Group } from "@mantine/core";
import React, { useContext } from "react";
import AuthContext from "../context/Auth-context";
import TokenService from "../services/TokenService";
import Signin from "./Signin";

const Home = () => {
  const authCtx = useContext(AuthContext);

  // Wait AuthContext completely initialize before  committing to redirecting or rendering the protected component.

  return (
    <React.Fragment>
      {!authCtx.isLoggedIn ? (
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

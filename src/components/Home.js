import { Card, Title, Group, Center, Stack } from "@mantine/core";
import React from "react";
import useAuthContext from "../context/Auth-context";
import TokenService from "../services/TokenService";
import InventoryStats from "./inventory/InventoryStats";
import OrdersStatByMonth from "./order/OrdersStatByMonth";
import Signin from "./Signin";

const Home = () => {
  const { authState } = useAuthContext();

  return (
    <React.Fragment>
      {!authState.isLoggedIn ? (
        <Center h="80%" mx="auto">
          <Group position="center">
            <Signin />
          </Group>
        </Center>
      ) : (
        <Stack spacing="xl">
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
          <InventoryStats />
          <OrdersStatByMonth />
        </Stack>
      )}
    </React.Fragment>
  );
};

export default Home;
